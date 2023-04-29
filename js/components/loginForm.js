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
            <div class="mt-3">
            <p>Don't have an account? <a href="/register/" class="btn btn-info">register</a></p>
            </div>
          </form>
        </section>
      </div>`
  }
  connectedCallback() {
    //check for a user in session storage
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      //if user exists, redirect to another page
      window.location.href = '/order/'
    }
    //get the form element
    const form = this.querySelector('#loginForm')
    //listen for the submit event
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      //get the values from the form
      const email = form.querySelector('#email').value
      const password = form.querySelector('#password').value
      //call the login method
      const response = await this.logIn(email, password)
      //check if the response is valid
      if (response) {
        //if valid, store the user in session storage
        sessionStorage.setItem('user', JSON.stringify(response))
        e.target.reset()
        //redirect to another page
        window.location.href = '/order/'
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
    //check the response status
    if (response.status !== 200) {
      //if not 200, display an error message
      const message = await response.text()
      alert(message)
      return
    }
    const data = await response.json()
    return data
  }
}

customElements.define('login-form', LogInForm)
