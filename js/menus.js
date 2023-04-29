const menuTitle = document.querySelector('#menuTitle')
const menuList = document.querySelector('#menuList')

const getActiveMenu = async () => {
  const url = 'http://localhost:5000/api/menus?active=true'
  const response = await fetch(url)
  const data = await response.json()
  return data
}

const activeMenu = await getActiveMenu()

menuTitle.innerHTML = activeMenu.title
menuList.innerHTML = ''
menuList.innerHTML = activeMenu.items
  .map(
    (item) =>
      `<li class="list-group-item">
  <div class="row align-items-center">
    <div class="col-md-3">
      <img
        src="https://via.placeholder.com/150x150"
        alt="Dish Image"
        class="img-fluid"
      />
    </div>
    <div class="col-md-9">
      <h4 class="card-title">${item.day}</h4>
      <p class="card-text">${item.description}</p>
    </div>
  </div>
</li>`
  )
  .join('')
