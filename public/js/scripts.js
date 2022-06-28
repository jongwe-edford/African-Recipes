const addIngredientBtn = document.getElementById('addIngredientBtn')
let ingredientList = document.querySelector('.ingredient-list')
let ingredientDiv = document.querySelectorAll('.ingredient-div')[0]

addIngredientBtn.addEventListener('click', () => {
  let newIngredients = ingredientDiv.cloneNode(true)
  let input = newIngredients.getElementsByTagName('input')[0]
  input.value = ''

  ingredientList.appendChild(newIngredients)
})
