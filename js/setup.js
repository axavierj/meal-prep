import navData from './data/navData.js'

const nav = document.querySelector('nav-bar')

const currentLocation = window.location.pathname
if (currentLocation !== '/') {
  const pageName = currentLocation.split('/')[1]
  document.title = 'Meal Planner - ' + pageName
  nav.links = JSON.stringify(navData)
}

document.title = 'Meal Planner '
