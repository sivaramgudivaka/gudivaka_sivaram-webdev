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
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widgetUrl = widgetUrl;

        function init() {
            WidgetService.findWidgetsByPageId(pageId)
                .success(function(widgets){
                    vm.widgets = widgets;
                    var initial, final;
                    $( "#sortable" )
                        .sortable({
                            axis: 'y',
                            start: function(event, ui){
                                initial = ui.item.index();
                            },
                            update: function (event, ui) {
                                final = ui.item.index();
                                WidgetService.sortWidget(pageId, initial, final)
                                    .success(function(widgets){
                                        vm.widgets = widgets;
                                    });
                            }
                        });
                })
                .error(function(err){
                    console.log(err);
                });
        }
        init();

        function widgetUrl(widget){
            var url = widget.url;
            if(widget.type == 'IMAGE') {
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
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
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
            widget.type = vm.type.toUpperCase();
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
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var widgetId = $routeParams.wgid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.widget = {};
        vm.widget.type = "IMAGE";

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