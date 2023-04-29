const badgeTemplate = `<span class="badge text-bg-secondary" id="badge">0</span>`

class Badge extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = badgeTemplate
  }
  connectedCallback() {
    console.log('Badge connected')
  }
  static get observedAttributes() {
    return ['count']
  }
  get count() {
    return this.getAttribute('count')
  }
  set count(value) {
    this.setAttribute('count', value)
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (oldValue === null) {
        oldValue = 0
      }
      const updatedCount = parseInt(newValue) + parseInt(oldValue)
      const badge = document.getElementById('badge')
      badge.innerHTML = updatedCount
    }
  }
}

customElements.define('badge-component', Badge)
