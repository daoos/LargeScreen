var __tw = {
    "AF": "AFG",
    "AL": "ALB",
    "DZ": "ALG",
    "AD": "AND",
    "AO": "ANG",
    "AG": "ANT",
    "AR": "ARG",
    "AM": "ARM",
    "AU": "AUS",
    "AT": "AUT",
    "AZ": "AZE",
    "BS": "BAH",
    "BD": "BAN",
    "BB": "BAR",
    "BE": "BEL",
    "BJ": "BEN",
    "BI": "BDI",
    "BT": "BHU",
    "BZ": "BIZ",
    "BY": "BLR",
    "BO": "BOL",
    "BW": "BOT",
    "BR": "BRA",
    "BH": "BRN",
    "BN": "BRU",
    "BG": "BUL",
    "BF": "BUR",
    "CF": "CAF",
    "KH": "CAM",
    "CA": "CAN",
    "TD": "CHA",
    "CG": "CGO",
    "CL": "CHI",
    "CN": "CHN",
    "CI": "CIV",
    "CM": "CMR",
    "CD": "COD",
    "CO": "COL",
    "KM": "COM",
    "CV": "CPV",
    "CR": "CRC",
    "HR": "CRO",
    "CU": "CUB",
    "CY": "CYP",
    "CZ": "CZE",
    "DK": "DEN",
    "DJ": "DJI",
    "DM": "DMA",
    "DO": "DOM",
    "EC": "ECU",
    "EG": "EGY",
    "ER": "ERI",
    "SV": "ESA",
    "ES": "ESP",
    "EE": "EST",
    "ET": "ETH",
    "FJ": "FIJ",
    "FI": "FIN",
    "FM": "FSM",
    "FR": "FRA",
    "GA": "GAB",
    "GM": "GAM",
    "UK": "GBR",
    "GE": "GEO",
    "GQ": "GEQ",
    "DE": "GER",
    "GH": "GHA",
    "GW": "GNB",
    "GR": "GRE",
    "GD": "GRN",
    "GT": "GUA",
    "GN": "GUI",
    "GY": "GUY",
    "HT": "HAI",
    "HN": "HON",
    "HU": "HUN",
    "IN": "IND",
    "ID": "INA",
    "IR": "IRI",
    "IE": "IRL",
    "IQ": "IRQ",
    "IS": "ISL",
    "IL": "ISR",
    "IT": "ITA",
    "JM": "JAM",
    "JO": "JOR",
    "JP": "JPN",
    "KZ": "KAZ",
    "KE": "KEN",
    "KG": "KGZ",
    "KI": "KIR",
    "KR": "KOR",
    "SA": "KSA",
    "KW": "KUW",
    "LA": "LAO",
    "LV": "LAT",
    "LY": "LBA",
    "LR": "LBR",
    "LC": "LCA",
    "LS": "LES",
    "LB": "LIB",
    "LI": "LIE",
    "LT": "LTU",
    "LU": "LUX",
    "MG": "MAD",
    "MA": "MAR",
    "MY": "MAS",
    "MW": "MAW",
    "MD": "MDA",
    "MV": "MDV",
    "MX": "MEX",
    "MN": "MGL",
    "MK": "MKD",
    "ML": "MLI",
    "MT": "MLT",
    "MC": "MON",
    "MZ": "MOZ",
    "MU": "MRI",
    "MR": "MTN",
    "MM": "MYA",
    "NA": "NAM",
    "NP": "NEP",
    "NI": "NCA",
    "NL": "NED",
    "NG": "NGR",
    "NE": "NIG",
    "NO": "NOR",
    "NR": "NRU",
    "NZ": "NZL",
    "OM": "OMA",
    "PK": "PAK",
    "PA": "PAN",
    "PY": "PAR",
    "PE": "PER",
    "PH": "PHI",
    "PS": "PLE",
    "PW": "PLW",
    "PG": "PNG",
    "PL": "POL",
    "PT": "POR",
    "KP": "PRK",
    "QA": "QAT",
    "MH": "RMI",
    "RO": "ROM",
    "ZA": "RSA",
    "RU": "RUS",
    "RW": "RWA",
    "WS": "SAM",
    "RS": "SCG",
    "SN": "SEN",
    "SC": "SEY",
    "SG": "SIN",
    "KN": "SKN",
    "SL": "SLE",
    "SI": "SLO",
    "SM": "SMR",
    "SB": "SOL",
    "SO": "SOM",
    "LK": "SRI",
    "ST": "STP",
    "SD": "SUD",
    "CH": "SUI",
    "SR": "SUR",
    "SK": "SVK",
    "SZ": "SWZ",
    "SE": "SWE",
    "SY": "SYR",
    "TZ": "TAN",
    "TO": "TGA",
    "TH": "THA",
    "TJ": "TJK",
    "TM": "TKM",
    "TL": "TLS",
    "TG": "TOG",
    "TT": "TRI",
    "TN": "TUN",
    "TR": "TUR",
    "TV": "TUV",
    "AE": "UAE",
    "UG": "UGA",
    "UA": "UKR",
    "UY": "URU",
    "US": "USA",
    "UZ": "UZB",
    "VU": "VAN",
    "VA": "VAT",
    "VE": "VEN",
    "VN": "VIE",
    "VC": "VIN",
    "YE": "YEM",
    "ZM": "ZAM",
    "ZW": "ZIM"
};

! function(w, $) {
    var _country = {};
    var _geojson = {};
    var _inc = 1000000;

    function Lonlat() {
        // console.log('init');
        _geojson = w.geojson;
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
        $.each(_geojson.features, function(index, value) {
            if (value.id == country) {
                _resCountry = value.geometry;
                _properties = value.properties
                return false;
            }
        });
        if (!_resCountry) {
            return false;
        }
        if (_resCountry.type == 'MultiPolygon') {
            return _this.multiPolygon(_resCountry.coordinates, _properties, region);
        } else if (_resCountry.type == 'Polygon') {
            return _this.polygon(_resCountry.coordinates, _properties);
        }
    }

    Lonlat.prototype.multiPolygon = function(source, properties, region) {
        var _weight = 0,
            _index;

        if (!region || !source[region]) {
            _index = this.weight(properties.weight);
        } else {
            _index = region;
        }


        use = source[_index][0];
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
            _min = _tmpW;
            _tmpW += value;
            _max = _tmpW;
            if (_roll > _min && _roll <= _max) {
                __rollnum = index;
                return false;
            }
        });

        return __rollnum;
    }

    Lonlat.prototype.polygon = function(source, properties) {
        var use = source[0];
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

    w.Lonlat = Lonlat;
}(window, jQuery);