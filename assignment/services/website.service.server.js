module.exports = function(app, model) {
    var websites = [
        { "_id": 123, "name": "Facebook",    "uid": 456, "description" : "dewe"},
        { "_id": 234, "name": "Tweeter",     "uid": 456, "description" : "rwer" },
        { "_id": 456, "name": "Gizmodo",     "uid": 456, "description" : "rwer" },
        { "_id": 567, "name": "Tic Tac Toe", "uid": 123, "description" : "werw" },
        { "_id": 678, "name": "Checkers",    "uid": 123, "description" : "tgre" },
        { "_id": 789, "name": "Chess",       "uid": 234, "description" : "ffs"},
        { "_id": 790, "name": "Chess2",       "uid": 122, "description" : "rewr" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        model.websiteModel
            .createWebsiteForUser(req.params.userId, website)
            .then(function (website) {
                res.json(website);
            });
    }

    function findAllWebsitesForUser(req, res) {
        model.websiteModel
            .findAllWebsitesForUser(req.params.userId)
            .then(function(user){
                res.json(user.websites);
            });
    }

    function findWebsiteById(req, res){
        model
            .websiteModel
            .findWebsiteById(req.params.websiteId)
            .then(
                function (website) {
                    if(website) {
                        res.send(website);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateWebsite(req, res){
        var website = req.body;
        model
            .websiteModel
            .updateWebsite(req.params.websiteId, website)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWebsite(req, res){
        model
            .websiteModel
            .deleteWebsite(req.params.websiteId)
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