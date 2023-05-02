//get the current href
const currentLocation = window.location.pathname
if (currentLocation !== '/') {
  //set the page title to the Meal Planner - currentLocation
  const pageName = currentLocation.split('/')[1]
  document.title = 'Meal Planner - ' + pageName
}

document.title = 'Meal Planner '
