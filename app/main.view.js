var MainView = Backbone.View.extend({
    el: $('#main'),

    events: {
        'click .js-create-post' : 'createPost'
    },

    render : function() {
        var view = this;

        view.$el.find('#listHolder').empty();

        if (this.collection.length) {
            this.collection.forEach(function(post) {
                view.$el.find('#listHolder').append((new PostDetailsView({model: post})).render().el);
            });
        } else {
            view.$el.find('#listHolder').append('<p class="alert">No posts available</p>');
        }

        return this;
    },

    createPost : function(e) {
        this.post = new Post();
        var postEditView = new PostEditView({model: this.post});
        postEditView.render();

        this.$el.find('#postHolder').html(postEditView.el);
        postEditView.on('endEdit', this.addToCollection, this);
    },

    addToCollection: function() {
        if (this.post && this.post.hasChanged()) {
            this.collection.add(this.post);
        }
    },

    updateList: function() {
        this.collection.fetch();
    },

    initialize: function() {
        this.post = undefined;

        this.collection = new PostList();
        this.collection.on('reset add remove', this.render, this);
        this.collection.on('destroy', this.updateList, this);
        this.collection.fetch();
    }
});
