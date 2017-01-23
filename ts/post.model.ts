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
export class Post extends Backbone.Model {
    //public urlRoot = 'https://challenge-ff-api.herokuapp.com/posts'; // original provided
    //public urlRoot = 'http://127.0.0.1:3000/posts'; // rails local
    public urlRoot = 'https://ff-challenge-rails-api.herokuapp.com/posts'; // rails heroku

    // by default, we initialize all values to 'undefined'
    defaults() {
        return {
            id: undefined,
            title: '',
            content: '',
            lat: '',
            long: '',
            image_url: ''
        };
    }

    toJSON() {
        return {"post": this.attributes};
    }
}
