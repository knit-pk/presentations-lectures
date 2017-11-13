const db = require('./../config/mongoose-instance.js')
const articleRouter = require('express').Router()
const Article = db.model('Article')

// *********************** SETTINGS
const articleQuery = process.env.NODE_ENV === 'test' ? {} : { hidden: { $eq: false } }
// _id is added by default you have to explicitly turn of adding _id field if needed
const selectors = {
  listSelector: ['title', 'description', 'hidden']
}
const sortFromNewest = { _id: -1 }
// ****************************

// *********************** TEMPLATES
// Interesting behaviour of MongoDB ObjectId
// It consist of Date when sth was created + uniqueId

// Get list of articles
articleRouter.get('/', (req, res) => {
  Article
    .find(articleQuery).sort(sortFromNewest)
    .select(selectors.listSelector)
    .then(articleList => res.render('articles-list', { articleList }))
})

// Get template to create a new article
articleRouter.get('/new', (req, res) => res.render('article-new'))

// Get template to edit existing article
articleRouter.get('/edit/:_id', (req, res) => {
  Article
    .findById(req.params._id)
    .then(article => res.render('article-edit', { article }))
})
// *********************** END TEMPLATES

// *********************** REQUEST HANDLING
// Get article using id
articleRouter.get('/:_id', (req, res) => {
  Article
    .findById(req.params._id)
    .then(article => res.render('article-detail', { article }))
})

articleRouter.post('/:_id', (req, res) => {
  const reqBody = req.body
  const articleId = req.params._id

  const articleBody = {
    title: reqBody.title,
    description: reqBody.description,
    content: reqBody.content,
    author: {
      username: reqBody.username,
      signature: reqBody.signature,
      lastName: reqBody.lastName
    }
  }

  // Get article by _id, change it's properties, then save and redirect
  Article
    .findById(articleId)
    .then(article => {
      article = Object.assign(article, articleBody)
      article
        .save()
        .then(editedArticle => res.redirect(`/articles/${editedArticle._id}`))
    })
})

articleRouter.post('/', (req, res) => {
  const reqBody = req.body

  const articleBody = {
    title: reqBody.title,
    description: reqBody.description,
    content: reqBody.content,
    author: {
      username: reqBody.username,
      signature: reqBody.signature,
      lastName: reqBody.lastName
    }
  }

  // Create, save and redirect to new article
  new Article(articleBody)
    .save()
    .then(savedArticle => res.redirect(`/articles/${savedArticle._id}`))
})
// ********************** END REQUEST HANDLING

module.exports = articleRouter
