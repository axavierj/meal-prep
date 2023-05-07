import {
  renderMenuItems,
  getActiveMenu,
  getCustomerData,
  sumQuantities,
  getTotalQuantityByDay,
  displayAddedAlert,
  addPricesToOrder,
} from './services/order.service.js'
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid'

const orderItems = document.querySelector('#orderItems')
const orderTitle = document.querySelector('#oderTitle')
const badge = document.querySelector('badge-component')
const warningClose = document.querySelector('#warningClose')
const warningBox = document.querySelector('#warningBox')
const warningMessage = document.querySelector('#warningMessage')
const user = JSON.parse(sessionStorage.getItem('user'))
let removeButtons

let cart = []
const menu = await getActiveMenu()

const customer = await getCustomerData()

sessionStorage.removeItem('order')
warningClose.addEventListener('click', () => {
  warningBox.close()
})

warningMessage.innerHTML =
  'Please note that we only accept orders of 3 or more meals in total.<br /> all orders must be placed by 12pm on the day before delivery.<br /> any order under $48.00 are subject to a $10.00 delivery fee.'
warningBox.showModal()

if (menu) {
  orderTitle.innerHTML = menu.title
  const { items } = menu
  const menuTemplate = renderMenuItems(items)
  orderItems.innerHTML = menuTemplate

  const incrementButtons = document.querySelectorAll('.increment')
  const decrementButtons = document.querySelectorAll('.decrement')

  incrementButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      const input = document.querySelector(
        `#${button.getAttribute(`data-target`)}`
      )
      input.stepUp()
    })
  })

  decrementButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      const input = document.querySelector(
        `#${button.getAttribute(`data-target`)}`
      )
      input.stepDown()
    })
  })
  const addItemToCart = async (e) => {
    e.preventDefault()
    const quantity = e.target.querySelector('input').value
    const mealType = e.target.querySelector('select').value
    const day = e.target.querySelector('select').id.split('-')[0].toLowerCase()

    if (quantity === '0') {
      warningMessage.innerHTML = 'Please select a quantity greater than 0'
      warningBox.showModal()
      return
    }

    const item = {
      localId: uuidv4(),
      quantity: quantity,
      mealType,
      day,
    }
    const details = `${day}-info`
    const info = document.querySelector(`#${details}`)
    cart.push(item)
    badge.count = sumQuantities(cart)
    info.innerHTML += `<div id="${
      item.localId
    }" class="mb-3"><strong class="mr-3">${quantity} ${mealType} ${
      quantity == '1' ? 'meal' : 'meals'
    }</strong>
    <button class="btn btn-danger removeBtn"  data-cartItem ='${item.localId}'>
      Remove
    </button>
    </div>`
    removeButtons = document.querySelectorAll('.removeBtn')
    console.log(removeButtons)
    removeButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(e.target.getAttribute('data-cartItem'))
        const cartItem = e.target.getAttribute('data-cartItem')
        const cartItemElement = document.getElementById(`${cartItem}`)
        console.log(cartItemElement)
        //filter out the item from the cart
        cart = cart.filter((item) => item.localId !== cartItem)
        //update the badge
        badge.count = sumQuantities(cart)
        //remove the item from the DOM
        cartItemElement.remove()
      })
    })
    displayAddedAlert(item)
    e.target.reset()
  }

  const orderForm = document.querySelectorAll('form')
  orderForm.forEach((form) => {
    form.addEventListener('submit', addItemToCart)
  })

  const checkoutButton = document.querySelector('#Checkout')

  checkoutButton.addEventListener('click', async (e) => {
    if (badge.count >= 3) {
      const orderData = await addPricesToOrder(customer, cart, user.token)
      //add order id to session storage
      sessionStorage.setItem('order', JSON.stringify(orderData))

      //add the customer to session storage
      sessionStorage.setItem('customer', JSON.stringify(customer))

      //redirect to checkout page
      window.location.href = '/cart/'
    }
    if (badge.count < 3) {
      warningMessage.innerHTML = 'Please select at least 3 meals'
      warningBox.showModal()
    }
  })
}

if (!menu) {
  orderTitle.innerHTML = 'No Active Menu'
}
