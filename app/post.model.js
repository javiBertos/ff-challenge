/*
Request example:
{
  "post": {
    "title": "Madrid",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et ultricies ante.",
    "created_at": "2017-01-13T16:07:55.257Z",
    "updated_at": "2017-01-13T16:07:55.257Z",

    "lat": "40.41678",
    "long": "-3.70379",
    "image_url": "https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg"
  }
}
*/
var Post = Backbone.Model.extend({
    //urlRoot: 'https://challenge-ff-api.herokuapp.com/posts', // original provided
    //urlRoot: 'http://127.0.0.1:3000/posts', // rails local
    urlRoot: 'https://ff-challenge-rails-api.herokuapp.com/posts', // rails heroku

    // by default, we initialize all values to 'undefined'
    defaults: {
        id: undefined,
        title: undefined,
        content: undefined,
        lat: undefined,
        long: undefined,
        image_url: undefined
    },

    // get current element from server. Almost ID is needed
    fetch: function() {
        if (!this.id) {
            alert('Cannot get data from an element wihtout ID');
            return false;
        }

        this._callToServer(
            undefined,
            'GET',
            function(response, model) {
                if (response.status == 200) {
                    model.set(response.response);
                } else {
                    alert("Something went wrong while fetching data:\n (" + response.status + ") " + response.statusText);
                }
            }
        );
    },

    // persist the element on the server. Using PUSH for new items or PUT to update
    save: function() {
        this._callToServer(
            JSON.stringify({"post": this.toJSON()}),
            !this.id ? 'POST' : 'PUT',
            function(response, model) {
                if (response.status == 201) {
                    model.set(response.response);
                } else if (response.status != 204) {
                    alert("Something went wrong while saving data:\n (" + response.status + ") " + response.statusText);
                }
            }
        );
    },

    // remove an element from the server. this cannot be undone
    destroy: function() {
        if (this.id) {
            this._callToServer(
                undefined,
                'DELETE',
                function(response, model) {
                    if (response.status != 204) {
                        alert("Something went wrong while deleting:\n (" + response.status + ") " + response.statusText);
                    }
                }
            );
        }

        this.trigger('destroy', [this]);
    },

    // all the previous method call to this to perform the request and avoid repeated code and error on updates
    _callToServer: function(data, method, callback) {
        var xhr = new XMLHttpRequest(),
            model = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (callback) {
                    callback(this, model);
                }
            }
        });

        xhr.open(method || 'GET', this.urlRoot + (this.id? "/" + this.id : ''));

        xhr.setRequestHeader("content-type", "application/json");
        xhr.responseType = 'json';
        xhr.send(data);
    }
});
