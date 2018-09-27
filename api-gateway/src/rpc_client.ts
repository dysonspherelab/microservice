import * as amqp from "amqplib";
const args: string[] = process.argv.slice(2);

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
                    const payload = { number: args[0] };
                    const num = JSON.stringify(payload);
                    const buffer = new Buffer(num);
                    ch.consume(q.queue,  (msg) => {
                        if (msg && msg.properties.correlationId === corr) {
                            console.log(" [.] Got %s", msg.content);
                            setTimeout(() => { conn.close(); process.exit(0); }, 500);
                        }
                    }, { noAck: true });
                    ch.sendToQueue("rpc_queue",
                        buffer,
                        { correlationId: corr, replyTo: q.queue });
                });
            });

    });

function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}