const checkoutButton = document.querySelector('#checkout')
const totalContainer = document.querySelector('#Total')
const subTotalContainer = document.querySelector('#subTotal')
const cartSummary = document.querySelector('#cartSummary')
const deliveryContainer = document.querySelector('#Delivery')
const taxesContainer = document.querySelector('#Taxes')
const paymentWindow = document.querySelector('#payment')
const closePayment = document.querySelector('#closePayment')
const cardButton = document.getElementById('card-button')
const congrats = document.querySelector('#Congrats')
let cart = JSON.parse(sessionStorage.getItem('order')).cart
const user = JSON.parse(sessionStorage.getItem('user'))
const localOrder = JSON.parse(sessionStorage.getItem('order'))
const customer = JSON.parse(sessionStorage.getItem('customer'))

let calculatedOrder

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
    orderId: calculatedOrder.id,
    customerId: user.sqid,
    amount: calculatedOrder.amount,
  })
  const paymentResponse = await fetch('http://localhost:5000/api/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body,
  })
  if (paymentResponse.ok) {
    return paymentResponse.json()
  }
  const errorBody = await paymentResponse.text()
  throw new Error(errorBody)
  //redirect to the error page
  window.location.href = '/error'
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
      // redirect to the order success page
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

if (cart) {
  const generateCartHtml = (cart) => {
    return cart
      .map(
        (item) =>
          `<tr>
      <td>${item.name}</td>
      <td>${item.note}</td>
      <td>${item.quantity}</td>
      <td>$${(
        (parseInt(item.quantity) * item.basePriceMoney.amount) /
        100
      ).toFixed(2)}</td>
      <td>
      <button class="btn btn-danger removeItem" data-line="${item.uid}" id=${
            item.uid
          }>Remove</button>
    </td>
    </tr>`
      )
      .join('')
  }
  cartSummary.innerHTML = ''

  cartSummary.innerHTML = generateCartHtml(cart)

  cartSummary.addEventListener('click', async (event) => {
    if (event.target.classList.contains('removeItem')) {
      let editCart = [...cart]
      editCart = editCart.filter((item) => item.uid !== event.target.id)
      cart = [...editCart]

      const transmitionCart = cart.map((item) => {
        return {
          day: item.name,
          quantity: item.quantity,
          mealType: item.note,
        }
      })
      console.log(transmitionCart)
      const order = await fetch(`http://localhost:5000/api/orders/addprices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ cart: transmitionCart, ...customer }),
      })

      const orderData = await order.json()
      sessionStorage.setItem('order', JSON.stringify(orderData))
      //refresh the page
      window.location.href = '/cart'
    }
  })

  if (localOrder.amount >= 4800) {
    congrats.classList.remove('d-none')
  }

  taxesContainer.innerHTML = `<h4>Taxes:</h4><div class="mx-2">$${(
    localOrder.taxes / 100
  ).toFixed(2)}</div><hr />`

  deliveryContainer.innerHTML = `<h4>Delivery:</h4><div class="mx-2">$${
    localOrder.amount > 4800 ? 0 : (localOrder.serviceCharge / 100).toFixed(2)
  }</div><hr />`

  subTotalContainer.innerHTML = `<h4>Sub Total:</h4><div class="mx-2">$${(
    (localOrder.amount - localOrder.taxes - localOrder.serviceCharge) /
    100
  ).toFixed(2)}</div><hr />`

  totalContainer.innerHTML = `<h4>Total:</h4><div class="mx-2">$${
    localOrder.amount > 4800
      ? ((localOrder.amount - localOrder.serviceCharge) / 100).toFixed(2)
      : (localOrder.amount / 100).toFixed(2)
  }</div><hr />`

  checkoutButton.addEventListener('click', () => {
    //open the payment window dialog
    fetch(`http://localhost:5000/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ localOrder, ...customer }),
    }).then((res) => {
      res.json().then((data) => {
        calculatedOrder = data
        sessionStorage.setItem('order', JSON.stringify(data))
        paymentWindow.showModal()
      })
    })
  })

  closePayment.addEventListener('click', () => {
    //close the payment window dialog
    paymentWindow.close()
  })
}

if (!cart) {
  checkoutButton.disabled = true
}
