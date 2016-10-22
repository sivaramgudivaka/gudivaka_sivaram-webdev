/**
 * Created by Sivaram on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": 321, "name": "Post 1", "websiteId": 456, "description": "nhjk" },
            { "_id": 432, "name": "Post 2", "websiteId": 456, "description": "nhjk" },
            { "_id": 543, "name": "Post 3", "websiteId": 456, "description": "nhjk" },
            { "_id": 544, "name": "Post 4", "websiteId": 790, "description": "nhjk" }
        ];

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
            page._id = maxId()+1;
            pages.push(page);
            return null;
        }

        function maxId(){
            var maxId=0;
            for(p in pages){
                if(pages[p]._id > maxId){
                    maxId = pages[p]._id;
                }
            }
            return maxId;
        }

        function findPagesByWebsiteId(websiteId) {
            return pages.filter(function(page){
                return page.websiteId === websiteId;
            });
        }

        function findPageById(pageId) {
            for(var p in pages) {
                page = pages[p];
                if(page._id === pageId) {
                    return page;
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages[p] = page;
                    return page;
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                    break;
                }
            }
            return null;
        }
    }
})();