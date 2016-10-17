var client;


function clearText() {
    document.getElementsByName('textBox')[0].value = '';
    setUid('');
}



function initializeWizardController(functionParameters) {
    var commandExecuted = setupInitializedUnityCommand("ExecuteRequest", "Wizard-Blue", "WizardController", functionParameters, "", "123456")
    return false;
}

function setupInitializedUnityCommand(command, objectName, objectType, functionName, functionParameters, deviceId) {
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

    sendCommand(JSON.stringify(result));
    return result;

}
//Update Text Value Message
function textUpdate() {
    var textValue = [getUid(), getText()];
    if (textValue != null && textValue.length > 0) {
        var textString = setupInitializedUnityCommand("ExecuteRequest", "HTML", "HTMLGuiManager", "UpdateText", textValue, "123456")
    }
    keyPressEscapeCheck();
}

function getUid() {
    var hidden = document.getElementById('uid');
    return hidden.value;
}
function setUid(setValue) {
    document.getElementById('uid').value = setValue;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

function getText() {
    return document.getElementsByName('textBox')[0].value;

}
function initUid() {
    var hidden = document.getElementById('uid');
    hidden.setAttribute("value", guid());
}

function keyPressEscapeCheck() {
    var key = window.event.keyCode;
    var textValue = getText();
    if (key == 13) {
        sendKeywordAction();
        clearText();
    }
}

function sendKeywordAction() {
    //var file = $.getJSon("scripts/keywordAction.json")
    initializeWizardController('Walk');
}
