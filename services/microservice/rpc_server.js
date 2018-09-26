var amqp = require('amqplib/callback_api');
var protobuf = require("protobufjs")

var root = protobuf.loadSync(__dirname+"/number.proto")
var NumMessage = root.lookupType("numpackage.NumMessage")

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'rpc_queue';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    ch.consume(q, function reply(msg) {
      
      var payload = NumMessage.decode(msg.content);
      console.log(' Recieved message : ', payload)
      var n = parseInt(payload.number);

      console.log(" [.] fib(%d)", n);

      var resPayload = {number:square(n).toString()}
      var errMsg = NumMessage.verify(resPayload);
      if (errMsg) throw Error(errMsg);
      var r = NumMessage.create(resPayload);
      var buffer = NumMessage.encode(r).finish();
      console.log(' [x] Response fib(%d)', n, r, buffer);
      ch.sendToQueue(msg.properties.replyTo,
        buffer,
        {correlationId: msg.properties.correlationId});

      ch.ack(msg);
    });
  });
});

function square(n) {
  if (n == 0 || n == 1)
    return n;
  else
    return n*n;
}