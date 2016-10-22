/**
 * Created by Sivaram on 10/17/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var user = UserService.findUserByCredentials(user.username, user.password);
            if(user === null) {
                vm.error = "No such user";
            } else {
                vm.user = user;
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user.password == user.password2){
                var usr = UserService.findUserByCredentials(user.username, user.password);
                if(usr === null) {
                   usr =  UserService.createUser({"username" : user.username, "password" : user.password});
                    $location.url("/user/" + usr._id);
                } else {
                    vm.error = "user already exists";
                }
            } else {
                vm.error("passwords don't match");
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var user = UserService.findUserById(userId);
        if(user !== null) {
            vm.user = user;
        }
    }
})();