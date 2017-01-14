var PostDetailsView = Backbone.View.extend({
    tagName: 'article',

    events: {
        'click .js-remove-post' : 'removePost',
        'click .js-edit-post' : 'editPost',
    },

    render: function() {
        var template = _.template(
            '<h2>ID: <%= id %></h2>' +
            '<% if (title) { %><h3><%= title %></h3><% } %>' +
            '<% if (content) { %><p><%= content %></p><% } %>' +
            '<% if (lat && long) { %><ul>' +
            '<li>Lat: <%= lat %></li>' +
            '<li>Long: <%= long %></li>' +
            '<li><a href="https://www.google.com/maps/search/<%= lat %>,<%= long %>" target="_blank">View on GMaps</a></li>' +
            '</ul><% } %>' +
            '<% if (image_url) { %><img src="<%= image_url %>" alt="<%= title %>" title="<%= title %>"><br><% } %>' +
            '<button class="js-edit-post">Edit post</button><br>' +
            '<button class="js-remove-post">Remove post</button>'
        );
        this.$el.html(template(this.model.toJSON()));
        return this;
    },

    removePost: function(e) {
        this.model.destroy();
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
