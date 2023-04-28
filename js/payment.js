const checkoutButton = document.querySelector('#checkoutButton')
const supportedPaymentMethods = [
  {
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      supportedTypes: ['credit', 'debit'],
    },
  },
]

const paymentDetails = {
  total: {
    label: 'Total',
    amount: { currency: 'USD', value: '10.00' },
  },
  displayItems: [
    {
      label: 'Item',
      amount: { currency: 'USD', value: '10.00' },
    },
  ],
}

const options = {
  requestPayerName: true,
  requestPayerEmail: true,
  requestPayerPhone: true,
  requestShipping: true,
  shippingType: 'shipping',
}

const paymentRequest = new PaymentRequest(
  supportedPaymentMethods,
  paymentDetails,
  options
)

checkoutButton.addEventListener('click', async () => {
  try {
    const paymentResponse = await paymentRequest.show()
    const paymentData = await paymentResponse.json()
    console.log(paymentData)
    paymentResponse.complete('success')
  } catch (err) {
    console.log(err)
  }
})
