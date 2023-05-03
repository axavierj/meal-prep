export const renderMenuItems = (items) => {
  return items
    .map((item) => {
      return `
      <div class="row animate__animated animate__fadeIn">
        <div class="col-md-6">
          <form>
            <div class="form-group">
              <label for="${item.day}-quantity">Quantity</label>
              <input
                type="number"
                class="form-control"
                id="${item.day}-quantity"
                name="${item.day}-quantity"
                min="0"
                value="1"
              />
            </div>
            <div class="form-group mb-3">
              <label for="${item.day}-meal-type">Meal Type</label>
              <select class="form-control" id="${item.day}-meal-type" name="${item.day}-meal-type">
                <option value="regular">Regular</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="lowcarb">Low Carb</option>
                <option value="hiprotein">High Protein</option>
                <option value="lowprotein">Low Protein</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="family">Family</option>
              </select>
            </div>
            <button class="btn btn-secondary">
              <i class="bi bi-cart-plus"></i>
            </button>
          </form>
        </div>
        <section class="col-md-6">
          <h3>${item.day}</h3>
          <p>${item.description}</p>
          <p>Current order: <strong id="${item.day}-info"></strong></p>
        </section>
      </div>
      <hr />
    `
    })
    .join('')
}

export const getActiveMenu = async () => {
  const url = 'http://localhost:5000/api/menus?active=true'
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export const getCustomerData = async () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const url = `http://localhost:5000/api/customer/${user.sqid}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}
