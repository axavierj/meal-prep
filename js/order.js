const orderItems = document.querySelector('#orderItems')
const orderTitle = document.querySelector('#oderTitle')
const cartOutPut = document.querySelector('#cartOutPut')

const badge = document.querySelector('badge-component')

let cart = []
const user = JSON.parse(sessionStorage.getItem('user'))

const menu = await fetch('http://localhost:5000/api/menus?active=true')

const customer = await fetch(`http://localhost:5000/api/customer/${user.sqid}`)

const customerData = await customer.json()

const menuData = await menu.json()

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

if (menuData) {
  orderTitle.innerHTML = menuData.title
  const { items } = menuData

  items
    .map((item) => {
      return (orderItems.innerHTML += `
    
    <div class="row animate__animated animate__fadeIn">
    <div class="col-md-6">
    <form>
    <div class="form-group">
    <label for="${item.day}-quantity">Quantity</label>
    <input
    type="number"
    class="form-control"
    id="${item.day}-quantity"
    name="${item.day}-quantity"
    min="0"
    value="1"
    />
    </div>
    <div class="form-group mb-3">
    <label for="${item.day}-meal-type">Meal Type</label>
    <select
    class="form-control"
    id="${item.day}-meal-type"
    name="${item.day}-meal-type"
    >
    <option value="regular">Regular</option>
    <option value="keto">Keto</option>
    <option value="paleo">Paleo</option>
    <option value="lowcarb">Low Carb</option>
    <option value="hiprotein">High Protein</option>
    <option value="lowprotein">Low Protein</option>
    <option value="vegetarian">Vegetarian</option>
    <option value="vegan">Vegan</option>
    <option value="family">Family</option>
    </select>
    </div>
    <button class="btn btn-secondary">
    <i class="bi bi-cart-plus"></i>
    </button>
    </form>
    </div>
    <section class="col-md-6" >
    <h3>${item.day}</h3>
    <p>${item.description}</p>
            <p>Current order: <strong id="${item.day}-info"></strong></p>
          </section>
        </div>
        <hr />
        `)
    })
    .join('')

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
      body: JSON.stringify({ ...customerData, cart }),
    })

    const orderData = await order.json()

    //add order id to session storage
    sessionStorage.setItem('order', JSON.stringify(orderData))

    //add the customer to session storage
    sessionStorage.setItem('customer', JSON.stringify(customerData))

    //redirect to checkout page
    window.location.href = '/cart/'
  })
}

if (!menuData) {
  orderTitle.innerHTML = 'No Active Menu'
}
