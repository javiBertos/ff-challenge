"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Post = (function (_super) {
    __extends(Post, _super);
    function Post() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.urlRoot = 'https://ff-challenge-rails-api.herokuapp.com/posts';
        return _this;
    }
    Post.prototype.defaults = function () {
        return {
            id: undefined,
            title: '',
            content: '',
            lat: '',
            long: '',
            image_url: ''
        };
    };
    Post.prototype.toJSON = function () {
        return { "post": this.attributes };
    };
    return Post;
}(Backbone.Model));
exports.Post = Post;
//# sourceMappingURL=post.model.js.map