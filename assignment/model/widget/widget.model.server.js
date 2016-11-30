/**
 * Created by Sivaram on 11/25/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById : findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }
    
    function reorderWidget(pageId, start, end) {
        return model
            .pageModel
            .findPageById(pageId)
            .then(function (pageObj) {
                var temp = pageObj.widgets[start];
                pageObj.widgets.splice(start, 1);  //pluck it from the initial pos
                pageObj.widgets.splice(end, 0, temp);  //add to to its new place
                pageObj.save();

                var res = [];
                for(var wg in pageObj.widgets){
                    res.push(findWidgetById(pageObj.widgets[wg]));
                }
                return res;
            });
    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel
            .findPageById(pageId)
            .populate("widgets")
            .exec();
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel.update({_id: widgetId},widget);
    }

    function deleteWidget(widgetId){
        return WidgetModel
            .findById(widgetId)
            .then(function(widget){
                model.pageModel
                    .findPageById(widget._page)
                    .then(function(pageObj){
                        var widgets = pageObj.widgets;
                        var index = widgets.indexOf(widgetId);
                        widgets.splice(index, 1);
                        pageObj.widgets = widgets;
                        pageObj.save();
                        return WidgetModel
                            .remove({_id: widgetId})
                    });
            });
    }

    function createWidget(pageId, widget) {
        return WidgetModel
            .create(widget)
            .then(function(widgetObj){
                model.pageModel
                    .findPageById(pageId)
                    .then(function(pageObj){
                        widgetObj._page = pageObj._id;
                        widgetObj.save();
                        pageObj.widgets.push(widgetObj);
                        return pageObj.save();
                    }, function(error){
                        console.log(error);
                    });
            });
    }
};