var PostEditView = Backbone.View.extend({
    tagName: 'form',

    events: {
        'change input': 'updatePost',
        'submit': 'savePost',
        'click button.js-cancel': 'cancelEdit'
    },

    render: function() {
        var template = _.template(
            '<form method="post">' +
            'Title: <input type="text" name="title" value="<%= title %>"><br>' +
            'Content: <input type="text" name="content" value="<%= content %>"><br>' +
            'Lat: <input type="text" name="lat" value="<%= lat %>"><br>' +
            'Long: <input type="text" name="long" value="<%= long %>"><br>' +
            'Image url: <input type="text" name="image_url" value="<%= image_url %>"><br>' +
            '<br><button type="submit">Save</button> <button type="button" class="js-cancel">Cancel</button>' +
            '</form>'
        );
        this.$el.html(template(this.model.toJSON()));
    },

    updatePost: function(e) {
        this.updates[e.currentTarget.name] = e.currentTarget.value;
    },

    savePost: function(e) {
        e.preventDefault();
        this.model.set(this.updates);
        this.model.save();
        this.$el.remove();
        this.trigger('endEdit');
    },

    cancelEdit: function() {
        this.$el.remove();
        this.trigger('endEdit');
    },

    initialize: function() {
        this.updates = {};
    }
});
