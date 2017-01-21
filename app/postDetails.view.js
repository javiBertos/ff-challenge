"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var postEdit_view_1 = require("./postEdit.view");
var PostDetailsView = (function (_super) {
    __extends(PostDetailsView, _super);
    function PostDetailsView(options) {
        var _this = this;
        options.tagName = 'article';
        options.className = 'post-details';
        _this = _super.call(this, options) || this;
        return _this;
    }
    PostDetailsView.prototype.events = function () {
        return {
            'click .js-remove-post': 'removePost',
            'click .js-edit-post': 'editPost',
            'click .js-close': 'closePost'
        };
    };
    PostDetailsView.prototype.render = function () {
        var template = _.template('<h2><%= title %></h2>' +
            '<p><%= content %></p>' +
            '<% if (image_url) { %><img src="<%= image_url %>" alt="<%= title %>" title="<%= title %>"><br><% } %>' +
            '<% if (lat && long) { %><p>' +
            '<a href="https://www.google.com/maps/search/<%= lat %>,<%= long %>" target="_blank">View on GMaps</a><br>' +
            '<small>(Lat: <%= lat %>, Long: <%= long %>)</small>' +
            '</p><% } %>' +
            '<div><button class="js-edit-post">Edit post</button> <button class="red js-remove-post">Remove post</button> <button class="js-close close d-none">Close</button></div>');
        this.$el.html(template(this.model.attributes));
        return this;
    };
    PostDetailsView.prototype.removePost = function (e) {
        if (confirm("Are you sure you want to delete this post?\nTitle: " + this.model.get('title'))) {
            this.model.destroy();
            this.closePost();
        }
    };
    PostDetailsView.prototype.closePost = function () {
        this.trigger('endView');
    };
    PostDetailsView.prototype.editPost = function () {
        var postEditView = new postEdit_view_1.PostEditView({ model: this.model });
        this.$el.html(postEditView.render().el);
        postEditView.on('endEdit', this.render, this);
    };
    PostDetailsView.prototype.initialize = function () {
        this.model.on('change', this.render, this);
    };
    return PostDetailsView;
}(Backbone.View));
exports.PostDetailsView = PostDetailsView;
//# sourceMappingURL=postDetails.view.js.map