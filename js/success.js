const clearSession = () => {
  sessionStorage.removeItem('order')
}

//get the order from the session storage
const sessionOrder = JSON.parse(sessionStorage.getItem('order'))
const sessionUser = JSON.parse(sessionStorage.getItem('user'))

const sendReceipt = await fetch('http://localhost:5000/api/payment/receipt', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ order: sessionOrder, user: sessionUser }),
})

const sendReceiptData = await sendReceipt.json()

console.log(sendReceiptData)

//make a post request to the server end point api/kitchen/orders on localhost 5000
const postOrder = await fetch('http://localhost:5000/api/kitchen/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(sessionOrder),
})

const postOrderData = await postOrder.json()

//if the order is successfully posted to the server end point
if (postOrderData.success) {
  clearSession()
  setTimeout(() => {
    window.location.href = '/'
  }, 3000)
}
