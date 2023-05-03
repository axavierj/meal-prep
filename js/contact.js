import { closeAlert } from './services/contact.service.js'
import { handleContactFormSubmit } from './services/contact.service.js'

const contactForm = document.querySelector('#contactForm')
const closeContactAlert = document.querySelector('#closeContactAlert')

contactForm.addEventListener('submit', handleContactFormSubmit)

closeContactAlert.addEventListener('click', () => {
  const contactAlert = document.querySelector('#contactAlert')
  closeAlert(contactAlert)
})
