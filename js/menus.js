const getMenuTitle = (menu) => (menu ? menu.title : 'No Active Menu')

const getMenuListItems = (menu) => {
  if (!menu) {
    return ''
  }

  return menu.items
    .map(
      (item) => `<li class="list-group-item">
      <div class="row align-items-center">
        <div class="col-md-3">
          <img
            src=${
              item?.image ? item.image : 'https://via.placeholder.com/150x150'
            }
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
}

const setMenu = (menu) => {
  const menuTitle = document.querySelector('#menuTitle')
  const menuList = document.querySelector('#menuList')

  menuTitle.innerHTML = getMenuTitle(menu)
  menuList.innerHTML = getMenuListItems(menu)
}

const getActiveMenu = async () => {
  const url = 'http://localhost:5000/api/menus?active=true'
  const response = await fetch(url)
  const data = await response.json()
  return data
}

const initMenu = async () => {
  const activeMenu = await getActiveMenu()
  setMenu(activeMenu)
}

initMenu()
