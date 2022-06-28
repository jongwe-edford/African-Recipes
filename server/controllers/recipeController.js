require('../models/database')
const category = require('../models/Category')
const Recipe = require('../models/Recipe')
const recipe = require('../models/Recipe')

/**
 * GET /
 * HOME PAGE
 */

exports.homepage = async (req, res) => {
  try {
    const limit = 5
    const categoryLimit = 4
    const categories = await category.find({}).limit(limit)
    const latest = await recipe.find({}).sort({ _id: -1 }).limit(categoryLimit)
    const nigerian = await recipe
      .find({ category: 'Nigerian' })
      .limit(categoryLimit)
    const liberian = await recipe
      .find({ category: 'Liberian' })
      .limit(categoryLimit)
    const zimbabwean = await recipe
      .find({ category: 'Zimbabwe' })
      .limit(categoryLimit)
    const southAfrican = await recipe
      .find({ category: 'South African' })
      .limit(categoryLimit)
    const egyptian = await recipe
      .find({ category: 'South African' })
      .limit(categoryLimit)

    const food = {
      latest,
      nigerian,
      zimbabwean,
      liberian,
      southAfrican,
      egyptian,
    }

    console.log(food)
    res.render('index', { title: 'Recipe Blog - Home', categories, food })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**
 * GET /categories
 * Categories PAGE
 */
exports.exploreCategories = async (req, res) => {
  try {
    const limit = 20
    const categories = await category.find({}).limit(limit)
    res.render('categories', { title: 'Recipe Blog - Categories', categories })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**
 * GET /recipe/id
 * Recipe page PAGE
 */
exports.exploreRecipe = async (req, res) => {
  try {
    const limit = 20
    let recipeId = req.params.id
    const recipe = await Recipe.findById(recipeId)

    res.render('recipe', { title: 'Recipe Blog - ' + recipe.name, recipe })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**
 * GET /categories/name
 * Category page PAGE
 */
exports.exploreCategoryByName = async (req, res) => {
  try {
    let categoryName = req.params.name
    const recipes = await Recipe.find({ category: categoryName })

    res.render('category', {
      title: 'Recipe Blog - ' + categoryName,
      recipes,
      categoryName,
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**
 * GET /categories/latest
 * Category page PAGE
 */
exports.exploreLatestRecipes = async (req, res) => {
  try {
    let categoryName = 'Latest'
    const recipes = await recipe.find({}).sort({ _id: -1 }).limit(20)

    res.render('category', {
      title: 'Recipe Blog - ' + categoryName,
      recipes,
      categoryName,
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
/**
 * GET /receipe/random
 * Recipe PAGE
 */
exports.exploreRandom = async (req, res) => {
  try {
    let count = await Recipe.find().count()
    let random = Math.floor(Math.random()) * count
    let recipe = await Recipe.findOne().skip(random).exec()
    console.log('Recipe random::', recipe)
    res.render('random-recipe', {
      title: 'Recipe Blog - ' + recipe.name,
      recipe,
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**
 * Post /search
 * search  PAGE
 */
exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm

    let recipes = await Recipe.find({
      $text: {
        $search: searchTerm,
        $diacriticSensitive: true,
        $caseSensitive: false,
      },
    })
    console.log(recipes)
    res.render('search', { recipes, searchTerm })
  } catch (error) {}
}

/**
 * Get /submit-recipe
 * search  PAGE
 */
exports.submitRecipe = async (req, res) => {
  try {
    const infoErrorObj = req.flash('infoErrors')
    const infoSubmitObj = req.flash('infoSubmit')
    res.render('submit-recipe', {
      title: 'Recipe Blog -Sumit Recipe',
    })
  } catch (error) {}
}

/**
 * Get /submit-recipe
 * search  PAGE
 */
exports.submitRecipeData = async (req, res) => {
  try {
    let imageUploadFile
    let uploadPath
    let newImageName

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log('No file selected')
    } else {
      imageUploadFile = req.files.image
      newImageName = Date.now() + imageUploadFile

      uploadPath =
        require('path').resolve('./') + '/public/uploads/' + newImageName

      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err)
      })
    }
    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingrdients: req.body.ingrdients,
      category: req.body.category,
      image: newImageName,
    })

    await newRecipe.save()
  } catch (error) {}
}
