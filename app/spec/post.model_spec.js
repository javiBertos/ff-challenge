describe("Post Model ::", function() {
    it("should exist", function() {
        return expect(Post).toBeDefined();
    });
    
    describe("Attributes ::", function() {
        var ritz;
        ritz = new Post();
        return it("should have default attributes excerpt ID", function() {
            expect(ritz.attributes.id).toBeUndefined();
            expect(ritz.attributes.title).toBeDefined();
            expect(ritz.attributes.content).toBeDefined();
            expect(ritz.attributes.lat).toBeDefined();
            expect(ritz.attributes.long).toBeDefined();
            return expect(ritz.attributes.image_url).toBeDefined();
        });
    });
    
    return describe("Attributes ::", function() {
        var ritz;
        ritz = new Post({id: 666});
        return it("should have ID", function() {
            expect(ritz.attributes.id).toBeDefined();
            return expect(ritz.attributes.id).toEqual(666);
        });
    });
});