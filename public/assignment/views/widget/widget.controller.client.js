/**
 * Created by Sivaram on 10/17/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        var pageId = parseInt($routeParams.pid);
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widgetUrl = widgetUrl;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(pageId);
        }
        init();

        function widgetUrl(widget){
            var url = widget.url;
            if(widget.widgetType == 'image') {
                return $sce.trustAsResourceUrl(url);
            }
            var vId = url.indexOf("?v=");
            if(vId == -1){ //shortened url
                url = 'https://www.youtube.com/embed/' + url.substr(url.lastIndexOf('/')+1);
                return $sce.trustAsResourceUrl(url);
            }
            return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + url.substr(vId+3));
        }

    }

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        var pageId = parseInt($routeParams.pid);
        var widgetId = parseInt($routeParams.wgid);
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widgetId = widgetId;
        vm.goToWidget = goToWidget;
        vm.type = $routeParams.type;
        vm.widgets = WidgetService.findWidgetsByPageId(pageId);

        vm.createWidget = createWidget;
        function createWidget(widget){
            widget.widgetType = vm.type;
            WidgetService.createWidget(pageId, widget);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }

        function goToWidget(type) {
            vm.type = type;
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/new/" + type);
        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        var pageId = parseInt($routeParams.pid);
        var widgetId = parseInt($routeParams.wgid);
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widget = WidgetService.findWidgetById(widgetId);
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget(widget){
            WidgetService.updateWidget(widget._id, widget);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }

        function deleteWidget(widget){
            WidgetService.deleteWidget(widget._id);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
    }
})();