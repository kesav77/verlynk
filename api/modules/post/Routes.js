const post = require('./post');
var postRouts ={

    init(router) {
        router.get('/getpost', post.getAll)
        router.post('/blogpost', post.create)
        router.post('/updatepost', post.save)
        router.delete('/deletepost', post.delete)

    }
}
module.exports = postRouts 