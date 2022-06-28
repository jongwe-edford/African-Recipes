const express = require('express')
const recipeController = require('../controllers/recipeController')

const router = express.Router()
/**
 * App Routes
 */
router.get('/', recipeController.homepage)
router.get('/categories', recipeController.exploreCategories)
router.get('/recipe/:id', recipeController.exploreRecipe)
router.get('/categories/:name', recipeController.exploreCategoryByName)
router.get('/latest', recipeController.exploreLatestRecipes)
router.get('/random', recipeController.exploreRandom)

router.post('/search', recipeController.searchRecipe)
router.get('/submit-recipe', recipeController.submitRecipe)
router.post('/submit-recipe', recipeController.submitRecipeData)

module.exports = router
