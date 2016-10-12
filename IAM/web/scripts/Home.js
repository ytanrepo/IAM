
function updateNameDisplay(event) {
    $textMessage = document.getElementById('displayText').value + event
    document.getElementById('displayText').value = $textMessage;
    return $textMessage
}


function clearText() {
    document.getElementById('displayText').value = ""
    document.getElementById('keyInput').value = ""
}

//Update Text Value Message
function textUpdate() {
    var textValue = document.getElementsByName('textBox')[0].value;
    var textString = AppendUnityCommand("ExecuteRequest", "HTML","HTMLGuiManager","UpdateText", textValue, "123456")
    console.log(textString);
    sendCommand(commandString);
}

//Get the Parameters and Append to a Unity Command    
//Example: //'{"$types":{"ExecuteRequest, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null":"1"},"$type":"1","objectName":"HTML","objectType":"HTMLGuiManager","functionName":"UpdateText","functionParameters":["' + textValue + '"],"deviceId":"123456"}';
//'{"$types":{"ExecuteRequest, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null":"1"},"$type":"1","objectName":"Wizard-Blue","objectType":"WizardController","functionName":"Run","functionParameters":[],"deviceId":"123456"}'
function AppendUnityCommand(command, objectName, objectType, functionName, functionParameters, deviceId) {

    console.log(functionParameters)
    if (functionParameters == "") { console.log("Not Null") };

    var functionalParameter = (functionParameters == "") ? "[]" : '["' + functionParameters + '"]'
    console.log(functionalParameter)

    var commandString = '{"$types":{"' +
    command +
    'Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null":"1"},"$type":"1","objectName":"' + objectName +
    '","objectType":"' + objectType +
    '","functionName":"' + functionName +
    '","functionParameters":' + functionalParameter +
    ',"deviceId":"' + deviceId + '"}';

    console.log(commandString)
    return commandString;

}


