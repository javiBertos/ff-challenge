var MainView = Backbone.View.extend({
    el: $('#main'),

    events: {
        'click .js-switch-view' : 'switchView',
        'click .js-create-post' : 'createPost',
        'click .js-view-post' : 'viewPost'
    },

    // perform the render on the main view (list and map)
    render : function() {
        // check if the map is visible to reload it
        this.checkMapToRefresh();

        // get the articles main holder
        var holder = this.$el.find('.js-list-holder');

        // and we empty the holder
        holder.empty();

        // add the articles to the holder rendering the details view
        if (this.collection.length) {
            this.collection.forEach(function(post) {
                holder.append((new PostDetailsView({model: post})).render().el);
            });
        } else { // show message if there aren't posts
            holder.append('<article class="text-red">No posts available</article>');
        }

        return this;
    },

    // checks if the map is visible, and updates the collection in its component and launchs the 'change' event
    checkMapToRefresh: function() {
        if (this.$el.find('.js-map').is(':visible')) {
            this.mapView.collection = this.collection;
            this.mapView.collection.trigger('change');
        }
    },

    // switch the view between map and list
    switchView: function() {
        var that = this;

        that.$el.find('section').slideToggle('fast', function() {
            that.checkMapToRefresh();
        });
    },

    // show the form to create a new post
    createPost : function(e) {
        // if already there is a form cancels the action
        if (this.$el.find('.post-form').length) {
            return false;
        }

        // initialize a new post
        this.post = new Post();
        var postEditView = new PostEditView({model: this.post});

        // add the view to the DOM and keep listening till the end
        postEditView.render().$el.insertAfter(document.getElementsByTagName('header')[0]);
        postEditView.$el.find('input:first-child').focus();
        postEditView.on('endEdit', this.addToCollection, this);
    },

    // add to the collection a new element or a edited one...
    addToCollection: function() {
        // remove form holder
        this.$el.find('.js-new-form').remove();

        // add post to collection if it has been saved
        if (this.post && this.post.hasChanged()) {
            this.collection.remove(this.post);
            this.collection.add(this.post);
        }
    },

    // This si to show the details of a post. It's used from the map view.
    viewPost : function(e) {
        // if already there is a form open
        if (this.$el.find('.post-form').length) {
            return false;
        }

        // here I can get the record from the collection, but I want to force de fetch from the model
        this.post = new Post({id: $(e.currentTarget).data('id')});
        this.post.fetch();
        // this is for update the collection with the edited data
        this.post.on('change', this.addToCollection, this);
        var postDetails = new PostDetailsView({model: this.post});

        // adding the view element to the DOM
        postDetails.render().$el.insertAfter(document.getElementsByTagName('header')[0]);
    },

    // we update de collection againts the server if an element is deleted because we don't have the reference...
    updateList: function() {
        this.collection.fetch();
    },

    initialize: function() {
        this.post = undefined;

        // posts collection
        this.collection = new PostList();

        // map view
        this.mapView = new MapView({el: document.querySelector('.js-map'), collection: this.collection});

        // listeners to update the posts on the views
        this.collection.on('reset add remove', this.render, this);
        this.collection.on('destroy', this.updateList, this);
        this.collection.fetch();
    }
});
