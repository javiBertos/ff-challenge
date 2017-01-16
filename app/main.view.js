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
    
    // show modal box
    showModalBg: function(box) {
        // show modal bg
        this.$el.find('.js-modal-bg').animate({opacity: 1, top: 0, left: 0, width: '100vw', height: '100vh'}, 500);
        
        // show modal box
        box.addClass('js-modal-box').animate({opacity: 1, width: '40%', height: 'auto', left: '30%', height: '100vh'}, 500);
    },
    
    // hide modal box
    hideModalBox: function() {
        // hide modal bg
        this.$el.find('.js-modal-bg').animate({opacity: 0, top: '50%', left: '50%', width: 0, height: 0}, 500);
        
        // hide modal box
        this.$el.find('.js-modal-box').animate({opacity: 0, width: 0, height: 0, left: '50%', height: '50%'}, 500, function() {
            this.remove();
        });
    },

    // show the form to create a new post
    createPost : function(e) {
        // if already there is a form cancels the action
        if (this.$el.find('.post-form').length) {
            return false;
        }

        // initialize a new post
        this.model = new Post();
        var postEditView = new PostEditView({model: this.model});
        
        // add the view to the DOM and keep listening till the end
        postEditView.render().$el.insertAfter(document.getElementsByTagName('header')[0]);
        // show modal box
        this.showModalBg(postEditView.$el);
        // set focus on first input element
        postEditView.$el.find('input:first-child').focus();
        // listen when edit has finished
        postEditView.on('endEdit', this.addToCollection, this);
        postEditView.on('endEdit', this.hideModalBox, this);
    },

    // add to the collection a new element or a edited one...
    addToCollection: function() {
        // add post to collection if it has been saved
        if (this.model && this.model.hasChanged()) {
            this.collection.remove(this.model);
            this.collection.add(this.model);
        }
    },

    // This si to show the details of a post. It's used from the map view.
    viewPost : function(e) {
        // if already there is a form open
        if (this.$el.find('.post-form').length) {
            return false;
        }

        // here I can get the record from the collection, but I want to force de fetch from the model
        this.model = new Post({id: $(e.currentTarget).data('id')});
        this.model.fetch();
        // this is for update the collection with the edited data
        this.model.on('change', this.addToCollection, this);
        var postDetails = new PostDetailsView({model: this.model});
        
        // adding the view element to the DOM making a fade effect
        postDetails.render().$el.insertAfter(document.getElementsByTagName('header')[0]);
        // show modal box
        this.showModalBg(postDetails.$el);
        
        // listen when edit has finished
        postDetails.on('endView', this.hideModalBox, this);
    },

    // we update de collection againts the server if an element is deleted because we don't have the reference...
    updateList: function() {
        this.collection.fetch();
    },

    initialize: function() {
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
