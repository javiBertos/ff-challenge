export class PostEditView extends Backbone.View<Backbone.Model> {
    constructor(options?: any) {
        // our parent element will be a form
        options.tagName = 'form';

        // and will have the class name 'post-details'
        options.className = 'post-form';

        super(options);
    }

    // events setup
    events() {
        return {
            'change input': 'updatePost',
            'change textarea': 'updatePost',
            'submit': 'savePost',
            'click button.js-cancel': 'endEdit'
        };
    }

    // var to store the changes before apply to the model
    private updates: any;

    // create the element content to add to the DOM. Returns the current object.
    render() {
        var template = _.template(
            'Title: <input type="text" name="title" value="<%= title %>" required>' +
            'Content: <textarea name="content" rows="5" required><%= content %></textarea>' +
            'Lat: <input type="number" step="0.0000001" name="lat" value="<%= lat %>">' +
            'Long: <input type="number" step="0.0000001" name="long" value="<%= long %>">' +
            'Image url: <input type="text" name="image_url" value="<%= image_url %>">' +
            '<br><button type="submit">Save</button> <button type="button" class="red js-cancel">Cancel</button>'
        );
        this.$el.html(template(this.model.attributes));

        return this;
    }

    // each time a field changes, we storage the change before assing to the model, so if the user cancels, no change has been performed
    updatePost(e) {
        this.updates[e.currentTarget.name] = e.currentTarget.value;
    }

    // persist the model changes on the server
    savePost(e) {
        // lock the form submision
        e.preventDefault();
        // assign the stored changes to the model
        this.model.set(this.updates);
        // save to the server
        this.model.save();
        // close the form
        this.endEdit();
    }

    // launch a trigger about the end to control how to remove from the origin
    endEdit() {
        this.trigger('endEdit');
    }

    initialize() {
        this.updates = {};
    }
}
