import * as amqp from "amqplib";
import { Numpackage } from "../proto/proto";
import container = require("./inversify.config");
import { modelDO } from "./interfaces";
import TYPES from "./types/types";

amqp.connect("amqp://localhost")
    .then((conn: amqp.Connection) => {
        conn.createChannel()
            .then((ch: amqp.Channel) => {
                const q = "rpc_queue";
                ch.assertQueue(q, { durable: false });
                ch.prefetch(1);

                ch.consume(q, (msg: amqp.Message | null) => {
                    if (msg) {
                        const payload: Numpackage.NumMessage = JSON.parse(msg.content.toString());
                        const n: number = parseInt(payload.number);
                        const resPayload = { entity: square(n).toString() };
                        const model = container.default.get<modelDO>(TYPES.modelDO);
                        model.addmodel(resPayload)
                            .then(() => {
                                const errMsg: string | null = Numpackage.NumMessage.verify(resPayload);
                                if (errMsg) throw Error(errMsg);
                                const r = Numpackage.NumMessage.create({ number: resPayload.entity });
                                const buffer: Buffer = <Buffer>Numpackage.NumMessage.encode(r).finish();
                                ch.sendToQueue(msg.properties.replyTo,
                                    buffer,
                                    { correlationId: msg.properties.correlationId });

                                ch.ack(msg);
                            });
                    }

                });
            });
    });

function square(n: number) {
    if (n === 0 || n === 1) {
        return n;
    } else {
        return n * n;
    }
}