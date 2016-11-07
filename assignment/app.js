/**
 * Created by Sivaram on 11/06/16.
 */
module.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};
