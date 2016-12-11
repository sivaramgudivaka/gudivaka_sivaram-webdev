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
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.websiteId = websiteId;
        vm.userId = userId;

        function init() {
            PageService.findPagesByWebsiteId(websiteId)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(msg){
                    console.log(msg);
                })
        }
        init();
    }

    function NewPageController($location, $routeParams, PageService, $scope) {
        var vm = this;
        vm.newPage = newPage;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.websiteId = websiteId;
        vm.userId = userId;

        function init() {
            PageService.findPagesByWebsiteId(websiteId)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(msg){
                    console.log(msg);
                });
        }
        init();

        function newPage(page) {
            if(!page || !page.name){
                vm.pgErr = "Page name cannot be empty";
                vm.PErr = "Invalid field(s)";
                $scope.name = {"border": "1px solid #d9534f"};
            }else {
                vm.PErr = "";
                vm.pgErr = "";
                $scope.name = {};
                PageService.createPage(websiteId, page)
                    .success(function (page) {
                        init();
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                    })
                    .error(function (msg) {
                        console.log(msg);
                    });
            }
        }
    }

    function EditPageController($routeParams, $location, PageService, $scope) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init(){
            PageService.findPagesByWebsiteId(websiteId)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(msg){
                    console.log(msg);
                });
            PageService.findPageById(pageId)
                .success(function(page){
                    vm.page = angular.copy(page);
                });
        }

        init();

        function updatePage(page) {
            if(!page || !page.name){
                vm.pgErr = "Page name cannot be empty";
                vm.PErr = "Invalid field(s)";
                $scope.name = {"border": "1px solid #d9534f"};
            }else {
                vm.PErr = "";
                vm.pgErr = "";
                $scope.name = {};
                PageService.updatePage(page)
                    .success(function (page) {
                        init();
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                    })
                    .error(function (msg) {
                        console.log("Error updating");
                    });
            }
        }

        function deletePage(page){
            PageService.deletePage(page._id)
                .success(function(page){
                    init();
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                })
                .error(function(msg){
                    console.log("Error updating");
                });
        }
    }
})();