var PostEditView = Backbone.View.extend({
    // our parent element will be a form
    tagName: 'form',
    
    // and will have the class name 'post-details'
    className: 'post-form',

    // events setup
    events: {
        'change input': 'updatePost',
        'change textarea': 'updatePost',
        'submit': 'savePost',
        'click button.js-cancel': 'endEdit'
    },

    // create the element content to add to the DOM. Returns the current object.
    render: function() {
        var template = _.template(
            'Title: <input type="text" name="title" value="<%= title %>" required>' +
            'Content: <textarea name="content" rows="5" required><%= content %></textarea>' +
            'Lat: <input type="text" name="lat" value="<%= lat %>">' +
            'Long: <input type="text" name="long" value="<%= long %>">' +
            'Image url: <input type="text" name="image_url" value="<%= image_url %>">' +
            '<br><button type="submit">Save</button> <button type="button" class="red js-cancel">Cancel</button>'
        );
        this.$el.html(template(this.model.toJSON()));

        return this;
    },

    // each time a field changes, we storage the change before assing to the model, so if the user cancels, no change has been performed
    updatePost: function(e) {
        this.updates[e.currentTarget.name] = e.currentTarget.value;
    },

    // persist the model changes on the server
    savePost: function(e) {
        // lock the form submision
        e.preventDefault();
        // assign the stored changes to the model
        this.model.set(this.updates);
        // save to the server
        this.model.save();
        // close the form
        this.endEdit();
    },

    // launch a trigger about the end to control how to remove from the origin
    endEdit: function() {
        this.trigger('endEdit');
    },

    initialize: function() {
        this.updates = {};
    }
});
