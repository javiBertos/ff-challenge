var PostDetailsView = Backbone.View.extend({
    tagName: 'article',
    className: 'post-details',

    events: {
        'click .js-remove-post' : 'removePost',
        'click .js-edit-post' : 'editPost',
        'click .js-close' : 'closePost'
    },

    render: function() {
        var template = _.template(
            '<h2><%= title %></h2>' +
            '<p><%= content %></p>' +
            '<% if (image_url) { %><img src="<%= image_url %>" alt="<%= title %>" title="<%= title %>"><br><% } %>' +
            '<% if (lat && long) { %><p>' +
            '<a href="https://www.google.com/maps/search/<%= lat %>,<%= long %>" target="_blank">View on GMaps</a><br>' +
            '<small>(Lat: <%= lat %>, Long: <%= long %>)</small>' +
            '</p><% } %>' +
            '<div><button class="js-edit-post">Edit post</button> <button class="red js-remove-post">Remove post</button> <button class="js-close close d-none">Close</button></div>'
        );
        this.$el.html(template(this.model.toJSON()));

        return this;
    },

    removePost: function(e) {
        this.model.destroy();
        this.closePost();
    },

    closePost: function(e) {
        this.$el.remove();
    },

    editPost : function(e) {
        var postEditView = new PostEditView({model: this.model});
        postEditView.render();

        this.$el.html(postEditView.el);
        postEditView.on('endEdit', this.render, this);
    },

    initialize: function() {
        this.model.on('change', this.render, this);
    }
});
