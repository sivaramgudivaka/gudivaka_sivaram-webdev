/**
 * Created by Sivaram on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            createPage : createPage,
            findPagesByWebsiteId : findPagesByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            var url = "/api/website/"+websiteId+"/page";
            return $http.post(url, page);
        }

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url);
        }

        function updatePage(page) {
            var url = "/api/page/"+page._id;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/"+pageId;
            return $http.delete(url);
        }
    }
})();