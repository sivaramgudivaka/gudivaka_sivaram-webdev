/**
 * Created by Sivaram on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": 123, "name": "Facebook",    "developerId": 456, "description" : "dewe"},
            { "_id": 234, "name": "Tweeter",     "developerId": 456, "description" : "rwer" },
            { "_id": 456, "name": "Gizmodo",     "developerId": 456, "description" : "rwer" },
            { "_id": 567, "name": "Tic Tac Toe", "developerId": 123, "description" : "werw" },
            { "_id": 678, "name": "Checkers",    "developerId": 123, "description" : "tgre" },
            { "_id": 789, "name": "Chess",       "developerId": 234, "description" : "ffs"},
            { "_id": 790, "name": "Chess2",       "developerId": 122, "description" : "rewr" }
        ];

        var api = {
            createWebsite : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            website.developerId = userId;
            website._id = maxId()+1;
            websites.push(website);
            return findWebsitesByUser(website.developerId);
        }

        function maxId(){
            var maxId=0;
            for(w in websites){
                if(websites[w]._id > maxId){
                    maxId = websites[w]._id;
                }
            }
            return maxId;
        }

        function findWebsitesByUser(userId) {
            return websites.filter(function(website){
                return website.developerId === userId;
            });
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                website = websites[w];
                if(website._id === websiteId) {
                    return website;
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites[w] = website;
                    return website;
                }
            }
            return null;
        }

        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites.splice(w, 1);
                    break;
                }
            }
            return null;
        }
    }
})();