var amqp = require('amqplib/callback_api');
var protobuf = require("protobufjs")
var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: rpc_client.js num");
  process.exit(1);
}

var root = protobuf.loadSync(__dirname+"/number.proto");
var NumMessage = root.lookupType("numpackage.NumMessage");

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertQueue('', {exclusive: true}, function(err, q) {
      var corr = generateUuid();
      var payload = {number:args[0]}
      var errMsg = NumMessage.verify(payload);
      if (errMsg) throw Error(errMsg);
            
      var num = NumMessage.create(payload);
      var buffer = NumMessage.encode(num).finish();
      console.log(' [x] Requesting fib(%d)', args[0], num, buffer);

      ch.consume(q.queue, function(msg) {
        if (msg.properties.correlationId == corr) {
          console.log(' [.] Got %s', NumMessage.decode(msg.content).number);
          setTimeout(function() { conn.close(); process.exit(0) }, 500);
        }
      }, {noAck: true});

      ch.sendToQueue('rpc_queue',
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