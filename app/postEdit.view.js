var PostEditView = Backbone.View.extend({
    tagName: 'form',
    className: 'post-form',

    events: {
        'change input': 'updatePost',
        'change textarea': 'updatePost',
        'submit': 'savePost',
        'click button.js-cancel': 'cancelEdit'
    },

    render: function() {
        var template = _.template(
            'Title: <input type="text" name="title" value="<%= title %>">' +
            'Content: <textarea name="content" rows="5"><%= content %></textarea>' +
            'Lat: <input type="text" name="lat" value="<%= lat %>">' +
            'Long: <input type="text" name="long" value="<%= long %>">' +
            'Image url: <input type="text" name="image_url" value="<%= image_url %>">' +
            '<br><button type="submit">Save</button> <button type="button" class="red js-cancel">Cancel</button>'
        );
        this.$el.html(template(this.model.toJSON()));

        return this;
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
