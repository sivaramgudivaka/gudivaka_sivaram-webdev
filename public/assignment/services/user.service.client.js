/**
 * Created by Sivaram on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: 122, username: "siva", email: "awon@gm.com", password: "siva", firstName: "siva", lastName: "g"},
            {_id: 123, username: "alice", email: "awon@gm.com", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: 234, username: "bob", email: "bmar@gm.com", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: 345, username: "charly", email: "cgar@gm.com", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: 456, username: "jannunzi", email: "janzi@gm.com", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };
        return api;

        function createUser(user) {
            user._id = maxId()+1;
            users.push(user);
            return user;
        }

        function maxId(){
            var maxId=0;
            for(u in users){
                if(users[u]._id > maxId){
                    maxId = users[u]._id;
                }
            }
            return maxId;
        }


        function findUserById(userId) {
            for(var u in users) {
                if(users[u]._id === userId) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                user = users[u];
                if(user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                user = users[u];
                if(user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user){
            for(var u in users) {
                if(users[u]._id === userId) {
                    users[u] = user;
                    return user;
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(var u in users) {
                if(users[u]._id === userId) {
                    users.splice(u, 1);
                    break;
                }
            }
            return null;
        }
    }
})();