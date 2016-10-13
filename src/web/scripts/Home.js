var client;

function updateNameDisplay(event) {
    $textMessage = document.getElementById('displayText').value + event
    document.getElementById('displayText').value = $textMessage;
    return $textMessage
}


function clearText() {
    document.getElementById('displayText').value = ""
    document.getElementById('keyInput').value = ""
}

function InitializedMqtt(){

    // Create a client instance
    client = new Paho.MQTT.Client("m12.cloudmqtt.com", 34616, "web_" + parseInt(Math.random() * 100, 10));

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    var options = {
        useSSL: true,
        userName: "mike",
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

function InitializeWizardController(functionParameters) {
    var commandExecuted = SetupInitializedUnityCommand("ExecuteRequest", "Wizard-Blue", "WizardController", functionParameters, "", "123456")
    return false;
}

//Get the Parameters and Append to a Unity Command
//Example: //'{"$types":{"ExecuteRequest, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null":"1"},"$type":"1","objectName":"HTML","objectType":"HTMLGuiManager","functionName":"UpdateText","functionParameters":["' + textValue + '"],"deviceId":"123456"}';
//'{"$types":{"ExecuteRequest, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null":"1"},"$type":"1","objectName":"Wizard-Blue","objectType":"WizardController",
//"functionName":"Run","functionParameters":[],"deviceId":"123456"}'
function SetupInitializedUnityCommand(command, objectName, objectType, functionName, functionParameters, deviceId) {
    var paramArray = [];
    if (functionParameters.length > 0) {
        paramArray.push(functionParameters);
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

    sendCommand(JSON.stringify(result));
    return result;

}
//Update Text Value Message
function textUpdate() {
    var textValue = document.getElementsByName('textBox')[0].value;
    var textString = SetupInitializedUnityCommand("ExecuteRequest", "HTML", "HTMLGuiManager", "UpdateText", textValue, "123456")
}





