const orderItems = document.querySelector('#orderItems')
const orderTitle = document.querySelector('#oderTitle')
const cartOutPut = document.querySelector('#cartOutPut')
const tostTemplate = `  <div class="toast-container position-fixed bottom-0 end-0 p-3">
<div id="Toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-body">
    Item added to cart
    </div>
</div>
</div>`
const badge = document.querySelector('#badge')

let cart = []
const user = JSON.parse(sessionStorage.getItem('user'))

const menu = await fetch('http://localhost:5000/api/menus?active=true')

const customer = await fetch(`http://localhost:5000/api/customer/${user.sqid}`)

const customerData = await customer.json()
// console.log(customerData)

const menuData = await menu.json()

// const order = await fetch(`http://localhost:5000/api/orders`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ ...customerData }),
// })

// const orderData = await order.json()

orderTitle.innerHTML = menuData.title

const { items } = menuData

items.forEach((item) => {
  return (orderItems.innerHTML += `

    <div class="row">
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
                  <section class="col-md-6">
                  <h3>${item.day}</h3>
            <p>${item.description}</p>
          </section>
        </div>
        <hr />
        `)
})

document.body.innerHTML += tostTemplate

const Toast = document.querySelector('#Toast')
const toastInstance = bootstrap.Toast.getOrCreateInstance(Toast)

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

  const cartItemsWithPrice = await fetch(
    `http://localhost:5000/api/orders/addprices`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item }),
    }
  )

  const cartItemsWithPriceData = await cartItemsWithPrice.json()

  cart.push(cartItemsWithPriceData)

  toastInstance.show({
    autohide: true,
  })
  e.target.reset()
}

const orderForm = document.querySelectorAll('form')
orderForm.forEach((form) => {
  form.addEventListener('submit', addItemToCart)
})

const checkoutButton = document.querySelector('#Checkout')

checkoutButton.addEventListener('click', async (e) => {
  const order = await fetch(`http://localhost:5000/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...customerData, cart }),
  })

  const orderData = await order.json()

  //add order id to session storage
  sessionStorage.setItem('order', JSON.stringify(orderData))

  //add the cart to session storage
  sessionStorage.setItem('cart', JSON.stringify(cart))

  //add the customer to session storage
  sessionStorage.setItem('customer', JSON.stringify(customerData))

  //redirect to checkout page
  window.location.href = '/cart/'
})
