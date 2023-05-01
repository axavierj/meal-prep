const contactForm = document.querySelector('#contactForm')

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log(e.target.name.value)
  console.log(e.target.email.value)
  console.log(e.target.message.value)

  const contact = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
  }

  const contactRes = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  })

  const contactData = await contactRes.json()

  const messageRes = await fetch('http://localhost:5000/api/contact/response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  })

  const messageData = await messageRes.json()
  console.log(messageData, contactData)

  e.target.reset()
})
