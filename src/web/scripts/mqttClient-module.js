///<reference path="~/scripts/mqttws31.min.js"/>
// Build namespace if it does not already exist.
var comcast = comcast || {};

/*
 *  The Comcast MQTT Client Module.
 */
comcast.mqttClient = comcast.mqttClient || (function (mqtt) {
    "use strict";
    var client;

    /**
     * Initializes the cient.
     * @returns {void} 
     */
    function initialize() {

        // Create a client instance
        client = new mqtt.Client("m13.cloudmqtt.com", 35424, "web_" + parseInt(Math.random() * 100, 10));

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
    /**
     * called when the client connects.
     * @returns {void} 
     */
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        client.subscribe("control/123456/request");
    }
    /**
     * called when the client fails.
     * @returns {void} 
     */
    function doFail(e) {
        alert("failure: " + e);
        console.log(e);
    }
    /**
     * called when the client loses its connection.
     * @returns {void} 
     */
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            alert("connection lost: " + responseObject.errorMessage);
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    /**
     * send a command to the remote client.
     * @param {Object} command 
     * @returns {void} 
     */
    function sendCommand(command) {
        var message = new mqtt.Message(command.toJsonString());
        message.destinationName = "control/123456/request";
        client.send(message);
    }
    /**
     * called when a message arrives
     * @param {Object} message 
     * @returns {void} 
     */
    function onMessageArrived(message) {
        console.log("onMessageArrived:" + message.payloadString);
    }

    initialize();

    return { sendMessage: sendCommand };

})(Paho.MQTT);