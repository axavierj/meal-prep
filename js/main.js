const scrollToTopBtn = document.querySelector('#scroll-to-top-btn')
const homeSection = document.querySelector('#home')

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      scrollToTopBtn.classList.remove('show')
    } else {
      scrollToTopBtn.classList.add('show')
    }
  },
  { threshold: [0] }
)

observer.observe(homeSection)
