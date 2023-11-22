/*!
 * atm0s-media-js v0.0.0
 * (c) Luong Ngoc Minh
 * Released under the MIT License.
 */

'use strict';

var _debug = require('debug');
var pako = require('pako');
var tsDebounce = require('ts-debounce');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function httpPost(url, body) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify(body);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };
    return fetch(url, requestOptions)
        .then(function (response) { return response.text(); })
        .then(function (result) { return JSON.parse(result); });
}
function httpGet(url) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    return fetch(url, requestOptions)
        .then(function (response) { return response.text(); })
        .then(function (result) { return JSON.parse(result); });
}

var MediaGatewayConnector = /** @class */ (function () {
    function MediaGatewayConnector(_url) {
        this._url = _url;
        this._log = _debug('atm0s:media-server');
    }
    Object.defineProperty(MediaGatewayConnector.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: false,
        configurable: true
    });
    MediaGatewayConnector.prototype.selectFromUrls = function (urls) {
        return __awaiter(this, void 0, void 0, function () {
            var waiting_urls, urls_1, urls_1_1, url, res, err_1, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof urls === 'string') {
                            return [2 /*return*/, (this._url = urls)];
                        }
                        waiting_urls = {};
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, 9, 10]);
                        urls_1 = __values(urls), urls_1_1 = urls_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!urls_1_1.done) return [3 /*break*/, 7];
                        url = urls_1_1.value;
                        waiting_urls[url] = true;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, httpGet(url + '/healthcheck?ts=' + new Date().getTime())];
                    case 4:
                        res = _b.sent();
                        if (res.status === true && res.data && res.data.ready === true) {
                            return [2 /*return*/, url];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        delete waiting_urls[url];
                        this._log('selectFromUrls :: error:', waiting_urls, url, err_1);
                        return [3 /*break*/, 6];
                    case 6:
                        urls_1_1 = urls_1.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (urls_1_1 && !urls_1_1.done && (_a = urls_1.return)) _a.call(urls_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10: throw new Error('No available media server');
                }
            });
        });
    };
    MediaGatewayConnector.prototype.connect = function (url, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._log('connect :: connect to media server:', this._url);
                return [2 /*return*/, httpPost(url + '/webrtc/connect', config)];
            });
        });
    };
    MediaGatewayConnector.prototype.iceCandidate = function (url, nodeId, connId, ice) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var body, res;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this._log('iceCandidate :: ice candidate to media server:', url);
                        body = {
                            node_id: nodeId,
                            conn_id: connId,
                            candidate: ((_a = ice.candidate) === null || _a === void 0 ? void 0 : _a.candidate) || '',
                            sdp_mid: ((_b = ice.candidate) === null || _b === void 0 ? void 0 : _b.sdpMid) || '',
                            sdp_mline_index: ((_c = ice.candidate) === null || _c === void 0 ? void 0 : _c.sdpMLineIndex) || 0,
                            username_fragment: ((_d = ice.candidate) === null || _d === void 0 ? void 0 : _d.usernameFragment) || '',
                        };
                        return [4 /*yield*/, httpPost(url + '/webrtc/ice_remote', body)];
                    case 1:
                        res = _e.sent();
                        this._log('iceCandidate :: ice candidate response:', res);
                        return [2 /*return*/];
                }
            });
        });
    };
    return MediaGatewayConnector;
}());

/**
 * Delays the execution of the function that calls it for a specified number of milliseconds.
 * @param ms - The number of milliseconds to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
function delay(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(resolve, ms);
                })];
        });
    });
}
function applyMixin(target, mixin, includeConstructor) {
    var e_1, _a, e_2, _b;
    var _c;
    if (includeConstructor === void 0) { includeConstructor = false; }
    // Figure out the inheritance chain of the mixin
    var inheritanceChain = [mixin];
    // eslint-disable-next-line no-constant-condition
    while (true) {
        var current = inheritanceChain[0];
        var base = Object.getPrototypeOf(current);
        if (base === null || base === void 0 ? void 0 : base.prototype) {
            inheritanceChain.unshift(base);
        }
        else {
            break;
        }
    }
    try {
        for (var inheritanceChain_1 = __values(inheritanceChain), inheritanceChain_1_1 = inheritanceChain_1.next(); !inheritanceChain_1_1.done; inheritanceChain_1_1 = inheritanceChain_1.next()) {
            var ctor = inheritanceChain_1_1.value;
            try {
                for (var _d = (e_2 = void 0, __values(Object.getOwnPropertyNames(ctor.prototype))), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var prop = _e.value;
                    // Do not override the constructor
                    if (includeConstructor || prop !== 'constructor') {
                        Object.defineProperty(target.prototype, prop, (_c = Object.getOwnPropertyDescriptor(ctor.prototype, prop)) !== null && _c !== void 0 ? _c : Object.create(null));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (inheritanceChain_1_1 && !inheritanceChain_1_1.done && (_a = inheritanceChain_1.return)) _a.call(inheritanceChain_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function getTrack(stream, kind) {
    if (!stream) {
        return undefined;
    }
    if (kind === 'audio') {
        return stream.getAudioTracks()[0];
    }
    if (kind === 'video') {
        return stream.getVideoTracks()[0];
    }
    return undefined;
}

var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype.emit = function (event) {
        var e_1, _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        try {
            for (var _b = __values(this.events[event] || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                var i = _c.value;
                i.apply(void 0, __spreadArray([], __read(args), false));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    EventEmitter.prototype.on = function (event, cb) {
        var _this = this;
        (this.events[event] = this.events[event] || []).push(cb);
        return function () {
            return (_this.events[event] = _this.events[event].filter(function (i) { return i !== cb; }));
        };
    };
    EventEmitter.prototype.off = function (event, cb) {
        this.events[event] = this.events[event].filter(function (i) { return i !== cb; });
    };
    EventEmitter.prototype.offAllListeners = function () {
        this.events = {};
    };
    EventEmitter.prototype.removeAllListeners = function () {
        this.offAllListeners();
    };
    EventEmitter.prototype.removeListener = function (event, cb) {
        this.off(event, cb);
    };
    EventEmitter.prototype.listeners = function (event) {
        return this.events[event];
    };
    EventEmitter.prototype.listenerCount = function (event) {
        return this.events[event].length;
    };
    return EventEmitter;
}());
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
var TypedEventEmitter = /** @class */ (function () {
    function TypedEventEmitter() {
    }
    return TypedEventEmitter;
}());
// Make TypedEventEmitter inherit from EventEmitter without actually extending
applyMixin(TypedEventEmitter, EventEmitter);

var _a, _b;
var StreamKinds;
(function (StreamKinds) {
    StreamKinds["AUDIO"] = "audio";
    StreamKinds["VIDEO"] = "video";
})(StreamKinds || (StreamKinds = {}));
var Codecs;
(function (Codecs) {
    Codecs["OPUS"] = "OPUS";
    Codecs["VP8"] = "VP8";
    Codecs["VP9"] = "VP9";
    Codecs["H264"] = "H264";
})(Codecs || (Codecs = {}));
var ContentHint;
(function (ContentHint) {
    ContentHint["None"] = "none";
    ContentHint["Motion"] = "motion";
    ContentHint["Detail"] = "detail";
})(ContentHint || (ContentHint = {}));
var LatencyMode;
(function (LatencyMode) {
    LatencyMode["UltraLow"] = "ultra-low";
    LatencyMode["Default"] = "default";
    LatencyMode["Smooth200"] = "smooth-200";
    LatencyMode["Smooth500"] = "smooth-500";
    LatencyMode["Smooth800"] = "smooth-800";
    LatencyMode["Smooth1000"] = "smooth-1000";
    LatencyMode["Smooth2000"] = "smooth-2000";
})(LatencyMode || (LatencyMode = {}));
/**
 * Mapping of latency modes to maximum packets.
 * This is to configure Audio Jitter Buffer Max Packets for React Native WebRTC.
 *
 */
var LatencyMode2MaxPackets = (_a = {},
    _a[LatencyMode.UltraLow] = [10, 10],
    _a[LatencyMode.Smooth200] = [20, 20],
    _a[LatencyMode.Smooth500] = [25, 25],
    _a[LatencyMode.Smooth800] = [40, 40],
    _a[LatencyMode.Smooth1000] = [50, 50],
    _a[LatencyMode.Smooth2000] = [100, 100],
    _a[LatencyMode.Default] = [undefined, undefined],
    _a);
/**
 * Mapping of latency modes to playout delay hints. Also for React Native WebRTC, maybe?
 */
(_b = {},
    _b[LatencyMode.UltraLow] = 0,
    _b[LatencyMode.Smooth200] = 0.2,
    _b[LatencyMode.Smooth500] = 0.5,
    _b[LatencyMode.Smooth800] = 0.8,
    _b[LatencyMode.Smooth1000] = 1,
    _b[LatencyMode.Smooth2000] = 2,
    _b[LatencyMode.Default] = undefined,
    _b);

var RTCPeerConnectionAugmented = /** @class */ (function (_super) {
    __extends(RTCPeerConnectionAugmented, _super);
    function RTCPeerConnectionAugmented(configuration) {
        return _super.call(this, configuration) || this;
    }
    RTCPeerConnectionAugmented.prototype.addTransceiver = function (trackOrKind, init) {
        var _a;
        var transceiver = _super.prototype.addTransceiver.call(this, trackOrKind, init);
        if (init === null || init === void 0 ? void 0 : init.simulcast) {
            if (transceiver && transceiver.sender) {
                var parameters = transceiver.sender.getParameters();
                parameters.encodings = (init === null || init === void 0 ? void 0 : init.isScreen)
                    ? [
                        { rid: '1', active: true },
                        { rid: '0', active: true },
                    ]
                    : [
                        __assign({ rid: '2', active: true }, ((init === null || init === void 0 ? void 0 : init.maxBitrate) && {
                            maxBitrate: Math.floor(((init === null || init === void 0 ? void 0 : init.maxBitrate) * 5) / 8),
                        })),
                        __assign(__assign({ rid: '1', active: true }, ((init === null || init === void 0 ? void 0 : init.maxBitrate) && {
                            maxBitrate: Math.floor(((init === null || init === void 0 ? void 0 : init.maxBitrate) * 2) / 8),
                        })), { scaleResolutionDownBy: 2 }),
                        __assign(__assign({ rid: '0', active: true }, ((init === null || init === void 0 ? void 0 : init.maxBitrate) && {
                            maxBitrate: Math.floor(((init === null || init === void 0 ? void 0 : init.maxBitrate) * 1) / 8),
                        })), { scaleResolutionDownBy: 2 }),
                    ];
                transceiver.sender.setParameters(parameters);
            }
        }
        if (init === null || init === void 0 ? void 0 : init.preferredCodecs) {
            var codecs = (_a = RTCRtpSender.getCapabilities(init.preferredCodecs.kind)) === null || _a === void 0 ? void 0 : _a.codecs;
            if (!codecs)
                return transceiver;
            codecs.sort(function (c1, c2) {
                var _a, _b;
                var c1_index = (_a = init.preferredCodecs) === null || _a === void 0 ? void 0 : _a.codecs.indexOf(c1.mimeType.replace('video/', ''));
                var c2_index = (_b = init.preferredCodecs) === null || _b === void 0 ? void 0 : _b.codecs.indexOf(c2.mimeType.replace('video/', ''));
                if (c1_index < 0)
                    c1_index = 1000;
                if (c2_index < 0)
                    c2_index = 1000;
                if (c1_index < c2_index) {
                    return -1;
                }
                if (c1_index > c2_index) {
                    return 1;
                }
                return 0;
            });
            transceiver.setCodecPreferences(codecs);
        }
        return transceiver;
    };
    return RTCPeerConnectionAugmented;
}(RTCPeerConnection));

var SenderTrack = /** @class */ (function () {
    function SenderTrack(stream, info, transceiver) {
        this.stream = stream;
        this.info = info;
        this.transceiver = transceiver;
        this.uuid = "sender-".concat(info.kind, "-").concat(SenderTrack.seed++);
    }
    SenderTrack.prototype.replaceStream = function (stream) {
        if (stream === this.stream) {
            return;
        }
        this.stream = stream;
        if (this.transceiver) {
            this.transceiver.sender.replaceTrack(getTrack(stream, this.info.kind) || null);
        }
    };
    SenderTrack.prototype.getTrack = function () {
        return getTrack(this.stream, this.info.kind);
    };
    SenderTrack.seed = 0;
    return SenderTrack;
}());
var ReceiverTrack = /** @class */ (function () {
    function ReceiverTrack(stream, info) {
        this.stream = stream;
        this.info = info;
        var track = this.getTrack();
        this.uuid = (track === null || track === void 0 ? void 0 : track.id) || "receiver-".concat(info.kind, "-").concat(ReceiverTrack.seed++);
    }
    ReceiverTrack.prototype.getTrack = function () {
        return getTrack(this.stream, this.info.kind);
    };
    ReceiverTrack.seed = 0;
    return ReceiverTrack;
}());

var RealtimeSocketEvent;
(function (RealtimeSocketEvent) {
    RealtimeSocketEvent["Message"] = "message";
    RealtimeSocketEvent["State"] = "state";
})(RealtimeSocketEvent || (RealtimeSocketEvent = {}));
var RealtimeSocketState;
(function (RealtimeSocketState) {
    RealtimeSocketState["Created"] = "created";
    RealtimeSocketState["Connecting"] = "connecting";
    RealtimeSocketState["Connected"] = "connected";
    RealtimeSocketState["Disconnected"] = "disconnected";
    RealtimeSocketState["Failed"] = "failed";
    RealtimeSocketState["Closed"] = "closed";
})(RealtimeSocketState || (RealtimeSocketState = {}));
var RealtimeSocket = /** @class */ (function (_super) {
    __extends(RealtimeSocket, _super);
    function RealtimeSocket(_urls, _options) {
        var _a, _b;
        var _this = _super.call(this) || this;
        _this._urls = _urls;
        _this._options = _options;
        _this._log = _debug('atm0s:realtime-socket');
        _this._pConnState = RealtimeSocketState.Created;
        _this._dcState = RealtimeSocketState.Created;
        _this._sendStreams = new Map();
        _this._recvStreams = new Map();
        _this._msg_encoder = new TextEncoder();
        var peerConfig = __assign({ iceServers: ((_a = _this._options) === null || _a === void 0 ? void 0 : _a.iceServers) || [] }, (((_b = _this._options) === null || _b === void 0 ? void 0 : _b.latencyMode) &&
            _this._options.latencyMode in LatencyMode2MaxPackets && {
            audioJitterBufferMaxPackets: LatencyMode2MaxPackets[_this._options.latencyMode],
            rtcAudioJitterBufferMaxPackets: LatencyMode2MaxPackets[_this._options.latencyMode],
        }));
        _this._lc = new RTCPeerConnectionAugmented(peerConfig);
        _this._dc = _this._lc.createDataChannel('data', {
            ordered: false,
            maxPacketLifeTime: 10000,
        });
        return _this;
    }
    RealtimeSocket.prototype.connect = function (connector, config) {
        return __awaiter(this, void 0, void 0, function () {
            var serverUrl, offer, res, nodeId, connId, sdp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._log('connect :: connecting to %s', this._urls);
                        this._pConnState = RealtimeSocketState.Connecting;
                        return [4 /*yield*/, connector.selectFromUrls(this._urls)];
                    case 1:
                        serverUrl = _a.sent();
                        this._log('connect :: try connect to media server:', serverUrl);
                        this._lc.ontrack = function (event) {
                            var e_1, _a;
                            if (event.streams.length === 0) {
                                _this._log('connect :: no stream found');
                                return;
                            }
                            var stream = event.streams[0];
                            var track = event.track;
                            _this._log('connect :: received track:', track, stream);
                            try {
                                for (var _b = __values(_this._recvStreams.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var receiver = _c.value;
                                    if (receiver.info.remoteId === (stream === null || stream === void 0 ? void 0 : stream.id) &&
                                        receiver.stream.getTracks().length === 0 &&
                                        receiver.info.kind === track.kind) {
                                        receiver.stream = stream;
                                        receiver.stream.addTrack(track);
                                        // this.emit(RealtimeSocketEvent.Message, receiver);
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        };
                        this._lc.onconnectionstatechange = function () {
                            _this._log('connection state changed:', _this._lc.connectionState);
                            switch (_this._lc.connectionState) {
                                case 'connected':
                                    _this.setConnState(RealtimeSocketState.Connected);
                                    break;
                                case 'disconnected':
                                    _this.setConnState(RealtimeSocketState.Disconnected);
                                    break;
                                case 'failed':
                                    _this.setConnState(RealtimeSocketState.Failed);
                                    throw new Error('Peer Connection failed');
                                case 'closed':
                                    _this.setConnState(RealtimeSocketState.Closed);
                                    break;
                            }
                        };
                        this._dc.onmessage = function (event) {
                            _this.emit(RealtimeSocketEvent.Message, event.data);
                        };
                        this._dc.onopen = function () {
                            _this.setDcState(RealtimeSocketState.Connected);
                            _this._log('datachannel connect :: opended');
                        };
                        this._dc.onerror = function (err) {
                            _this.setDcState(RealtimeSocketState.Failed);
                            _this._log('datachannel connect :: error:', err);
                        };
                        this._dc.onclose = function () {
                            _this.setDcState(RealtimeSocketState.Closed);
                            _this._log('datachannel connect :: closed');
                        };
                        return [4 /*yield*/, this._lc.createOffer({
                                offerToReceiveAudio: true,
                                offerToReceiveVideo: false,
                            })];
                    case 2:
                        offer = _a.sent();
                        this._log('connect :: created offer:', offer);
                        return [4 /*yield*/, connector.connect(serverUrl, {
                                // TODO: consider remove session config dependency
                                room: config.roomId,
                                peer: config.peerId,
                                token: config.token,
                                sdp: offer.sdp,
                                // mix_minus_audio: config.mix_minus_audio?.mode,
                                // codecs: config.codecs,
                                senders: Array.from(this._sendStreams.values()).map(function (s) { return ({
                                    uuid: s.uuid,
                                    label: s.info.label,
                                    kind: s.info.kind,
                                    screen: s.info.screen,
                                }); }),
                                receivers: {
                                    audio: Array.from(this._recvStreams.values()).filter(function (s) { return s.info.kind === StreamKinds.AUDIO; }).length,
                                    video: Array.from(this._recvStreams.values()).filter(function (s) { return s.info.kind === StreamKinds.VIDEO; }).length,
                                },
                            })];
                    case 3:
                        res = _a.sent();
                        if (!res.status) {
                            this._log('connect :: failed to connect:', res);
                            throw new Error(res.error);
                        }
                        nodeId = res.data.node_id;
                        connId = res.data.conn_id;
                        sdp = res.data.sdp;
                        this._log('connect :: received answer:', nodeId, connId, sdp);
                        this._lc.onicecandidate = function (ice) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(ice && ice.candidate)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, connector.iceCandidate(serverUrl, nodeId, connId, ice)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); };
                        this._lc.setLocalDescription(offer);
                        this._lc.setRemoteDescription(new RTCSessionDescription({ sdp: sdp, type: 'answer' }));
                        return [2 /*return*/];
                }
            });
        });
    };
    RealtimeSocket.prototype.setConnState = function (state) {
        this._pConnState = state;
        this.emit('peer_state', this._pConnState);
    };
    RealtimeSocket.prototype.setDcState = function (state) {
        this._dcState = state;
        this.emit('dc_state', this._dcState);
    };
    // public async reconnect(connector: IMediaGatewayConnector) {
    //   // TODO: implement reconnect
    //   // this.close();
    //   // this.connect(connector);
    // }
    RealtimeSocket.prototype.createReceiverTrack = function (id, kind) {
        var _a;
        this._log('createReceiverTrack :: kind:', kind);
        var stream = new MediaStream();
        (_a = this._lc) === null || _a === void 0 ? void 0 : _a.addTransceiver(kind, {
            direction: 'recvonly',
        });
        var track = new ReceiverTrack(stream, {
            remoteId: id,
            kind: kind,
        });
        this._recvStreams.set(track.uuid, track);
        // TODO: Latency mode
        return track;
    };
    RealtimeSocket.prototype.createSenderTrack = function (cfg) {
        var _a;
        this._log('createSenderTrack :: kind:', cfg.kind);
        var track = getTrack(cfg.stream, cfg.kind);
        var label = (track === null || track === void 0 ? void 0 : track.label) || 'not-supported';
        var transceiver = (_a = this._lc) === null || _a === void 0 ? void 0 : _a.addTransceiver(track, {
            direction: 'sendonly',
            streams: [cfg.stream],
            preferredCodecs: {
                kind: cfg.kind,
                codecs: cfg.preferredCodecs,
            },
            simulcast: cfg.simulcast,
            maxBitrate: cfg.maxBitrate,
            isScreen: cfg.screen,
        });
        var senderTrack = new SenderTrack(cfg.stream || null, {
            label: label,
            kind: cfg.kind,
            name: cfg.name,
            screen: !!cfg.screen,
        }, transceiver);
        this._sendStreams.set(senderTrack.uuid, senderTrack);
        return senderTrack;
    };
    RealtimeSocket.prototype.generateOffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var offer, meta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._lc.createOffer({
                            offerToReceiveAudio: true,
                            offerToReceiveVideo: true,
                        })];
                    case 1:
                        offer = _a.sent();
                        meta = {
                            sdp: offer.sdp,
                            senders: Array.from(this._sendStreams.values()).map(function (s) { return ({
                                uuid: s.uuid,
                                label: s.info.label,
                                kind: s.info.kind,
                                screen: s.info.screen,
                            }); }),
                            receivers: {
                                audio: Array.from(this._recvStreams.values()).filter(function (s) { return s.info.kind === StreamKinds.AUDIO; }).length,
                                video: Array.from(this._recvStreams.values()).filter(function (s) { return s.info.kind === StreamKinds.VIDEO; }).length,
                            },
                        };
                        return [2 /*return*/, { offer: offer, meta: meta }];
                }
            });
        });
    };
    RealtimeSocket.prototype.updateSdp = function (localOffer, remoteAnswerSdp) {
        this._log('updateSdp :: local offer:', localOffer);
        this._log('updateSdp :: remote answer sdp:', remoteAnswerSdp);
        this._lc.setLocalDescription(localOffer);
        this._lc.setRemoteDescription(new RTCSessionDescription({ sdp: remoteAnswerSdp, type: 'answer' }));
    };
    RealtimeSocket.prototype.send = function (data) {
        var _a, _b;
        var msg = typeof data !== 'string' ? data : this._msg_encoder.encode(data);
        if (data.length < 1000) {
            (_a = this._dc) === null || _a === void 0 ? void 0 : _a.send(msg);
        }
        else {
            var compressed = pako.deflate(msg);
            (_b = this._dc) === null || _b === void 0 ? void 0 : _b.send(compressed);
        }
    };
    RealtimeSocket.prototype.close = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (_a = this._dc) === null || _a === void 0 ? void 0 : _a.close();
                        return [4 /*yield*/, delay(500)];
                    case 1:
                        _c.sent();
                        (_b = this._lc) === null || _b === void 0 ? void 0 : _b.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    return RealtimeSocket;
}(TypedEventEmitter));

var StreamReceiverState;
(function (StreamReceiverState) {
    StreamReceiverState["NoSource"] = "no_source";
    StreamReceiverState["Connecting"] = "connecting";
    StreamReceiverState["Live"] = "live";
    StreamReceiverState["Pause"] = "paused";
    StreamReceiverState["KeyOnly"] = "key_only";
    StreamReceiverState["SourceDeactived"] = "source_deactived";
})(StreamReceiverState || (StreamReceiverState = {}));
var StreamReceiver = /** @class */ (function (_super) {
    __extends(StreamReceiver, _super);
    function StreamReceiver(_rpc, _track) {
        var _this = _super.call(this) || this;
        _this._rpc = _rpc;
        _this._track = _track;
        _this.hasTrack = false;
        _this.hasTrackPromises = [];
        _this._state = StreamReceiverState.NoSource;
        _this._log = _debug('atm0s:stream-receiver');
        _this.kind = _this._track.info.kind;
        _this.remoteId = _this._track.info.remoteId;
        _this._rpc.on("local_stream_".concat(_this.remoteId, "_audio_level"), function (_, info) {
            _this._setState(info.state);
        });
        _this._rpc.on("local_stream_".concat(_this.remoteId, "_state"), function (_, info) {
            _this.emit('audio_level', info.level);
        });
        return _this;
    }
    StreamReceiver.prototype._setState = function (state) {
        this._state = state;
        this.emit('state', state);
    };
    StreamReceiver.prototype.internalReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.hasTrack)
                    return [2 /*return*/, true];
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.hasTrackPromises.push(resolve); //this ensure checking order
                    })];
            });
        });
    };
    StreamReceiver.prototype.switch = function (name, peerId, priority) {
        if (priority === void 0) { priority = 50; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._log('switch stream', name, peerId);
                        return [4 /*yield*/, this.internalReady()];
                    case 1:
                        _a.sent();
                        if (!this._track.stream) return [3 /*break*/, 3];
                        this._setState(StreamReceiverState.Connecting);
                        return [4 /*yield*/, this._rpc.request('receiver.switch', {
                                id: this.remoteId,
                                priority: priority,
                                remote: { peer: peerId, stream: name },
                            })];
                    case 2:
                        res = _a.sent();
                        if (res.status === true) {
                            return [2 /*return*/, true];
                        }
                        else {
                            this._setState(StreamReceiverState.NoSource);
                            return [2 /*return*/, false];
                        }
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    StreamReceiver.prototype.limit = function (priority, max_spatial, max_temporal) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._log('limit stream', priority, max_spatial, max_temporal);
                        return [4 /*yield*/, this.internalReady()];
                    case 1:
                        _a.sent();
                        if (!this._track.stream) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._rpc.request('receiver.limit', {
                                id: this.remoteId,
                                priority: priority,
                                max_spatial: max_spatial,
                                max_temporal: max_temporal,
                            })];
                    case 2:
                        res = _a.sent();
                        if (res.status === true) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    StreamReceiver.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._state === StreamReceiverState.NoSource) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, this._rpc.request('receiver.disconnect', {
                                id: this.remoteId,
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.status === true) {
                            this._setState(StreamReceiverState.NoSource);
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    return StreamReceiver;
}(TypedEventEmitter));

/* eslint-disable @typescript-eslint/no-explicit-any */
var RpcRequest = /** @class */ (function () {
    function RpcRequest(reqId, method, params, resolve, reject) {
        this.reqId = reqId;
        this.method = method;
        this.params = params;
        this.resolve = resolve;
        this.reject = reject;
        this.createdAt = new Date();
    }
    RpcRequest.prototype.toJson = function () {
        return {
            req_id: this.reqId,
            type: 'request',
            request: this.method,
            data: this.params,
        };
    };
    return RpcRequest;
}());
var RPC = /** @class */ (function () {
    function RPC(_socket) {
        var _this = this;
        this._socket = _socket;
        this._reqSeed = 0;
        this._msgDecoder = new TextDecoder();
        this._log = _debug('atm0s:rpc');
        this._handlers = new Map();
        this._reqs = new Map();
        this.connected = false;
        this._prereceiveMessage = function (data) {
            if (data instanceof Blob) {
                var reader_1 = new FileReader();
                reader_1.onload = function () {
                    var compressed = new Uint8Array(reader_1.result);
                    var decompressed = pako.inflate(compressed);
                    var msg = _this._msgDecoder.decode(decompressed);
                    _this._onReceiveMessage(msg);
                };
                reader_1.readAsArrayBuffer(data);
            }
            else if (data instanceof ArrayBuffer) {
                var decompressed = pako.inflate(data);
                var msg = _this._msgDecoder.decode(decompressed);
                _this._log('decompress', data.byteLength, msg, msg.length);
                _this._onReceiveMessage(msg);
            }
            else {
                _this._onReceiveMessage(data);
            }
        };
        this._onReceiveMessage = function (msg) {
            _this._log('datachannel on message:', msg);
            var json = JSON.parse(msg);
            var type = json.type;
            if (type === 'event') {
                var handler = _this._handlers.get(json.event);
                if (handler) {
                    handler(json.event, json.data);
                }
            }
            else if (type === 'request') {
                _this._socket.send(JSON.stringify({
                    type: 'answer',
                    status: false,
                    error: 'NOT_SUPPORT',
                }));
            }
            else if (type === 'answer') {
                var req = _this._reqs.get(json.req_id);
                if (req) {
                    if (json.success === true) {
                        req.resolve({
                            status: true,
                            data: json.data,
                        });
                    }
                    else {
                        req.resolve({
                            status: false,
                            error: json.error,
                        });
                    }
                }
                else {
                    _this._log;
                }
            }
        };
        this._socket.on('message', this._prereceiveMessage);
        this._socket.on('dc_state', function (state) {
            if (state === RealtimeSocketState.Connected) {
                _this.connected = true;
            }
        });
    }
    RPC.prototype.request = function (cmd, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var req = new RpcRequest(_this._reqSeed++, cmd, data, resolve, reject);
            _this._reqs.set(req.reqId, req);
            _this._socket.send(JSON.stringify(req.toJson()));
        });
    };
    // event(cmd: string, data: any): void {
    //   const event = {
    //     req_id: this.reqId,
    //     type: 'request',
    //     request: this.method,
    //     data: this.params,
    //   };
    // }
    RPC.prototype.on = function (cmd, handler) {
        this._handlers.set(cmd, handler);
    };
    RPC.prototype.off = function (cmd) {
        this._handlers.delete(cmd);
    };
    return RPC;
}());

var StreamSenderState;
(function (StreamSenderState) {
    StreamSenderState["Created"] = "created";
    StreamSenderState["Connecting"] = "connecting";
    StreamSenderState["Connected"] = "connected";
    StreamSenderState["Deactivated"] = "deactived";
    StreamSenderState["Closed"] = "closed";
})(StreamSenderState || (StreamSenderState = {}));
var StreamSender = /** @class */ (function (_super) {
    __extends(StreamSender, _super);
    function StreamSender(_rpc, _track) {
        var _this = _super.call(this) || this;
        _this._rpc = _rpc;
        _this._track = _track;
        _this._state = StreamSenderState.Created;
        _this._log = _debug('atm0s:stream-sender');
        _this.kind = _this._track.info.kind;
        _this.name = _this._track.info.name;
        _this._rpc.on("remote_stream_".concat(_this.name, "_state"), function () {
            if (_this._state === StreamSenderState.Connecting) {
                _this._setState(StreamSenderState.Connected);
            }
        });
        _this._rpc.on("remote_stream_".concat(_this.name, "_audio_level"), function (_, info) {
            _this.emit('audio_level', info.level);
        });
        return _this;
    }
    StreamSender.prototype._setState = function (state) {
        this._state = state;
        this.emit('state', state);
    };
    StreamSender.prototype.switch = function (stream) {
        this._log('switch stream', stream);
        this._track.replaceStream(stream);
        this._rpc.request('sender.toggle', {
            name: this.name,
            kind: this.kind,
            track: this._track.uuid,
        });
        if (stream) {
            this._setState(StreamSenderState.Connected);
        }
        else {
            this._setState(StreamSenderState.Deactivated);
        }
    };
    StreamSender.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._state === StreamSenderState.Closed) {
                    return [2 /*return*/];
                }
                this._setState(StreamSenderState.Closed);
                return [2 /*return*/];
            });
        });
    };
    return StreamSender;
}(TypedEventEmitter));

var Session = /** @class */ (function () {
    function Session(_cfg, _socket, _connector) {
        this._cfg = _cfg;
        this._socket = _socket;
        this._connector = _connector;
        this._audioSenders = new Map();
        this._videoSenders = new Map();
        this._audioReceivers = [];
        this._videoReceivers = [];
        this._log = _debug('atm0s:session');
        this.update = tsDebounce.debounce(this.updateSdp, 500, {
            isImmediate: false,
        });
        this._socket.on('message', function (data) {
            console.log('message', data);
        });
        this._socket.on('peer_state', function (data) {
            console.log('state', data);
        });
        this._socket.on('dc_state', function (data) {
            console.log('dc_state', data);
        });
        this._rpc = new RPC(this._socket);
    }
    Session.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, recvrTrack, receiver, i, recvrTrack, receiver;
            var _this = this;
            return __generator(this, function (_a) {
                this._log('start to connect ...');
                this._cfg.senders.map(function (s) {
                    if (s.stream) {
                        var senderTrack = _this._socket.createSenderTrack(s);
                        var sender = new StreamSender(_this._rpc, senderTrack);
                        if (senderTrack.info.kind === StreamKinds.AUDIO) {
                            _this._audioSenders.set(s.name, sender);
                        }
                        if (senderTrack.info.kind === StreamKinds.VIDEO) {
                            _this._videoSenders.set(s.name, sender);
                        }
                    }
                });
                for (i = 0; i < this._cfg.receivers.audio; i++) {
                    recvrTrack = this._socket.createReceiverTrack("audio_".concat(i), StreamKinds.AUDIO);
                    receiver = new StreamReceiver(this._rpc, recvrTrack);
                    this._audioReceivers.push(receiver);
                }
                for (i = 0; i < this._cfg.receivers.video; i++) {
                    recvrTrack = this._socket.createReceiverTrack("video_".concat(i), StreamKinds.VIDEO);
                    receiver = new StreamReceiver(this._rpc, recvrTrack);
                    this._videoReceivers.push(receiver);
                }
                return [2 /*return*/, this._socket.connect(this._connector, this._cfg)];
            });
        });
    };
    Session.prototype.createSender = function (cfg) {
        return __awaiter(this, void 0, void 0, function () {
            var senderTrack, sender;
            return __generator(this, function (_a) {
                senderTrack = this._socket.createSenderTrack(cfg);
                sender = new StreamSender(this._rpc, senderTrack);
                if (cfg.kind === StreamKinds.AUDIO) {
                    this._audioSenders.set(cfg.name, sender);
                }
                if (cfg.kind === StreamKinds.VIDEO) {
                    this._videoSenders.set(cfg.name, sender);
                }
                this.update();
                return [2 /*return*/, sender];
            });
        });
    };
    Session.prototype.createReceiver = function (kind) {
        return __awaiter(this, void 0, void 0, function () {
            var recvrTrack, receiver;
            return __generator(this, function (_a) {
                recvrTrack = this._socket.createReceiverTrack("".concat(kind, "_").concat(this._audioReceivers.length), kind);
                receiver = new StreamReceiver(this._rpc, recvrTrack);
                if (kind === StreamKinds.AUDIO) {
                    this._audioReceivers.push(receiver);
                }
                if (kind === StreamKinds.VIDEO) {
                    this._videoReceivers.push(receiver);
                }
                this.update();
                return [2 /*return*/, receiver];
            });
        });
    };
    Session.prototype.takeReceiver = function (kind) {
        return __awaiter(this, void 0, void 0, function () {
            var receiver;
            return __generator(this, function (_a) {
                receiver = kind === StreamKinds.AUDIO
                    ? this._audioReceivers.shift()
                    : this._videoReceivers.shift();
                if (!receiver) {
                    throw new Error('NO_RECEIVER');
                }
                // this.update();
                return [2 /*return*/, receiver];
            });
        });
    };
    Session.prototype.backReceiver = function (receiver) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (receiver.kind === StreamKinds.AUDIO) {
                    this._audioReceivers.push(receiver);
                }
                if (receiver.kind === StreamKinds.VIDEO) {
                    this._videoReceivers.push(receiver);
                }
                return [2 /*return*/];
            });
        });
    };
    Session.prototype.getSender = function (name, kind) {
        return __awaiter(this, void 0, void 0, function () {
            var sender;
            return __generator(this, function (_a) {
                sender = kind === StreamKinds.AUDIO
                    ? this._audioSenders.get(name)
                    : this._videoSenders.get(name);
                if (!sender) {
                    throw new Error('NO_SENDER');
                }
                return [2 /*return*/, sender];
            });
        });
    };
    Session.prototype.updateSdp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, offer, meta, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._socket.generateOffer()];
                    case 1:
                        _a = _b.sent(), offer = _a.offer, meta = _a.meta;
                        this._log('send updated sdp:', meta);
                        return [4 /*yield*/, this._rpc.request('peer.updateSdp', meta)];
                    case 2:
                        res = _b.sent();
                        if (!res.status) {
                            this._log('updateSdp :: Error response from server', res);
                            throw new Error('SERVER_ERROR');
                        }
                        this._log('updateSdp :: received answer:', res.data);
                        this._socket.updateSdp(offer, res.data.sdp);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Session;
}());

function createSession(urls, cfg) {
    var socket = new RealtimeSocket(urls);
    var gateway = new MediaGatewayConnector();
    return new Session(cfg, socket, gateway);
}

exports.createSession = createSession;
//# sourceMappingURL=index.js.map
