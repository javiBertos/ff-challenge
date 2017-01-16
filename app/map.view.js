var MapView = Backbone.View.extend({
    render: function() {
        var timeout = 500,
            interval = 200;

        this.clearMarkers();

        // add all post markers
        if (this.collection.length) {
            this.bounds = new google.maps.LatLngBounds();

            for (var i = 0; i < this.collection.length; i++) {
                var markerPosition = {
                        lat: parseFloat(this.collection.models[i].get('lat')),
                        lng: parseFloat(this.collection.models[i].get('long'))
                    };

                this.bounds.extend(markerPosition)

                this.addMarkersWithTimeout(markerPosition, this.collection.models[i], timeout + i * interval);
            };
        }

        this.centerMap();
    },

    clearMarkers: function() {
        if (this.markers && this.markers.length) {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
        }

        this.bounds = new google.maps.LatLngBounds();
        this.bounds.extend({lat: 41.3775556, lng: 2.1488669})

        this.markers = [];
    },

    // show markers with a delay
    addMarkersWithTimeout: function(position, info, timeout) {
        var that = this;

        window.setTimeout(function() {
            that.markers.push(
                new google.maps.Marker({
                    position: position,
                    map: that.map,
                    animation: google.maps.Animation.DROP,
                    title: info.getTitle
                })
            );

            that.addInfoWindowToMarker(
                that.markers.length - 1,
                info
            );
        }, timeout);
    },

    addInfoWindowToMarker: function(markerIndex, info) {
        var that = this,
            contentString = '<div id="content">' +
                '<h1 id="firstHeading" class="firstHeading">' + info.get('title') + '</h1>' +
                '<p id="bodyContent">' + info.get('content') + '</p>' +
                '<button class="js-view-post" data-id="' + info.get('id') + '">View post</button>' +
                '</div>',
            infowindow = new google.maps.InfoWindow({
                content: contentString
            });

        this.markers[markerIndex].addListener('click', function() {
            infowindow.open(that.map, that.markers[markerIndex]);
        });
    },

    // this centers the map by the default point (FF BCN HQ) or to allow view all the points in the visible area
    centerMap: function() {
        if (this.bounds) {
            this.map.fitBounds(this.bounds);
        } else {
            this.map.setCenter(this.defaultMapCenter);
        }
    },

    initialize: function() {
        // create and draw the map
        this.map = new google.maps.Map(this.el, {
            zoom: 4,
            center: {lat: 41.3775556, lng: 2.1488669},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            mapTypeControl: false
        });

        // listen for a change in the collection to update the map
        this.collection.on('change', this.render, this);
    }
});
