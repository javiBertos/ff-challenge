var PostList = Backbone.Collection.extend({
    model: Post,

    //url: 'https://challenge-ff-api.herokuapp.com/posts', // original provided
    //url: 'http://127.0.0.1:3000/posts', // rails local
    url: 'https://ff-challenge-rails-api.herokuapp.com/posts', // rails heroku

    // get items from the server. No pagination available for this version
    fetch: function() {
        var xhr = new XMLHttpRequest(),
            collection = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status == 200) {
                    collection.reset(this.response);
                } else {
                    alert("Something went wrong while fetching data:\n (" + response.status + ") " + response.statusText);
                }
            }
        });

        xhr.open('GET', this.url);

        xhr.setRequestHeader("content-type", "application/json");
        xhr.responseType = 'json';
        xhr.send();
    },
});
