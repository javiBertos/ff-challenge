var MainView = Backbone.View.extend({
    el: $('#main'),

    events: {
        'click .js-create-post' : 'createPost',
        'click .js-retrieve-post' : 'retrievePost'
    },

    createPost : function(e) {
        this.post = new Post();
        var postEditView = new PostEditView({model: this.post});
        postEditView.render();

        this.$el.find('#postHolder').html(postEditView.el);
        postEditView.on('endEdit', this.viewPost, this);
    },

    retrievePost : function(e) {
        this.post.set({id: $(e.currentTarget).data('id')});
        this.post.fetch();
        this.viewPost();
    },

    viewPost : function(e) {
        var postDetailsView = new PostDetailsView({model: this.post});
        postDetailsView.render();

        this.$el.find('#postHolder').html(postDetailsView.el);
    },

    initialize: function() {
        this.post = new Post();
    }
});
