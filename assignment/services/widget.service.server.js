module.exports = function(app, model) {
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
        var pid = req.params.pageId;
        var initial = parseInt(req.query.initial);
        var final = parseInt(req.query.final);
        model
            .widgetModel
            .reorderWidget(pid, initial, final)
            .then(function (widgets) {
                res.json(widgets);
            });

    }

    function uploadImage(req, res) {
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

        var reqWidget = {};
        reqWidget.body = {};
        var widget = {};
        widget.type = "IMAGE";
        widget.pageId = pageId;
        widget.name = req.body.name;
        widget.text = req.body.text;
        widget.width = parseInt(width);
        widget.url =  "/uploads/" + filename;
        reqWidget.body = widget;
        createWidget(reqWidget, null);
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
    }

    function createWidget(req, res) {
        var widget = req.body;
        model.widgetModel
            .createWidget(res == null?req.body.pageId:req.params.pageId, widget)
            .then(function(widget){
               res.json(widget);
            });
    }

    function findAllWidgetsForPage(req, res) {
        model.widgetModel
            .findAllWidgetsForPage(req.params.pageId)
            .then(function(page){
                res.json(page.widgets);
            });
    }

    function findWidgetById(req, res){
        model
            .widgetModel
            .findWidgetById(req.params.widgetId)
            .then(
                function (widget) {
                    if(widget) {
                        res.send(widget);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateWidget(req, res){
        var widget = req.body;
        model
            .widgetModel
            .updateWidget(req.params.widgetId, widget)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWidget(req, res){
        model
            .widgetModel
            .deleteWidget(req.params.widgetId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

};