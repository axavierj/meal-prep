import host from './data/hostData.js'

const cakeForm = document.querySelector('#cakeForm')
const eventDate = document.querySelector('#eventDate')
const guestCount = document.querySelector('#guestCount')
const flavor = document.querySelector('#flavor')
const finish = document.querySelector('#finish')
const theme = document.querySelector('#theme')
const colorPalette = document.querySelector('#colorPalette')
const referenceImages = document.querySelector('#referenceImages')
const additionalDetails = document.querySelector('#additionalDetails')
const eventLocation = document.querySelector('#eventLocation')
const inquiryAlert = document.querySelector('#inquiryAlert')
const inquiryAlertClose = document.querySelector('#inquiryAlertClose')
const user = JSON.parse(sessionStorage.getItem('user'))
const formData = new FormData(cakeForm)

inquiryAlertClose.addEventListener('click', () => {
  inquiryAlert.close()
  location.pathname = '/cake/'
})

cakeForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  formData.append('eventDate', eventDate.value)
  formData.append('guestCount', guestCount.value)
  formData.append('flavor', flavor.value)
  formData.append('finish', finish.value)
  formData.append('theme', theme.value)
  formData.append('colorPalette', colorPalette.value)
  formData.append('additionalDetails', additionalDetails.value)
  formData.append('eventLocation', eventLocation.value)
  console.log(referenceImages.files[0])

  const cakeInquiry = {}
  if (referenceImages.files[0]) {
    const file = new FormData()
    file.append('image', referenceImages.files[0])
    const fileUrl = await fetch(`${host}upload`, {
      method: 'POST',
      body: file,
    })
    const fileData = await fileUrl.json()
    console.log(fileData)
    cakeInquiry.referenceImages = fileData.imageUrl
  }

  for (let value of formData.entries()) {
    const [key, val] = value
    cakeInquiry[key] = val
  }
  cakeInquiry.user = user
  try {
    const response = await fetch(`${host}contact/cakeinquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(cakeInquiry),
    })
    inquiryAlert.showModal()
    e.target.reset()
  } catch (err) {
    console.log(err)
  }
})
