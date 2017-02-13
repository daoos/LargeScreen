import {__tw} from './nn.js';

var _country = {};
var _geojson = {};
var _inc = 1000000;
var use;

export function Lonlat(geojson) {
    // console.log('init');
    _geojson = geojson;
    // console.log(w,w.geojson)
}

Lonlat.prototype.getLonLat = function(country, nums, region) {
    if (!country in __tw) return false;
    country = __tw[country];
    var arr = new Array();
    var res;
    for (var i = nums; i > 0; i--) {
        res = this.getGeoJson(country, region);
        if (!res) {
            return false;
        }
        arr.push(res);
    }
    //console.log(arr);
    return arr;
}

Lonlat.prototype.getGeoJson = function(country, region) {
    var _this = this,
        _resCountry,
        _properties;
        // console.log('6666',_geojson.features)
    $.each(_geojson.features, function(index, value) {

        if (value.id == country) {
            _resCountry = value.geometry;//几何属性
            _properties = value.properties //国名
            // console.log(3,_properties,value)
            return false;
        }

    });
    // console.log('getGeoJson',_resCountry,_properties)
    if (!_resCountry) {
        return false;
    }
    if (_resCountry.type == 'MultiPolygon') {
        // console.log("getGeoJson1",_this.multiPolygon(_resCountry.coordinates, _properties, region))
        return _this.multiPolygon(_resCountry.coordinates, _properties, region);
    } else if (_resCountry.type == 'Polygon') {
        // console.log("getGeoJson2",_this.polygon(_resCountry.coordinates, _properties))
        return _this.polygon(_resCountry.coordinates, _properties);
    }
}

Lonlat.prototype.multiPolygon = function(source, properties, region) {
    var _weight = 0,
        _index;

        // console.log(2,properties)

    if (!region || !source[region]) {
        _index = this.weight(properties.weight);
        // console.log(5,_index)
    } else {
        _index = region;
    }


    use = source[_index][0];
    // console.log(use)
    return this.lonLat(use);
}

Lonlat.prototype.weight = function(arr) {
    var _wTotal = this.array_sum(arr),
        _tmpW = 0,
        _rollnum = 0,
        _min,
        _max,
        _roll = this.mt_rand(1, _wTotal);

    $.each(arr, function(index, value) {
        // console.log(4,value)
        _min = _tmpW;
        _tmpW += value;
        _max = _tmpW;
        if (_roll > _min && _roll <= _max) {
            _rollnum = index;
            return false;
        }
    });

    return _rollnum;
}

Lonlat.prototype.polygon = function(source, properties) {
    use = source[0];
    return this.lonLat(use);
}

Lonlat.prototype.lonLat = function(use) {
    var inc = _inc;
    var lonMaxMin = this.getMaxMin(use, 'lon');
    var latMaxMin = this.getMaxMin(use, 'lat');
    var lat = this.mt_rand(latMaxMin.min * inc, latMaxMin.max * inc) / inc;
    var lon = this.mt_rand(lonMaxMin.min * inc, lonMaxMin.max * inc) / inc;
    if (!this.checkIn(use, lat, lon)) {
        return this.lonLat(use);
    }
    return {
        "lon": lon,
        "lat": lat
    };
}

Lonlat.prototype.getMaxMin = function(source, type) {
    var _t = type == 'lon' ? 0 : 1;
    var res = {};
    var _arr = new Array();
    $.each(source, function(index, value) {
        _arr.push(value[_t]);
    });
    res.max = this.max(_arr);
    res.min = this.min(_arr);
    return res;
}

Lonlat.prototype.checkIn = function(use, lat, lon) {
    var _poly = this.prepareForPoly(use);
    var _point = {
        x: lat,
        y: lon
    };
    var _check = this.pointInPoly(_point, _poly);
    //console.log(_check);
    return _check;
}

Lonlat.prototype.pointInPoly = function(pt, poly) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) && (c = !c);
    return c;
}

Lonlat.prototype.prepareForPoly = function(use) {
    var _arr = new Array(),
        _o;
    $.each(use, function(index, value) {
        _o = {
            x: value[1],
            y: value[0]
        }
        _arr.push(_o);
    });
    return _arr;
}

Lonlat.prototype.mt_rand = function(min, max) {
    var argc = arguments.length
    if (argc === 0) {
        min = 0
        max = 2147483647
    } else if (argc === 1) {
        throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given')
    } else {
        min = parseInt(min, 10)
        max = parseInt(max, 10)
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
}

Lonlat.prototype.max = function() {
    var ar
    var retVal
    var i = 0
    var n = 0
    var argv = arguments
    var argc = argv.length
    var _obj2Array = function(obj) {
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            return obj
        } else {
            var ar = []
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    ar.push(obj[i])
                }
            }
            return ar
        }
    }
    var _compare = function(current, next) {
        var i = 0
        var n = 0
        var tmp = 0
        var nl = 0
        var cl = 0

        if (current === next) {
            return 0
        } else if (typeof current === 'object') {
            if (typeof next === 'object') {
                current = _obj2Array(current)
                next = _obj2Array(next)
                cl = current.length
                nl = next.length
                if (nl > cl) {
                    return 1
                } else if (nl < cl) {
                    return -1
                }
                for (i = 0, n = cl; i < n; ++i) {
                    tmp = _compare(current[i], next[i])
                    if (tmp === 1) {
                        return 1
                    } else if (tmp === -1) {
                        return -1
                    }
                }
                return 0
            }
            return -1
        } else if (typeof next === 'object') {
            return 1
        } else if (isNaN(next) && !isNaN(current)) {
            if (current === 0) {
                return 0
            }
            return (current < 0 ? 1 : -1)
        } else if (isNaN(current) && !isNaN(next)) {
            if (next === 0) {
                return 0
            }
            return (next > 0 ? 1 : -1)
        }

        if (next === current) {
            return 0
        }

        return (next > current ? 1 : -1)
    }

    if (argc === 0) {
        throw new Error('At least one value should be passed to max()')
    } else if (argc === 1) {
        if (typeof argv[0] === 'object') {
            ar = _obj2Array(argv[0])
        } else {
            throw new Error('Wrong parameter count for max()')
        }
        if (ar.length === 0) {
            throw new Error('Array must contain at least one element for max()')
        }
    } else {
        ar = argv
    }

    retVal = ar[0]
    for (i = 1, n = ar.length; i < n; ++i) {
        if (_compare(retVal, ar[i]) === 1) {
            retVal = ar[i]
        }
    }

    return retVal
}

Lonlat.prototype.min = function() {
    var ar
    var retVal
    var i = 0
    var n = 0
    var argv = arguments
    var argc = argv.length
    var _obj2Array = function(obj) {
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            return obj
        }
        var ar = []
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                ar.push(obj[i])
            }
        }
        return ar
    }

    var _compare = function(current, next) {
        var i = 0
        var n = 0
        var tmp = 0
        var nl = 0
        var cl = 0

        if (current === next) {
            return 0
        } else if (typeof current === 'object') {
            if (typeof next === 'object') {
                current = _obj2Array(current)
                next = _obj2Array(next)
                cl = current.length
                nl = next.length
                if (nl > cl) {
                    return 1
                } else if (nl < cl) {
                    return -1
                }
                for (i = 0, n = cl; i < n; ++i) {
                    tmp = _compare(current[i], next[i])
                    if (tmp === 1) {
                        return 1
                    } else if (tmp === -1) {
                        return -1
                    }
                }
                return 0
            }
            return -1
        } else if (typeof next === 'object') {
            return 1
        } else if (isNaN(next) && !isNaN(current)) {
            if (current === 0) {
                return 0
            }
            return (current < 0 ? 1 : -1)
        } else if (isNaN(current) && !isNaN(next)) {
            if (next === 0) {
                return 0
            }
            return (next > 0 ? 1 : -1)
        }

        if (next === current) {
            return 0
        }

        return (next > current ? 1 : -1)
    }

    if (argc === 0) {
        throw new Error('At least one value should be passed to min()')
    } else if (argc === 1) {
        if (typeof argv[0] === 'object') {
            ar = _obj2Array(argv[0])
        } else {
            throw new Error('Wrong parameter count for min()')
        }

        if (ar.length === 0) {
            throw new Error('Array must contain at least one element for min()')
        }
    } else {
        ar = argv
    }

    retVal = ar[0]

    for (i = 1, n = ar.length; i < n; ++i) {
        if (_compare(retVal, ar[i]) === -1) {
            retVal = ar[i]
        }
    }

    return retVal
}

Lonlat.prototype.array_sum = function(array) {
    var key
    var sum = 0

    // input sanitation
    if (typeof array !== 'object') {
        return null
    }

    for (key in array) {
        if (!isNaN(parseFloat(array[key]))) {
            sum += parseFloat(array[key])
        }
    }

    return sum
}