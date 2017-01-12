var Post = Backbone.Model.extend({
    urlRoot: 'https://challenge-ff-api.herokuapp.com/posts',

    defaults: {
        id: undefined,
        title: undefined,
        content: undefined,
        lat: undefined,
        long: undefined,
        image_url: undefined
    }
});
