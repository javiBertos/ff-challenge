import {Post} from "./post.model";

export class PostList extends Backbone.Collection<Backbone.Model> {
    public model = Post;

    //public url = 'https://challenge-ff-api.herokuapp.com/posts'; // original provided
    //public url = 'http://127.0.0.1:3000/posts'; // rails local
    public url = 'https://ff-challenge-rails-api.herokuapp.com/posts'; // rails heroku
}
