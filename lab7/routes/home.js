const express = require('express')
const router = express.Router()
const path = require("path")

router
.route("/")
.get(async (req, res) => {
  return res.sendFile(path.resolve('static/home.html'))
})

module.exports = router