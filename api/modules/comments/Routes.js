const Comments = require('./comments');
var CommentsRoutes ={

    init(router) {
        router.get('/getComments', Comments.getAll)
        router.post('/postcomments', Comments.create)
        router.post('/updateComments', Comments.save)
        router.delete('/deleteComments', Comments.delete)

    }
}
module.exports = CommentsRoutes 