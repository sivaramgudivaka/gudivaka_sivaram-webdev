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
            WidgetService.findWidgetsByPageId(pageId)
                .success(function(widgets){
                    vm.widgets = $(".sortd")
                        .sortable({
                            axis:'y'
                            });
                })
                .error(function(err){
                    console.log(msg);
                });
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
        var widgetId = (new Date()).getTime();
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widgetId = widgetId;
        vm.goToWidget = goToWidget;
        vm.type = $routeParams.type;

        function init() {
            WidgetService.findWidgetsByPageId(pageId)
                .success(function(widgets){
                    vm.widgets = widgets;
                })
                .error(function(err){
                    console.log(err);
                });
        }
        init();

        vm.createWidget = createWidget;
        function createWidget(widget){
            widget.widgetType = vm.type;
            widget.width += '%';
            widget._id = vm.widgetId;
            WidgetService.createWidget(pageId, widget)
                .success(function(widget){
                    init();
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                })
                .error(function(err){
                    console.log(err);
                });
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

        function init() {
            WidgetService.findWidgetById(widgetId)
                .success(function (widget) {
                    vm.widget = angular.copy(widget);
                })
                .error(function(msg){
                    console.log(msg);
                });
        }
        init();
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget(widget){
            WidgetService.updateWidget(widget)
                .success(function(widget){
                    init();
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                })
                .error(function(msg){
                    console.log("Error updating");
                });
        }

        function deleteWidget(widget){
            WidgetService.deleteWidget(widget._id)
                .success(function(widget){
                    init();
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                })
                .error(function(msg){
                    console.log("Error deleting");
                });
        }
    }
})();