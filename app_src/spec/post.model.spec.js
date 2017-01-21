beforeEach(function() {
    this.post = new Post({
        title: 'Jasmine test'
    });
});

describe("Post Model ::", function() {
    it("should exist", function() {
        return expect(Post).toBeDefined();
    });

    describe("When instantiated ::", function() {
        var post;
        post = new Post({
            title: 'Jasmine test',
            content: 'This is a JS unit test'
        });
        return it("should have default attributes excerpt ID", function() {
            expect(post.attributes.id).toBeUndefined();
            expect(post.get('id')).toBeUndefined();
            expect(post.get('title')).toEqual('Jasmine test');
            expect(post.get('content')).toEqual('This is a JS unit test');
            expect(post.get('lat')).toEqual('');
            expect(post.get('long')).toEqual('');
            return expect(post.get('image_url')).toEqual('');
        });
    });

    describe("When instantiated by Id ::", function() {
        var post;
        post = new Post({id: 666});
        return it("should have ID", function() {
            expect(post.attributes.id).toBeDefined();
            return expect(post.attributes.id).toEqual(666);
        });
    });

    describe("Url ::", function() {
        describe("When no id is set ::", function() {
            it("Should return the collection URL", function() {
                expect(this.post.url()).toEqual("https://ff-challenge-rails-api.herokuapp.com/posts");
            });
        });

        describe("When id is set ::", function() {
            it("Should return the collection URL and id", function() {
                this.post.set({id: 666});
                expect(this.post.url()).toEqual("https://ff-challenge-rails-api.herokuapp.com/posts/666");
            });
        });
    });
});
