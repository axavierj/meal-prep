const footerTemplate = `
<footer class="bg-dark text-light py-4">
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <h4>Social Media</h4>
        <ul class="list-unstyled">
          <li>
            <a href="https://www.facebook.com/LittleRibbon87" target="_blank"><i class="bi bi-facebook"></i> Facebook</a>
          </li>
          <li>
            <a href="#"><i class="bi bi-twitter"></i> Twitter</a>
          </li>
          <li>
            <a href="#"><i class="bi bi-instagram"></i> Instagram</a>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <h4>Address</h4>
        <p>123 Main St</p>
        <p>Anytown, USA 12345</p>
      </div>
      <div class="col-md-4">
        <h4>Contact Us</h4>
        <p>Email: info@littleribboncakes.com</p>
        <p>Phone: 555-123-4567</p>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-12 text-center">
        <p>&copy; 2023 Company Name. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</footer>
`

class Footer extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = footerTemplate
  }
  connectedCallback() {
    console.log('Footer connected')
  }
}

customElements.define('site-footer', Footer)
