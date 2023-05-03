function callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Element is in the viewport, add class to animate
      entry.target.classList.add('slide-in')
      entry.target.classList.remove('slide-out')
    } else {
      // Element is not in the viewport, remove class to animate
      entry.target.classList.remove('slide-in')
      entry.target.classList.add('slide-out')
    }
  })
}
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
}

const observer = new IntersectionObserver(callback, options)

const services = document.querySelectorAll('.service')

services.forEach((service) => {
  observer.observe(service)
})
