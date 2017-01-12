Uses an API that operates over a single resource. Would be great if you can implement your own API based on the specifications you can find below (feel free to do it in python, node, ruby...). If you don't have time to do it, use the API we have already implemented.
Contains a Backbone/Chaplin client that consumes that API and can list, show, create, update, and remove that resource.
The app must be deployed somewhere (heroku is the simplest option) so we can play with it easily.
Write in plain JavaScript.
Use a CSS framework if it helps in the UI.

Extra points:
Creativity
Play with lat/long fields (i.e. paint a map)
Tests

API USAGE DOCUMENT
Domain: https://challenge-ff-api.herokuapp.com
Resource: posts
Content-Type: application/json
Required fields: title and content.
Sample JSON body:
{
  "post": {
    "title": "Madrid",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et ultricies ante.",
    "lat": "40.41678",
    "long": "-3.70379",
    "image_url": "https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg"
  }
}

API Requests
=> list
   endpoint: /posts
   method: GET
   body : not needed
   response code: 200

=> show
  endpoint: /posts/:id
  method: GET
  body : not needed
  response code: 200

=> create
   endpoint: /posts
   method: Post
   body : json
   response code: 201

=> update
  endpoint: /posts/:id
  method: PUT
  body : json
  response code: 204

=> remove
  endpoint: /posts/:id
  method: DELETE
  body : not needed
  response code: 204

Helpful links
Backbone fundamentals Book: http://addyosmani.github.io/backbone-fundamentals/
Chaplin.js docs: http://docs.chaplinjs.org/
Chaplin.js Boilerplate: https://github.com/chaplinjs/chaplin-boilerplate-plain
Chaplin.js Example: https://github.com/hasentopf/chaplin-tryout
