import {
  renderMenuItems,
  getActiveMenu,
  getCustomerData,
} from './services/order.service.js'

const orderItems = document.querySelector('#orderItems')
const orderTitle = document.querySelector('#oderTitle')
const badge = document.querySelector('badge-component')

let cart = []
const menu = await getActiveMenu()

const customer = await getCustomerData()

sessionStorage.removeItem('order')
const sumQuantities = (items) => {
  let sum = 0
  for (let i = 0; i < items.length; i++) {
    sum += parseInt(items[i].quantity)
  }
  return sum
}

const getTotalQuantityByDay = (items, day) => {
  let total = 0
  for (const item of items) {
    if (item.day === day) {
      total += parseInt(item.quantity)
    }
  }
  return total
}

if (menu) {
  orderTitle.innerHTML = menu.title
  const { items } = menu
  const menuTemplate = renderMenuItems(items)
  orderItems.innerHTML = menuTemplate

  const addedAlert = document.querySelector('#addedAlert')
  const addedAlertClose = document.querySelector('#addedAlertClose')
  const addedAlertDetails = document.querySelector('#addedAlertDetails')

  addedAlertClose.addEventListener('click', () => {
    addedAlert.close()
    addedAlertDetails.innerHTML = ''
  })

  const addItemToCart = async (e) => {
    e.preventDefault()
    const quantity = e.target.querySelector('input').value
    const mealType = e.target.querySelector('select').value
    const day = e.target.querySelector('select').id.split('-')[0].toLowerCase()
    const item = {
      quantity: quantity,
      mealType,
      day,
    }

    const details = `${day}-info`
    const info = document.querySelector(`#${details}`)

    cart.push(item)
    badge.count = sumQuantities(cart)
    info.innerHTML = `${getTotalQuantityByDay(cart, day)} meals`

    addedAlertDetails.innerHTML = `added ${quantity} ${mealType} ${day} meals to cart`
    addedAlert.classList.add('animate__animated', 'animate__bounceIn')
    addedAlert.showModal()

    e.target.reset()
  }

  const orderForm = document.querySelectorAll('form')
  orderForm.forEach((form) => {
    form.addEventListener('submit', addItemToCart)
  })

  const checkoutButton = document.querySelector('#Checkout')

  checkoutButton.addEventListener('click', async (e) => {
    const order = await fetch(`http://localhost:5000/api/orders/addprices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...customer, cart }),
    })

    const orderData = await order.json()

    //add order id to session storage
    sessionStorage.setItem('order', JSON.stringify(orderData))

    //add the customer to session storage
    sessionStorage.setItem('customer', JSON.stringify(customer))

    //redirect to checkout page
    window.location.href = '/cart/'
  })
}

if (!menu) {
  orderTitle.innerHTML = 'No Active Menu'
}
