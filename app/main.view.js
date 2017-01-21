"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var post_model_1 = require("./post.model");
var post_collection_1 = require("./post.collection");
var postDetails_view_1 = require("./postDetails.view");
var postEdit_view_1 = require("./postEdit.view");
var map_view_1 = require("./map.view");
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainView.prototype.events = function () {
        return {
            'click .js-switch-view': 'switchView',
            'click .js-create-post': 'createPost',
            'click .js-view-post': 'viewPost'
        };
    };
    MainView.prototype.render = function () {
        this.checkMapToRefresh();
        var holder = this.$el.find('.js-list-holder');
        holder.empty();
        if (this.collection.length) {
            this.collection.forEach(function (post) {
                holder.append((new postDetails_view_1.PostDetailsView({ model: post })).render().el);
            });
        }
        else {
            holder.append('<article class="text-red">No posts available</article>');
        }
        return this;
    };
    MainView.prototype.checkMapToRefresh = function () {
        if (this.$el.find('.js-map').is(':visible')) {
            this.mapView.collection = this.collection;
            this.mapView.collection.trigger('change');
        }
    };
    MainView.prototype.switchView = function () {
        var that = this;
        that.$el.find('section').slideToggle('fast', function () {
            that.checkMapToRefresh();
        });
    };
    MainView.prototype.showModalBg = function (box) {
        this.$el.find('.js-modal-bg').animate({ opacity: 1, top: 0, left: 0, width: '100vw', height: '100vh' }, 500);
        box.addClass('js-modal-box').animate({ opacity: 1, left: '30%', width: '40%', height: '100vh' }, 500);
    };
    MainView.prototype.hideModalBox = function () {
        this.$el.find('.js-modal-bg').animate({ opacity: 0, top: '50%', left: '50%', width: 0, height: 0 }, 500);
        this.$el.find('.js-modal-box').animate({ opacity: 0, left: '50%', width: 0, height: 0 }, 500, function () {
            this.remove();
        });
    };
    MainView.prototype.createPost = function () {
        if (this.$el.find('.post-form').length) {
            return false;
        }
        this.model = new post_model_1.Post();
        var postEditView = new postEdit_view_1.PostEditView({ model: this.model });
        postEditView.render().$el.insertAfter(document.getElementsByTagName('header')[0]);
        this.showModalBg(postEditView.$el);
        postEditView.$el.find('input:first-child').focus();
        postEditView.on('endEdit', this.addToCollection, this);
        postEditView.on('endEdit', this.hideModalBox, this);
    };
    MainView.prototype.addToCollection = function () {
        if (this.model && this.model.hasChanged()) {
            this.collection.remove(this.model);
            this.collection.add(this.model);
        }
    };
    MainView.prototype.viewPost = function (e) {
        if (this.$el.find('.post-form').length) {
            return false;
        }
        this.model = new post_model_1.Post({ id: $(e.currentTarget).data('id') });
        this.model.fetch();
        this.model.on('change', this.addToCollection, this);
        var postDetails = new postDetails_view_1.PostDetailsView({ model: this.model });
        postDetails.render().$el.insertAfter(document.getElementsByTagName('header')[0]);
        this.showModalBg(postDetails.$el);
        postDetails.on('endView', this.hideModalBox, this);
    };
    MainView.prototype.updateList = function () {
        this.collection.fetch();
    };
    MainView.prototype.initialize = function () {
        this.collection = new post_collection_1.PostList();
        this.mapView = new map_view_1.MapView({ el: document.querySelector('.js-map'), collection: this.collection });
        this.collection.on('reset add remove', this.render, this);
        this.collection.on('destroy', this.updateList, this);
        this.collection.fetch();
    };
    return MainView;
}(Backbone.View));
exports.MainView = MainView;
//# sourceMappingURL=main.view.js.map