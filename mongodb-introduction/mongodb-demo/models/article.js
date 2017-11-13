const mongoose = require('mongoose')
const _ = require('lodash')

const ArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  hidden: { type: Boolean, default: false },
  author: {
    username: String,
    signature: { type: String, default: 'Anonowicz' },
    lastName: { type: String, default: 'Anon' },
    lastModified: { type: Date, default: Date.now },
    meta: {
      votes: { type: Number, default: 0 }
    },
    created: { type: Date, default: new Date() }
  }
})

ArticleSchema.pre('save', function (next) {
  this.lastModified = new Date()

  const lowerCasedTitle = _.toLower(this.title)
  if (_.includes(lowerCasedTitle, 'test')) {
    this.hidden = true
  }

  next()
})

mongoose.model('Article', ArticleSchema)
