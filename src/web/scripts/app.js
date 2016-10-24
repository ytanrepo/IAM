

comcast.iam.bind(document.getElementById("chat-form"));
document.forms['chat-form'].onsubmit = function () {
    comcast.iam.sendModel();
    document.getElementById("msg-text").focus();
    return false;
}
comcast.iam.addClient(comcast.mqttClient);
document.getElementById("msg-text").focus();