/**
 * Created by Sivaram on 10/17/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        vm.websiteId = websiteId;
        vm.userId = userId;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(websiteId);
        }
        init();
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.newPage = newPage;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pages = PageService.findPagesByWebsiteId(websiteId);

        function newPage(page) {
            PageService.createPage(websiteId, page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        var pageId = parseInt($routeParams.pid);
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.pages = PageService.findPagesByWebsiteId(websiteId);
        vm.page = PageService.findPageById(pageId);

        function updatePage(page) {
            PageService.updatePage(pageId, page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }

        function deletePage(page){
            PageService.deletePage(page._id);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }
    }
})();