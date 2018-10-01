// TODO
import * as amqp from "amqplib";
import { Numpackage } from "../proto/proto";
import { Employee } from "./classes";

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
                        const resPayload = { _id: square(n).toString() };
                        const employee = new Employee(resPayload);
                        employee.addEmployee()
                            .then(() => {
                                const errMsg: string | null = Numpackage.NumMessage.verify(resPayload);
                                if (errMsg) throw Error(errMsg);
                                const r = Numpackage.NumMessage.create({ number: "0x00" });
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