var responses = require('../../controllers/responseController');
var Models = require('../../models/AppModel')

var post= {getAll: function(req, res) {
    var $model = new Models('post', null, null)
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
        "Content":req.body.Content,
        "AuthorID":req.user.id
    }
    }
     var $model = new Models('post', $data,null);
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
        var $model = new Models('post', $data,null);
        $model.updateTable('post', { "id": $data.id }, $data)
            .then(response => {
                if(response){
                res.send(responses.get(200, "Ok", $data, false))
                }else{
                    res.send(responses.get(200, "ok", "Something went wrong", false))
                }
            }).catch(error => {
                console.log(error);
                res.send(responses.get(200, "Error",error, false))

            });
    },
    
    delete: async function(req, res) {
        var $model = new Models('post', null, null)
        $id = req.query.id
        console.log($id+"kkkkkkkkkkk")
        console.log('inside delete order')
        $model.deleteFrom("post", { "id": $id })
            .then($status => res.send(responses.get(200, "Ok", $status, false)))
            .catch($error => console.log($error))
            res.status(500).send(responses.get(500, "Error", "You were reference with other table, Failed to delete post", false));
    }
}
module.exports = post