/**
 * Created by Sivaram on 11/25/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref:'PageModel'}],
        dateCreated: Date
    });
    return WebsiteSchema;
};
