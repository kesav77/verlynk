const UserManagement = require('./Users')
var registrationRoutes ={

    init(router) {
        router.post('/users', UserManagement.Registration)
        router.get('/login', UserManagement.Login)
        router.post('/update', UserManagement.save)
        router.delete('/delete', UserManagement.delete)

    }
}
module.exports = registrationRoutes 