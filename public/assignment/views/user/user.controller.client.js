/**
 * Created by Sivaram on 10/17/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService, $scope) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if(!user){
                vm.LErr = "username/password missing";
                vm.uErr = "username cannot be empty";
                vm.pErr = "password cannot be empty";
                $scope.username = {"border": "1px solid #d9534f"};
                $scope.password = {"border": "1px solid #d9534f"};
            }else if(!user.username){
                vm.LErr = "username/password missing";
                vm.uErr = "username cannot be empty";
                vm.pErr = "";
                $scope.username = {"border": "1px solid #d9534f"};
                $scope.password = {};
            }else if(!user.password){
                vm.LErr = "username/password missing";
                vm.uErr = "";
                vm.pErr = "password cannot be empty";
                $scope.password = {"border": "1px solid #d9534f"};
                $scope.username = {};
            }else {
                vm.LErr = "";
                vm.uErr = "";
                vm.pErr = "";
                $scope.password = {};
                $scope.username = {};
                UserService
                    .login(user)
                    .success(function (user) {
                        vm.user = user;
                        $location.url("/user/" + user._id);
                    })
                    .error(function (err) {
                        vm.error = err;
                    });
            }
        }
    }

    function RegisterController($location, UserService, $rootScope, $scope) {
        var vm = this;
        function register(user) {
            if(!user){
                vm.RErr = "Some of the fields are invalid";
                vm.uErr = "username cannot be empty";
                vm.pErr = "password cannot be empty";
                $scope.username = {"border": "1px solid #d9534f"};
                $scope.password = {"border": "1px solid #d9534f"};
                $scope.password2 = {"border": "1px solid #d9534f"};
            }else if(!user.username){
                vm.RErr = "Some of the fields are invalid";
                vm.uErr = "username cannot be empty";
                vm.pErr = "";
                $scope.username = {"border": "1px solid #d9534f"};
                $scope.password = {};
                $scope.password2 = {};
            }else if(!user.password){
                vm.RErr = "Some of the fields are invalid";
                vm.uErr = "";
                vm.pErr = "password cannot be empty";
                $scope.password = {"border": "1px solid #d9534f"};
                $scope.password2 = {"border": "1px solid #d9534f"};
                $scope.username = {};
            }else if(user.password != user.password2){
                vm.RErr = "passwords don't match";
                vm.pErr = "passwords don't match";
                $scope.password = {"border": "1px solid #d9534f"};
                $scope.password2 = {"border": "1px solid #d9534f"};
                $scope.username = {};
            }
        else{
                vm.RErr = "";
                vm.uErr = "";
                vm.pErr = "";
                $scope.username = {};
                $scope.password = {};
                $scope.password2 = {};
                UserService
                    .register(user)
                    .then(function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    });
            }
        }

        vm.register = register;
    }

    function ProfileController($location, $routeParams, UserService, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateUser = updateUser;
		vm.logout = logout;

        function logout(){
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }

        if ($location.url() == "/user"){
            vm.user = $rootScope.currentUser;
        }else{
            UserService.findUserById(userId)
                .success(function (user) {
                    vm.user = user;
                });
        }

        function updateUser(user) {
            UserService.updateUser(user);
            $location.url("/user/" + user._id + "/website");
        }
    }
})();