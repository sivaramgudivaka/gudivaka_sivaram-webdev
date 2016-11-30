/**
 * Created by Sivaram on 10/17/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        function init() {
            WebsiteService.findWebsitesByUser(userId)
                .success(function(websites){
                   vm.websites = websites;
                })
                .error(function(err){
                    console.log(err);
                });
        }
        init();
        vm.userId = userId;
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.newWebsite = newWebsite;
        var userId = $routeParams.uid;
        vm.userId = userId;

        function init() {
            WebsiteService.findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (err) {
                    console.log(err);
                });
        }
        init();

        function newWebsite(website) {
            WebsiteService.createWebsite(userId, website)
                .success(function () {
                    init();
                    $location.url("/user/" + userId + "/website");
                })
                .error(function(err){
                    console.log(err);
                });
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;
        var websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init(){
            WebsiteService.findWebsitesByUser(userId)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(err){
                    console.log(err);
                });
            WebsiteService.findWebsiteById(websiteId)
                .success(function(website){
                    vm.website = angular.copy(website);
                })
                .error(function(err){
                    console.log(err);
                });
        }

        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(website)
                .success(function(website){
                    init();
                    $location.url("/user/" + userId + "/website");
                })
                .error(function(msg){
                    console.log("Error updating");
                });
        }

        function deleteWebsite(website){
            WebsiteService.deleteWebsite(website._id)
                .success(function(website){
                    init();
                    $location.url("/user/" + userId + "/website");
                })
                .error(function(msg){
                    console.log("Error updating");
                });
        }
    }
})();
