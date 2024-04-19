var responses = require('../../controllers/responseController');
var Models = require('../../models/AppModel')
const jwt = require('jsonwebtoken');




var UserManagement= {
Registration: function(req, res) {
    const $data= req.body;
    console.log($data)
    var $model = new Models('users',$data,null)
    $model.create($data)
            .then(response => {
                res.send(responses.get(200, "Ok", response.options.data, false))
            }).catch(error => {
                if (error.code === 'ER_DUP_ENTRY') {
                    res.status(400).json({ message: "Something went wrong" });
                } else {
                    console.error(error);
                    res.status(500).json({ message: "Email already registered" });
                }
            });

    },
Login: function(req, res) {
        const $data= req.body;
        var $model = new Models('users',$data,null)
        if ($data) {
            $model.where("email= '"+$data.email+"'")
        }
        $model.find('all')
            .then(response => {
                if (response && response.length > 0) {
                    const parsedResponse = JSON.parse(JSON.stringify(response));
                    const password = parsedResponse[0].password;
                    if(password===$data.password){
                        const payload = {
                            id: parsedResponse[0].id, // Assuming the user's ID is stored in the id field
                            username: parsedResponse[0].user_name, // Assuming the user's username is stored in the username field
                            email: parsedResponse[0].email // Assuming the user's email is stored in the email field
                        };
                    var token ="Bearer "
                    token += jwt.sign(payload, 'verlynk', { expiresIn: '20h' });
                    res.json({ token: token, message: "Successfully login" });
                   
                }
                else{
                    res.send(responses.get(200, "ok", "Wrong password", false))
                    }
                } else {
                    res.send(responses.get(200, "ok", " you dont have account", false))
                }
            }).catch(error => {
                console.log(error);
                res.send(responses.get(200, "Error",error, false))
            });

        },
 save: function(req, res) {
            let $data = req.body;
            if (req.query.id) {
                $data.id = req.query.id;
            }
            var $model = new Models('users', $data,null);
            $model.updateTable('users', { "id": $data.id }, $data)
                .then(response => {
                    res.send(responses.get(200, "Ok", $data, false))
    
                }).catch(error => {
                    console.log(error);
                    res.send(responses.get(200, "Error", error, false))
    
                });
        },
    delete: async function(req, res) {
            var $model = new Models('users', null, null)
            $id = req.user.id
            console.log('inside delete order')
            $model.deleteFrom("users", { "id": $id })
                .then($status => res.send(responses.get(200, "Ok", $status, false)))
                .catch($error => console.log($error))
                res.status(500).send(responses.get(500, "Error", "You were reference with other table, Failed to delete user", false));

        },

}
module.exports = UserManagement