export function BDMap(id) {
    if(!id || !document.getElementById(id)) throw new Error("init map failed");
    this._map = new BMap.Map(id);
}

BDMap.prototype.curMap = function(){
    return this._map;
}

BDMap.prototype.BMap = function(){
    return new BMap();
}

BDMap.prototype.curCity = function(city) {
    this._map.setCurrentCity(city);
    return this;
};

BDMap.prototype.centerAndZoom = function(addr,zoom){
    var point = new BMap.Point(addr[0], addr[1]);
    this._map.centerAndZoom(point, zoom || 15);
    return this;
}
BDMap.prototype.scrollWheelZoom = function (bool){
    this._map.enableScrollWheelZoom(bool);
    return this;
}
BDMap.prototype.mark = function(infos, eachMarkerHandle) {
    var that = this;
    infos.forEach(function (info) {
        var marker = new BMap.Marker(new BMap.Point(info.lng, info.lat));
        that._map.addOverlay(marker);
        eachMarkerHandle && eachMarkerHandle(marker, info);
        var label = new BMap.Label(info.name, {offset: new BMap.Size(20, -10)});
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        info.name && marker.setLabel(label);
    });
    return this;
}
BDMap.prototype.panTo = function (lng, lat) {
    this._map.panTo(new BMap.Point(lng, lat));
}