 
  function initializedMqtt() {

      // Create a client instance
      client = new Paho.MQTT.Client("m13.cloudmqtt.com", 35424, "web_" + parseInt(Math.random() * 100, 10));

      // set callback handlers
      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;

      var options = {
          useSSL: true,
          userName: "web",
          password: "password",
          onSuccess: onConnect,
          onFailure: doFail
      }

      // connect the client
      client.connect(options);
  }
  // called when the client connects
  function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      client.subscribe("control/123456/request");
  }

  function doFail(e) {
      alert("failure: " + e);
      console.log(e);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
          alert("connection lost: " + responseObject.errorMessage);
          console.log("onConnectionLost:" + responseObject.errorMessage);
      }
  }

  //send a command to the remote client
  function sendCommand(commandString) {
      message = new Paho.MQTT.Message(commandString);
      message.destinationName = "control/123456/request";
      client.send(message);
  }

  // called when a message arrives
  function onMessageArrived(message) {
      console.log("onMessageArrived:" + message.payloadString);
  }

  // called when the client connects
  function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      client.subscribe("control/123456/request");
  }


