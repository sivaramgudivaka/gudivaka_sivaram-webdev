/**
 * Created by Sivaram on 11/25/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel
            .findWebsiteById(websiteId)
            .populate("pages")
            .exec();
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel
            .update({_id: pageId},page);
    }

    function deletePage(pageId){
        return PageModel
            .findById(pageId)
            .then(function(page){
                model.websiteModel
                    .findWebsiteById(page._website)
                    .then(function(websiteObj){
                        var pages = websiteObj.pages;
                        var index = pages.indexOf(pageId);
                        pages.splice(index, 1);
                        websiteObj.pages = pages;
                        websiteObj.save();
                        return PageModel
                            .remove({_id: pageId})
                    });
            });
    }

    function createPage(websiteId, page) {
        return PageModel
            .create(page)
            .then(function(pageObj){
                model.websiteModel
                    .findWebsiteById(websiteId)
                    .then(function(websiteObj){
                        pageObj._website = websiteObj._id;
                        pageObj.save();
                        websiteObj.pages.push(pageObj);
                        return websiteObj.save();
                    }, function(error){
                        console.log(error);
                    });
            });
    }
};