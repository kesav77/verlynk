var responses = require('../../controllers/responseController');
var Models = require('../../models/AppModel')

var comments= {getAll: function(req, res) {
    var $model = new Models('comments', null, null)
    $model.find('all')
        .then(response => {
            res.send(responses.get(200, "Ok", response, false))
        }).catch(error => {
            console.log(error);
            res.send(responses.get(200, "Error", error, false))
        });
},

create:function(req, res) {
    let $data = req.body;
    if  (req.body) {
        $data = {
        "post_id":req.body.post_id,
        "comments":req.body.comments,
        "AuthorID":req.user.id
    }
    }
     var $model = new Models('comments', $data,null);
    $model.create($data)
            .then(response => {
                res.send(responses.get(200, "Ok", response.options.data, false))
            }).catch(error => {
                    console.error(error);
                    res.send(responses.get(200, "Error", "something went wrong", false))
            });
    },

    save: function(req, res) {
        let $data = req.body;
        const id = req.user.id;
        if (req.query.id) {
            $data.id = req.query.id;
        }
        var $model = new Models('comments', $data,null);
        $model.updateTable('comments', { "id": $data.id }, $data)
            .then(response => {
                if(response){
                res.send(responses.get(200, "Ok", $data, false))
                }else{
                    res.send(responses.get(200, "ok", "Something went wrong", false))
                }
            }).catch(error => {
                console.log(error);
                res.send(responses.get(200, "Error", "Something went wrong", false))

            });
    },
    
    delete: async function(req, res) {
        $id = req.query.id
        var $model = new Models('comments', null, null)
        console.log($id+"kkkkkkkkkkkkkkkkkkk")
        console.log('inside delete order')
        $model.deleteFrom("comments", { "id": $id })
            .then($status => res.send(responses.get(200, "Ok", $status, false)))
            .catch($error => console.log($error))
            res.status(500).send(responses.get(500, "Error", "You were reference with other table, Failed to delete comments", false));

    }
}
module.exports = comments