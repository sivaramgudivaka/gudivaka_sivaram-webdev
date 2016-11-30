/**
 * Created by Sivaram on 11/25/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findAllWebsitesForUser(userId) {
        return model.userModel.findWebsitesForUser(userId);
    }
    
    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel
            .update({ _id: websiteId},website);
    }

    function deleteWebsite(websiteId){
        return WebsiteModel
            .findById(websiteId)
            .then(function(website){
                model.userModel
                    .findUserById(website._user)
                    .then(function(userObj){
                        var websites = userObj.websites;
                        var index = websites.indexOf(websiteId);
                        websites.splice(index, 1);
                        userObj.websites = websites;
                        userObj.save();
                        return WebsiteModel
                            .remove({_id: websiteId})
                    });
            });
    }

    function createWebsiteForUser(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function(websiteObj){
                model.userModel
                    .findUserById(userId)
                    .then(function(userObj){
                        websiteObj._user = userObj._id;
                        websiteObj.save();
                        userObj.websites.push(websiteObj);
                        return userObj.save();
                    }, function(error){
                        console.log(error);
                    });
            });
    }
};