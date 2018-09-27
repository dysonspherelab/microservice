/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Numpackage = (function() {

    /**
     * Namespace Numpackage.
     * @exports Numpackage
     * @namespace
     */
    var Numpackage = {};

    Numpackage.NumMessage = (function() {

        /**
         * Properties of a NumMessage.
         * @memberof Numpackage
         * @interface INumMessage
         * @property {string|null} [number] NumMessage number
         */

        /**
         * Constructs a new NumMessage.
         * @memberof Numpackage
         * @classdesc Represents a NumMessage.
         * @implements INumMessage
         * @constructor
         * @param {Numpackage.INumMessage=} [properties] Properties to set
         */
        function NumMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NumMessage number.
         * @member {string} number
         * @memberof Numpackage.NumMessage
         * @instance
         */
        NumMessage.prototype.number = "";

        /**
         * Creates a new NumMessage instance using the specified properties.
         * @function create
         * @memberof Numpackage.NumMessage
         * @static
         * @param {Numpackage.INumMessage=} [properties] Properties to set
         * @returns {Numpackage.NumMessage} NumMessage instance
         */
        NumMessage.create = function create(properties) {
            return new NumMessage(properties);
        };

        /**
         * Encodes the specified NumMessage message. Does not implicitly {@link Numpackage.NumMessage.verify|verify} messages.
         * @function encode
         * @memberof Numpackage.NumMessage
         * @static
         * @param {Numpackage.INumMessage} message NumMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NumMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.number != null && message.hasOwnProperty("number"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.number);
            return writer;
        };

        /**
         * Encodes the specified NumMessage message, length delimited. Does not implicitly {@link Numpackage.NumMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Numpackage.NumMessage
         * @static
         * @param {Numpackage.INumMessage} message NumMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NumMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NumMessage message from the specified reader or buffer.
         * @function decode
         * @memberof Numpackage.NumMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Numpackage.NumMessage} NumMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NumMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Numpackage.NumMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.number = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NumMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Numpackage.NumMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Numpackage.NumMessage} NumMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NumMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NumMessage message.
         * @function verify
         * @memberof Numpackage.NumMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NumMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.number != null && message.hasOwnProperty("number"))
                if (!$util.isString(message.number))
                    return "number: string expected";
            return null;
        };

        /**
         * Creates a NumMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Numpackage.NumMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Numpackage.NumMessage} NumMessage
         */
        NumMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.Numpackage.NumMessage)
                return object;
            var message = new $root.Numpackage.NumMessage();
            if (object.number != null)
                message.number = String(object.number);
            return message;
        };

        /**
         * Creates a plain object from a NumMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Numpackage.NumMessage
         * @static
         * @param {Numpackage.NumMessage} message NumMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NumMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.number = "";
            if (message.number != null && message.hasOwnProperty("number"))
                object.number = message.number;
            return object;
        };

        /**
         * Converts this NumMessage to JSON.
         * @function toJSON
         * @memberof Numpackage.NumMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NumMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NumMessage;
    })();

    return Numpackage;
})();

module.exports = $root;
