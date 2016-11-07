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
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .success(function(user){
                    if(user === null) {
                        vm.error = "No such user";
                    } else {
                        vm.user = user;
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function(err){
                    console.log(err);
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user.password != user.password2)
                vm.error("passwords don't match");
            else{
                var ExistingUsr = UserService.findUserByCredentials(user.username, user.password);
                ExistingUsr
                    .success(function(usr) {
                        if(usr == 0){
                            var create = UserService.createUser({"username" : user.username, "password" : user.password});
                            create.success(function(newUser){
                                $location.url("/user/" + newUser._id);
                            });
                        }else
                            vm.error = "user already exists";
                    })
                    .error(function(err) {
                        console.log(err);
                    });
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        UserService.findUserById(userId)
            .success(function(user){
                    vm.user = user;
            });
    }
})();