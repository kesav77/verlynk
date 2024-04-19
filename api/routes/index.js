const express = require('express');
var routes = express.Router();

const useRoutes = require('../modules/users/Routes.js')
const postRoutes = require('../modules/post/Routes.js')
const commentsRoutes = require('../modules/comments/Routes.js')



useRoutes.init(routes)
postRoutes.init(routes)
commentsRoutes.init(routes)



module.exports = routes;