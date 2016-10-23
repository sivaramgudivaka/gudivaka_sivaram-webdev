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
        var userId = parseInt($routeParams.uid);
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();
        vm.userId = userId;
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.newWebsite = newWebsite;
        var userId = parseInt($routeParams.uid);
        vm.userId = userId;
        vm.websites = WebsiteService.findWebsitesByUser(userId);

        function newWebsite(website) {
            WebsiteService.createWebsite(userId, website);
            $location.url("/user/" + userId + "/website");
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        vm.userId = userId;
        var websiteId = parseInt($routeParams.wid);
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.websites = WebsiteService.findWebsitesByUser(userId);
        vm.website = angular.copy(WebsiteService.findWebsiteById(websiteId));

        function updateWebsite(website) {
            WebsiteService.updateWebsite(userId, website);
            $location.url("/user/" + userId + "/website");
        }

        function deleteWebsite(website){
            WebsiteService.deleteWebsite(website._id);
            $location.url("/user/" + userId + "/website");
        }
    }
})();