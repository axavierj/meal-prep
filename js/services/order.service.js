export const renderMenuItems = (items) => {
  return items
    .map((item) => {
      return `
      <div class="row animate__animated animate__fadeIn">
        <div class="col-md-2 col-sm-12">
          <form>
            <div class="form-group">
              <label for="${item.day}-quantity">Quantity</label>
              <div class="input-group mb-3">
              <button class="btn btn-outline-secondary decrement" data-target="${
                item.day
              }-quantity" type="button" id="${item.day}-decrement">
                <i class="bi bi-dash-circle"></i>
              </button>
              <input type="number" class="form-control" placeholder="" min="0" value="0" id="${
                item.day
              }-quantity">
              <button class="btn btn-outline-secondary increment" data-target="${
                item.day
              }-quantity" type="button" id="${item.day}-increment">
                <i class="bi bi-plus"></i>
              </button>
</div>
              
            </div>
            <div class="form-group mb-3">
              <label for="${item.day}-meal-type">Meal Type</label>
              <select class="form-control" id="${item.day}-meal-type" name="${
        item.day
      }-meal-type">
                <option value="regular" hidden>Select a meal type</option>
                <option value="regular">Regular</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="lowCarb">Low Carb</option>
                <option value="highProtein">High Protein</option>
                <option value="lowProtein">Low Protein</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="family">Family</option>
              </select>
            </div>
            <button class="btn btn-secondary">
              Add to cart
              <i class="bi bi-cart-plus"></i>
            </button>
          </form>
        </div>
        <section class="col-md-6">
          <h3>${item.day}</h3>
          <p>${item.description}</p>
          <p id="${item.day}-info">Current order: </p>
        </section>
        <section class="col-md-3">
        ${
          item.image
            ? `<img src="${item.image}" alt="${item.day}" class="img-fluid">`
            : ''
        }
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
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  const data = await response.json()
  return data
}

export const sumQuantities = (items) => {
  let sum = 0
  for (let i = 0; i < items.length; i++) {
    sum += parseInt(items[i].quantity)
  }
  return sum
}

export const getTotalQuantityByDay = (items, day) => {
  let total = 0
  for (const item of items) {
    if (item.day === day) {
      total += parseInt(item.quantity)
    }
  }
  return total
}

export const displayAddedAlert = ({ quantity, mealType, day }) => {
  const addedAlert = document.querySelector('#addedAlert')
  const addedAlertClose = document.querySelector('#addedAlertClose')
  const addedAlertDetails = document.querySelector('#addedAlertDetails')

  addedAlertClose.addEventListener('click', () => {
    addedAlert.close()
    addedAlertDetails.innerHTML = ''
  })

  addedAlertDetails.innerHTML = `added ${quantity} ${mealType} ${day} meals to cart`
  addedAlert.classList.add('animate__animated', 'animate__bounceIn')
  addedAlert.showModal()
}

export const addPricesToOrder = async (customer, cart, token) => {
  const order = await fetch(`http://localhost:5000/api/orders/addprices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...customer, cart }),
  })

  return await order.json()
}
