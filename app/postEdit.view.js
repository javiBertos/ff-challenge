"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PostEditView = (function (_super) {
    __extends(PostEditView, _super);
    function PostEditView(options) {
        var _this = this;
        options.tagName = 'form';
        options.className = 'post-form';
        _this = _super.call(this, options) || this;
        return _this;
    }
    PostEditView.prototype.events = function () {
        return {
            'change input': 'updatePost',
            'change textarea': 'updatePost',
            'submit': 'savePost',
            'click button.js-cancel': 'endEdit'
        };
    };
    PostEditView.prototype.render = function () {
        var template = _.template('Title: <input type="text" name="title" value="<%= title %>" required>' +
            'Content: <textarea name="content" rows="5" required><%= content %></textarea>' +
            'Lat: <input type="number" step="0.0000001" name="lat" value="<%= lat %>">' +
            'Long: <input type="number" step="0.0000001" name="long" value="<%= long %>">' +
            'Image url: <input type="text" name="image_url" value="<%= image_url %>">' +
            '<br><button type="submit">Save</button> <button type="button" class="red js-cancel">Cancel</button>');
        this.$el.html(template(this.model.attributes));
        return this;
    };
    PostEditView.prototype.updatePost = function (e) {
        this.updates[e.currentTarget.name] = e.currentTarget.value;
    };
    PostEditView.prototype.savePost = function (e) {
        e.preventDefault();
        this.model.set(this.updates);
        this.model.save();
        this.endEdit();
    };
    PostEditView.prototype.endEdit = function () {
        this.trigger('endEdit');
    };
    PostEditView.prototype.initialize = function () {
        this.updates = {};
    };
    return PostEditView;
}(Backbone.View));
exports.PostEditView = PostEditView;
//# sourceMappingURL=postEdit.view.js.map