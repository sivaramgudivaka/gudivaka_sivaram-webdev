module.exports = function(app) {

    var users = [
        {_id: 122, username: "siva", email: "awon@gm.com", password: "siva", firstName: "siva", lastName: "g"},
        {_id: 123, username: "alice", email: "awon@gm.com", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: 234, username: "bob", email: "bmar@gm.com", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: 345, username: "charly", email: "cgar@gm.com", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: 456, username: "jannunzi", email: "janzi@gm.com", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function deleteUser(req, res) {
        var uid = parseInt(req.params.uid);
        for(var u in users) {
            if(users[u]._id === uid) {
                users.splice(u, 1);
                return;
            }
        }
        res.send(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = parseInt(req.params.uid);
        for(var u in users) {
            if(users[u]._id == uid) {
                users[u] = user;
                return;
            }
        }
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);
        res.send(user);
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users) {
            if(users[u].username === username &&
                users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }
    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }
    function findUserById(req, res) {
        var userId = parseInt(req.params.uid);
        for(var u in users) {
            if(users[u]._id === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }
};