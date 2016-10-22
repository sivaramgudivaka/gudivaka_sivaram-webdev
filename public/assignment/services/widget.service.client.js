/**
 * Created by Sivaram on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": 123, "widgetType": "heading", "pageId": 321, "size": "6", "text": "GIZMODO"},
            { "_id": 234, "widgetType": "heading", "pageId": 321, "size": "6", "text": "Lorem ipsum"},
            { "_id": 345, "widgetType": "image", "pageId": 321, "width": "50%", "url": "http://lorempixel.com/400/200/"},
            { "_id": 567, "widgetType": "heading", "pageId": 321, "size": "4", "text": "Lorem ipsum"},
            { "_id": 678, "widgetType": "youtube", "pageId": 321, "name":"y1", "text":"dasf", "width": "50%", "url": "https://youtu.be/AM2Ivdi9c4E"},
            { "_id": 790, "widgetType": "youtube", "pageId": 544, "name":"y1", "text":"dasf", "width": "50%", "url": "https://youtu.be/AM2Ivdi9c4E"},
,           { "_id": 791, "widgetType": "heading", "pageId": 544, "text": "heading", "name":"myheading", "size":"6"},
            { "_id": 792, "widgetType": "image", "pageId": 544, "name":"imm", "text":"img", "width": "50%", "url": "http://lorempixel.com/400/200/"}
        ];

        var api = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widget._id = maxId()+1;
            widgets.push(widget);
            return null;
        }

        function maxId(){
            var maxId=0;
            for(w in widgets){
                if(widgets[w]._id > maxId){
                    maxId = widgets[w]._id;
                }
            }
            return maxId;
        }


        function findWidgetsByPageId(pageId) {
            return widgets.filter(function(widget){
                return widget.pageId === pageId;
            });
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                widget = widgets[w];
                if(widget._id === widgetId) {
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets[w] = widget;
                    return widget;
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                    break;
                }
            }
            return null;
        }
    }
})();