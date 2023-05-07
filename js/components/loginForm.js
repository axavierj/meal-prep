class LogInForm extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = `
    <div>
        <section class="container">
          <form class="card p-4" id="loginForm">
            <div class="bg-dark p-2 text-light">meal prep</div>
            <hr />
            <div class="form-group mb-3">
              <label for="email">Email</label>
              <input
                type="text"
                class="form-control"
                id="email"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div class="form-group mb-3">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                minlength="6"
                required
              />
            </div>

            <button class="btn btn-secondary">log in</button>

            <div class="form-check mt-3">
              <input class="form-check-input" type="checkbox" checked id="terms">
              <label class="form-check-label" for="terms">
              accept our <a href="/terms/">terms and conditions</a>
              </label>
              
            </div>
            <div class="form-check mt-3">
              <input class="form-check-input" type="checkbox" checked id="privacy">
              <label class="form-check-label" for="privacy">
              accept our <a href="/privacy/">privacy statement</a>
              </label>
              
            </div>
            <div class="mt-3">
            <p>Don't have an account? <a href="/register/" class="btn btn-info">register</a></p>
            </div>
          </form>
        </section>
      </div>`
  }
  connectedCallback() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      window.location.href = '/order/'
    }
    const form = this.querySelector('#loginForm')
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const email = form.querySelector('#email').value
      const password = form.querySelector('#password').value
      const terms = form.querySelector('#terms').checked
      const privacy = form.querySelector('#privacy').checked
      if (!terms) {
        alert('You must accept our terms and conditions and privacy statement')
        return
      }

      if (!privacy) {
        alert('You must accept our terms and conditions and privacy statement')
        return
      }

      const response = await this.logIn(email, password)
      if (response) {
        sessionStorage.setItem('user', JSON.stringify(response))
        e.target.reset()
        //redirect back to last page
      }
      const referrer = document.referrer
      if (referrer) {
        window.location.href = referrer
      }
      // If there is no referrer, redirect to a default URL
      else {
        window.location.href = '/'
      }
    })
  }

  async logIn(email, password) {
    const url = 'http://localhost:5000/api/auth/login'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    if (response.status !== 200) {
      const message = await response.text()
      alert(message)
      return
    }
    const data = await response.json()
    return data
  }
}

customElements.define('login-form', LogInForm)
