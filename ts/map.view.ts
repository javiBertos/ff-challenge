import {Post} from "./post.model";

export class MapView extends Backbone.View<Backbone.Model> {
    private defaultMapCenter = {lat: 41.3775556, lng: 2.1488669};

    private map: any;
    private bounds: any;
    private markers: Array<any>;

    render(): MapView {
        let timeout = 500,
            interval = 200;

        // remove previous markers on map
        this.clearMarkers();

        // add all post markers
        if (this.collection.length) {
            this.bounds = new google.maps.LatLngBounds();

            // prepare each post to add its marker to the map
            for (let i = 0; i < this.collection.length; i++) {
                // set location for post
                let markerPosition = {
                        lat: +this.collection.models[i].get('lat'),
                        lng: +this.collection.models[i].get('long')
                    };

                if (!isNaN(markerPosition.lat) && !isNaN(markerPosition.lng)) {
                    // add location to map bounds so can show the map with all de markers
                    this.bounds.extend(markerPosition)

                    // the markers will be added qith a timeout
                    this.addMarkersWithTimeout(markerPosition, this.collection.models[i], timeout + i * interval);
                }
            };
        }

        // center and zoom de map based on the markers available
        this.centerMap();

        return this;
    }

    // remove all markers from the map
    private clearMarkers() {
        // to do that, we must go over each marker and set its map to null
        if (this.markers && this.markers.length) {
            for (let marker of this.markers) {
                marker.setMap(null);
            }
        }

        // add default initial point to keep map centered on the default point
        this.bounds = new google.maps.LatLngBounds();
        this.bounds.extend(this.defaultMapCenter);

        // reset markers array. markers are now deleted
        this.markers = [];
    }

    // show markers with a delay so we create an effect of falling one then each other
    private addMarkersWithTimeout(position: {lat: number, lng: number}, info: Post|any, timeout: number) {
        let that = this;

        // we schedule the mar creation
        window.setTimeout(function() {
            that.markers.push(
                new google.maps.Marker({
                    position: position,
                    map: that.map,
                    animation: google.maps.Animation.DROP,
                    title: info.get('title')
                })
            );

            // once it created, we also setup de info window that appears when you click on it
            that.addInfoWindowToMarker(
                that.markers.length - 1,
                info
            );
        }, timeout);
    }

    // setup and connect each marker with its info window
    private addInfoWindowToMarker(markerIndex: number, info: Post) {
        let that = this,
            contentString = `
                <div id="content">
                    <h1 id="firstHeading" class="firstHeading">${info.get('title')}</h1>
                    <p id="bodyContent">${info.get('content')}</p>
                    <button class="js-view-post" data-id="${info.get('id')}">View post</button>
                </div>`,
            infoWindow = new google.maps.InfoWindow({
                content: contentString
            });

        // and setup the event link no show it
        this.markers[markerIndex].addListener('click', function() {
            infoWindow.open(that.map, that.markers[markerIndex]);
        });
    }

    // this centers the map by the default point (FinanceFox BCN HQ) or to allow view all the points in the visible area
    private centerMap() {
        if (this.bounds) {
            this.map.fitBounds(this.bounds);
        } else {
            this.map.setCenter(this.defaultMapCenter);
        }
    }

    initialize() {
        // create and draw the map
        this.map = new google.maps.Map(this.el, {
            zoom: 4,
            center: this.defaultMapCenter,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            mapTypeControl: false
        });

        // listen for a change in the collection to update the map
        this.collection.on('change', this.render, this);
    }
}
