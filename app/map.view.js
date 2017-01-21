"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MapView = (function (_super) {
    __extends(MapView, _super);
    function MapView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMapCenter = { lat: 41.3775556, lng: 2.1488669 };
        return _this;
    }
    MapView.prototype.render = function () {
        var timeout = 500, interval = 200;
        this.clearMarkers();
        if (this.collection.length) {
            this.bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < this.collection.length; i++) {
                var markerPosition = {
                    lat: parseFloat(this.collection.models[i].get('lat')),
                    lng: parseFloat(this.collection.models[i].get('long'))
                };
                if (!isNaN(markerPosition.lat) && !isNaN(markerPosition.lng)) {
                    this.bounds.extend(markerPosition);
                    this.addMarkersWithTimeout(markerPosition, this.collection.models[i], timeout + i * interval);
                }
            }
            ;
        }
        this.centerMap();
        return this;
    };
    MapView.prototype.clearMarkers = function () {
        if (this.markers && this.markers.length) {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
        }
        this.bounds = new google.maps.LatLngBounds();
        this.bounds.extend(this.defaultMapCenter);
        this.markers = [];
    };
    MapView.prototype.addMarkersWithTimeout = function (position, info, timeout) {
        var that = this;
        window.setTimeout(function () {
            that.markers.push(new google.maps.Marker({
                position: position,
                map: that.map,
                animation: google.maps.Animation.DROP,
                title: info.getTitle
            }));
            that.addInfoWindowToMarker(that.markers.length - 1, info);
        }, timeout);
    };
    MapView.prototype.addInfoWindowToMarker = function (markerIndex, info) {
        var that = this, contentString = '<div id="content">' +
            '<h1 id="firstHeading" class="firstHeading">' + info.get('title') + '</h1>' +
            '<p id="bodyContent">' + info.get('content') + '</p>' +
            '<button class="js-view-post" data-id="' + info.get('id') + '">View post</button>' +
            '</div>', infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        this.markers[markerIndex].addListener('click', function () {
            infowindow.open(that.map, that.markers[markerIndex]);
        });
    };
    MapView.prototype.centerMap = function () {
        if (this.bounds) {
            this.map.fitBounds(this.bounds);
        }
        else {
            this.map.setCenter(this.defaultMapCenter);
        }
    };
    MapView.prototype.initialize = function () {
        this.map = new google.maps.Map(this.el, {
            zoom: 4,
            center: this.defaultMapCenter,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            mapTypeControl: false
        });
        this.collection.on('change', this.render, this);
    };
    return MapView;
}(Backbone.View));
exports.MapView = MapView;
//# sourceMappingURL=map.view.js.map