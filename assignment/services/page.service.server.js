module.exports = function(app, model) {
    var pages = [
        { "_id": 321, "name": "Post 1", "websiteId": 456, "description": "nhjk" },
        { "_id": 432, "name": "Post 2", "websiteId": 456, "description": "nhjk" },
        { "_id": 543, "name": "Post 3", "websiteId": 456, "description": "nhjk" },
        { "_id": 544, "name": "Post 4", "websiteId": 790, "description": "nhjk" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var page = req.body;
        model.pageModel
            .createPage(req.params.websiteId, page)
            .then(function (page) {
                res.json(page);
            });
    }

    function findAllPagesForWebsite(req, res) {
        model.pageModel
            .findAllPagesForWebsite(req.params.websiteId)
            .then(function(website){
                res.json(website.pages);
            });
    }

    function findPageById(req, res){
        model
            .pageModel
            .findPageById(req.params.pageId)
            .then(
                function (page) {
                    if(page) {
                        res.send(page);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updatePage(req, res){
        var page = req.body;
        model
            .pageModel
            .updatePage(req.params.pageId, page)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req, res){
        model
            .pageModel
            .deletePage(req.params.pageId)
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