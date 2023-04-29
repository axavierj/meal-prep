const routGardTemplate = document.createElement('template')
routGardTemplate.innerHTML = `
<div>
    <slot></slot>
</div>
`

class RoutGuard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(routGardTemplate.content.cloneNode(true))
  }

  connectedCallback() {
    if (!sessionStorage.getItem('user')) {
      window.location.href = '/login'
    }
  }
}

window.customElements.define('route-guard', RoutGuard)
