"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var post_model_1 = require("./post.model");
var PostList = (function (_super) {
    __extends(PostList, _super);
    function PostList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = post_model_1.Post;
        _this.url = 'https://ff-challenge-rails-api.herokuapp.com/posts';
        return _this;
    }
    return PostList;
}(Backbone.Collection));
exports.PostList = PostList;
//# sourceMappingURL=post.collection.js.map