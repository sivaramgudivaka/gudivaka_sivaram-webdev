module.exports = function(app) {
    var widgets = [
        { "_id": 123, "widgetType": "heading", "pageId": 321, "size": "6", "text": "GIZMODO"},
        { "_id": 234, "widgetType": "heading", "pageId": 321, "size": "6", "text": "Lorem ipsum"},
        { "_id": 345, "widgetType": "image", "pageId": 321, "width": "50%", "url": "http://lorempixel.com/400/200/"},
        { "_id": 567, "widgetType": "heading", "pageId": 321, "size": "4", "text": "Lorem ipsum"},
        { "_id": 678, "widgetType": "youtube", "pageId": 321, "name":"y1", "text":"dasf", "width": "50%", "url": "https://youtu.be/AM2Ivdi9c4E"},
        { "_id": 790, "widgetType": "youtube", "pageId": 544, "name":"y1", "text":"dasf", "width": "50%", "url": "https://youtu.be/AM2Ivdi9c4E"},
        { "_id": 791, "widgetType": "heading", "pageId": 544, "text": "heading", "name":"myheading", "size":"6"},
        { "_id": 792, "widgetType": "image", "pageId": 544, "name":"imm", "text":"img", "width": "50%", "url": "http://lorempixel.com/400/200/"}
    ];

    var mime = require('mime');
    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/widget/:pageId/widget", createWidget);
    app.get("/api/widget/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", sortWidgets);

    function sortWidgets(req, res){
        var pid = parseInt(req.params.pageId);
        var result = [];
        for(var wg in widgets) {
            if(widgets[wg].pageId === pid) {
                result.push(widgets[wg]);
            }
        }
        var initial = parseInt(req.query.initial);
        var final = parseInt(req.query.final);
        var temp = result[initial];
        result.splice(initial, 1);  //pluck it from the initial pos
        result.splice(final, 0, temp);  //add to to its new place
        res.send(result);
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var widget = {};
        widget._id = parseInt(widgetId);
        widget.widgetType = "image";
        widget.pageId = parseInt(pageId);
        widget.name = req.body.name;
        widget.text = req.body.text;
        widget.width = width+'%';
        widget.url =  "/uploads/" + filename;
        widgets.push(widget);
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
    }

    function createWidget(req, res) {
        var widget = req.body;
        widgets.push(widget);
        res.send(widgets);
    }

    function findAllWidgetsForPage(req, res) {
        var pid = parseInt(req.params.pageId);
        var result = [];
        for(var wg in widgets) {
            if(widgets[wg].pageId === pid) {
                result.push(widgets[wg]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req, res){
        var wgid = parseInt(req.params.widgetId);
        var wg = widgets.filter(function(widget){
            return widget._id === wgid;
        });
        if(wg.length == 1)
            res.send(wg[0]);
        else
            res.send('0');
    }

    function updateWidget(req, res){
        var widget = req.body;
        var wgid = parseInt(req.params.widgetId);
        for(var wg in widgets) {
            if(widgets[wg]._id === wgid) {
                widgets[wg] = widget;
            }
        }
        res.send(200);
    }

    function deleteWidget(req, res){
        var wgid = parseInt(req.params.widgetId);
        for(var wg in widgets) {
            if(widgets[wg]._id === wgid) {
                widgets.splice(wg, 1);
            }
        }
        res.send('0');
    }

};