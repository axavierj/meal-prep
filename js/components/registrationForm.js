const registrationTemplate = `
<div>
        <section class="container">
          <form class="card p-4" id="registrationForm">
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
              
            <section class="row mb-3">
              <div class="form-group col-md-6">
                <label for="given_name">First name</label>
                <input
                  type="text"
                  class="form-control"
                  id="given_name"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label for="family_name">Last name</label>
                <input
                  type="text"
                  class="form-control"
                  id="family_name"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </section>
            <div class="form-group mb-3">
              <label for="address">address</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Enter your address"
                required
              />
            </div>
            <section class="row mb-3">
              <div class="form-group col-md-6">
                <label for="city">city</label>
                <input
                  type="text"
                  class="form-control"
                  id="city"
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label for="zipCode">zip code</label>
                <input
                  type="text"
                  class="form-control"
                  id="zipCode"
                  placeholder="Enter your zipCode"
                  required
                />
              </div>
            </section>
            <div class="form-group mb-3">
              <label for="phoneNumber">phone number</label>
              <input
                type="tel"
                class="form-control"
                id="phoneNumber"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <button class="btn btn-secondary">register</button>
            </div>
          </form>
        </section>
      </div>
`
class RegistrationForm extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = registrationTemplate
    this.password = this.querySelector('#password')
    this.matchPass = false
  }

  connectedCallback() {
    const form = this.querySelector('#registrationForm')
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const body = this.convertFormToObj(e)
      const url = 'http://localhost:5000/api/auth/register'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      if (response.status === 400) {
        alert(data.message)
        return
      }

      e.target.reset()
      sessionStorage.setItem('user', JSON.stringify(data))
      window.location.href = '/login'
    })
  }

  convertFormToObj(e) {
    const email = e.target.email.value
    const password = e.target.password.value
    const given_name = e.target.given_name.value
    const family_name = e.target.family_name.value
    const address = e.target.address.value
    const city = e.target.city.value
    const zipCode = e.target.zipCode.value
    const phoneNumber = e.target.phoneNumber.value
    const body = {
      email,
      password,
      given_name,
      family_name,
      address,
      city,
      zipCode,
      phoneNumber,
    }
    return body
  }
}

customElements.define('registration-form', RegistrationForm)
