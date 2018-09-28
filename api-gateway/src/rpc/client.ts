import * as amqp from "amqplib";

export function amqpRPC(args: string[], cb: (str: Buffer) => void): void {

    if (args.length === 0) {
        console.log("Usage: rpc_client.js num");
        process.exit(1);
    }

    amqp.connect("amqp://localhost")
        .then((conn: amqp.Connection) => {
            conn.createChannel()
                .then((ch: amqp.Channel) => {
                    ch.assertQueue("", { exclusive: true })
                        .then(q => {
                            const corr = generateUuid();
                            const payload = { number: args };
                            const num = JSON.stringify(payload);
                            const buffer = new Buffer(num);
                            ch.consume(q.queue, (msg) => {
                                if (msg && msg.properties.correlationId === corr) {
                                    console.log(" [.] Got %s", msg.content);
                                    cb(msg.content);
                                    setTimeout(() => { conn.close(); }, 500);
                                }
                            }, { noAck: true });
                            ch.sendToQueue("rpc_queue",
                                buffer,
                                { correlationId: corr, replyTo: q.queue });
                        });
                });

        });
}

function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}