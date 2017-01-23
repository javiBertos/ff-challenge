import {PostEditView} from "./postEdit.view";

export class PostDetailsView extends Backbone.View<Backbone.Model> {
    constructor(options?: any) {
        // our parent element will be an article
        options.tagName = 'article';

        // and will have the class name 'post-details'
        options.className = 'post-details';
        
        super(options);
    }

    // events setup
    events() {
        return {
            'click .js-remove-post' : 'removePost',
            'click .js-edit-post' : 'editPost',
            'click .js-close' : 'closePost'
        };
    }

    // create the element content to add to the DOM. Returns the current object.
    render() {
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
        this.$el.html(template(this.model.attributes));

        return this;
    }

    // when we click on delete, ask and act
    removePost(e) {
        if (confirm("Are you sure you want to delete this post?\nTitle: " + this.model.get('title'))) {
            // remove from server
            this.model.destroy();
            
            // hide and remove DOM element
            this.closePost();
        }
    }

    // launch a trigger about the end to control how to remove from the origin
    closePost() {
        this.trigger('endView');
    }

    // if we click on edit button, we replace the content by the edit form, and render back again de detail when we close the edit, saving or cancel
    editPost() {
        // create the edit view with the current post model
        var postEditView = new PostEditView({model: this.model});
        // replace the element with the form
        this.$el.html(postEditView.render().el);
        // and setup the listener to know when the edition has finished
        postEditView.on('endEdit', this.render, this);
    }

    initialize() {
        // listen when the model changes to update the view
        this.model.on('change', this.render, this);
    }
}
