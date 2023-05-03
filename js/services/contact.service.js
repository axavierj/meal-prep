const submitContactForm = async (contact) => {
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

  return { contactData, messageData }
}

const resetForm = (form) => {
  form.reset()
}

export const handleContactFormSubmit = async (e) => {
  e.preventDefault()
  const contact = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
  }

  const { contactData, messageData } = await submitContactForm(contact)

  const contactAlert = document.querySelector('#contactAlert')
  contactAlert.showModal()

  resetForm(e.target)
}

export const closeAlert = (alert) => {
  alert.close()
}
