const template = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">My App</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto" id="mainnav">
        <li class="nav-item">
          <a class="nav-link" href="#services">Services</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#about">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#contact">Contact</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#team">Team</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/menu/">Menu</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`
class Navbar extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = template
  }
  connectedCallback() {
    console.log('Navbar connected')
  }
  static get observedAttributes() {
    return ['links']
  }
  get links() {
    return this.getAttribute('links')
  }
  set links(value) {
    this.setAttribute('links', value)
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render(name)
    }
  }
  render(name) {
    if (name === 'links') {
      console.log(JSON.parse(this.links))
      const links = JSON.parse(this.links)
      const nav = this.querySelector('#mainnav')
      nav.innerHTML = ''
      nav.innerHTML += links
        .map((link) => {
          return `<li class="nav-item">
          <a class="nav-link" href="${link.href}">${link.name}</a>
        </li>`
        })
        .join('')
    }
  }
}

customElements.define('nav-bar', Navbar)
