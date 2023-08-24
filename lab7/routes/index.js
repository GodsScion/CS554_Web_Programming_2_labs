const home = require('./home')
const path = require("path")

const constructorMethod = (app) => {
    app.use('/', home)
  
    app.use('*', (req, res) => {
      res.sendFile(path.resolve('static/error.html'))
    })
  }

module.exports = constructorMethod