///<reference path="~/scripts/knockout-3.4.0.js"/>
// Build namespace if it does not already exist.
var comcast = comcast || {};

/*
 *  The Comcast IAM Module.
 */
comcast.iam = comcast.iam || (function (ko) {
    "use strict";
    var message = { id: ko.observable(""), userName: ko.observable(""), msgText: ko.observable(""), actions: ['Bow', 'Stretch', 'Pitch', 'Swing', 'Dance', 'Football', 'Hunt', 'Idle'] };
    var messagingClients = [{ sendMessage: function (command) { console.log(command.toJsonString()); } }];

    /**
     * Creates new instance of a command object that can/will be sent over the wire.
     * 
     * @param {string} command 
     * @param {string} objectName 
     * @param {string} objectType 
     * @param {string} functionName 
     * @param {string[]} functionParameters 
     * @param {string} deviceId 
     * @returns {Object} 
     */
    function createCommand(command, objectName, objectType, functionName, functionParameters, deviceId) {
        var paramArray = [];
        if (Array.isArray(functionParameters) && functionParameters.length > 0) {
            paramArray = functionParameters;
        }
        var result = {
            "$types": { "ExecuteRequest, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null": "1" },
            "$type": "1",
            "objectName": objectName,
            "objectType": objectType,
            "functionName": functionName,
            "functionParameters": paramArray,
            "deviceId": deviceId
        };
        return { toJsonString: function () { return JSON.stringify(result); } };
    }

    /**
     * Creates a new GUID string.
     * 
     * @returns {string} 
     */
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }
    /**
     * Binds the current model to the HTML element;
     * @param {Object} element 
     * @returns {void} 
     */
    function bindTo(element) {
        ko.applyBindings(message, element);
    }

    /**
     * Initializes/resets the message model.
     * 
     * @returns {void} 
     */
    function initModel() {
        message.id(guid());
        message.msgText("");
    }
    /**
     * Send the message.
     * @returns {void} 
     */
    function sendModel() {
        onModelChanged();
        initModel();
    }

    /**
     * Sends a message when the model is changed.
     * @returns {void} 
     */
    function onModelChanged() {
        var text = message.userName() + ": " + message.msgText();
        var command = createCommand("ExecuteRequest", "HTML", "EthanHTMLGuiManager", "UpdateText", [message.id(), message.msgText()], "123456");
        for (var i = 0; i < messagingClients.length; i++) {
            messagingClients[i].sendMessage(command);
        }
    }

    /**
 * Sends a message when the model is changed.
 * @returns {void} 
 */
    function sendAction(actionName) {
        var command = createCommand("ExecuteRequest", "Assets.Ethan.char_ethan", "EthanController", actionName, [], "123456");
        for (var i = 0; i < messagingClients.length; i++) {
            messagingClients[i].sendMessage(command);
        }
    }
    /**
     * Adds a messaging client.
     * @param {Object} client 
     * @returns {void} 
     */
    function addClient(client) {
        messagingClients.push(client);
    }

    initModel();
    message.msgText.subscribe(function (value) {
        if (value !== "undefined" && value !== "") {
            onModelChanged();
        }
    });
    return { createCommand: createCommand, sendAction: sendAction, model: message, bind: bindTo, sendModel: sendModel, addClient: addClient };

})(ko);
