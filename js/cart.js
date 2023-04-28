const checkoutButton = document.querySelector('#checkout')
const totalContainer = document.querySelector('#Total')
const subTotalContainer = document.querySelector('#subTotal')
const cartSummary = document.querySelector('#cartSummary')
const deliveryContainer = document.querySelector('#Delivery')
const paymentWindow = document.querySelector('#payment')
const closePayment = document.querySelector('#closePayment')
const cardButton = document.getElementById('card-button')
const orderId = JSON.parse(sessionStorage.getItem('order')).id
let cart = JSON.parse(sessionStorage.getItem('cart'))
const user = JSON.parse(sessionStorage.getItem('user'))
const localOrder = JSON.parse(sessionStorage.getItem('order'))

const appId = 'sandbox-sq0idb-UmzeFtMVc6t1pFMVHL0emw'
const locationId = 'LXSRF47KWQP48'

const initializeCard = async (payments) => {
  const card = await payments.card()
  await card.attach('#card-container')
  return card
}

const createPayment = async (token) => {
  const body = JSON.stringify({
    locationId,
    sourceId: token,
    orderId,
    customerId: user.sqid,
    amount: localOrder.amount,
  })
  const paymentResponse = await fetch('http://localhost:5000/api/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
  if (paymentResponse.ok) {
    return paymentResponse.json()
  }
  const errorBody = await paymentResponse.text()
  throw new Error(errorBody)
}

const tokenize = async (paymentMethod) => {
  const tokenResult = await paymentMethod.tokenize()
  if (tokenResult.status === 'OK') {
    return tokenResult.token
  } else {
    let errorMessage = `Tokenization failed-status: ${tokenResult.status}`
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`
    }
    throw new Error(errorMessage)
  }
}

const displayPaymentResults = (status) => {
  const statusContainer = document.getElementById('payment-status-container')
  if (status === 'SUCCESS') {
    statusContainer.classList.remove('is-failure')
    statusContainer.classList.add('is-success')
  } else {
    statusContainer.classList.remove('is-success')
    statusContainer.classList.add('is-failure')
  }

  statusContainer.style.visibility = 'visible'
}

document.addEventListener('DOMContentLoaded', async () => {
  const payments = window.Square.payments(appId, locationId)
  const card = await initializeCard(payments)
  async function handlePaymentMethodSubmission(event, paymentMethod) {
    event.preventDefault()

    try {
      // disable the submit button as we await tokenization and make a
      // payment request.
      cardButton.disabled = true
      const token = await tokenize(paymentMethod)
      const paymentResults = await createPayment(token)
      displayPaymentResults('SUCCESS')
      paymentWindow.close()
      //redirect to the order success page
      window.location.href = '/success'

      console.debug('Payment Success', paymentResults)
    } catch (e) {
      cardButton.disabled = false
      displayPaymentResults('FAILURE')
      console.error(e.message)
    }
  }

  cardButton.addEventListener('click', async function (event) {
    await handlePaymentMethodSubmission(event, card)
  })
})

//get the cart from session storage

const order = await fetch(`http://localhost:5000/api/orders/${orderId}`)

const orderData = await order.json()

console.log(orderData)

cartSummary.innerHTML = ''

cartSummary.innerHTML =
  cartSummary.innerHTML +
  cart.map(
    (item) =>
      `<tr>
  <td>${item.day}</td>
  <td>${item.mealType}</td>
  <td>${item.quantity}</td>
  <td>$${((parseInt(item.quantity) * item.price) / 100).toFixed(2)}</td>
  <td>
    <a href="#" class="btn btn-danger btn-sm">Remove</a>
  </td>
</tr>`
  )
deliveryContainer.innerHTML = `<h4>Taxes:</h4><div class="mx-2">$${(
  orderData.tax / 100
).toFixed(2)}</div><hr />`

subTotalContainer.innerHTML = `<h4>Sub Total:</h4><div class="mx-2">$${(
  (orderData.total - orderData.tax) /
  100
).toFixed(2)}</div><hr />`

totalContainer.innerHTML = `<h4>Total:</h4><div class="mx-2">$${(
  orderData.total / 100
).toFixed(2)}</div><hr />`

checkoutButton.addEventListener('click', () => {
  //open the payment window dialog
  paymentWindow.showModal()
})

closePayment.addEventListener('click', () => {
  //close the payment window dialog
  paymentWindow.close()
})
