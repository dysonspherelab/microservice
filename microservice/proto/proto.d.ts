import * as $protobuf from "protobufjs";
/** Namespace Numpackage. */
export namespace Numpackage {

    /** Properties of a NumMessage. */
    interface INumMessage {

        /** NumMessage number */
        number?: (string|null);
    }

    /** Represents a NumMessage. */
    class NumMessage implements INumMessage {

        /**
         * Constructs a new NumMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: Numpackage.INumMessage);

        /** NumMessage number. */
        public number: string;

        /**
         * Creates a new NumMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NumMessage instance
         */
        public static create(properties?: Numpackage.INumMessage): Numpackage.NumMessage;

        /**
         * Encodes the specified NumMessage message. Does not implicitly {@link Numpackage.NumMessage.verify|verify} messages.
         * @param message NumMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Numpackage.INumMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NumMessage message, length delimited. Does not implicitly {@link Numpackage.NumMessage.verify|verify} messages.
         * @param message NumMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Numpackage.INumMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NumMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NumMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Numpackage.NumMessage;

        /**
         * Decodes a NumMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NumMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Numpackage.NumMessage;

        /**
         * Verifies a NumMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NumMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NumMessage
         */
        public static fromObject(object: { [k: string]: any }): Numpackage.NumMessage;

        /**
         * Creates a plain object from a NumMessage message. Also converts values to other types if specified.
         * @param message NumMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Numpackage.NumMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NumMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
