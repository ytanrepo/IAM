﻿

comcast.iam.bind(document.getElementById("main-container"));
document.forms["chat-form"].onsubmit = function () {
    comcast.iam.sendModel();
    document.getElementById("msg-text").focus();
    return false;
}
comcast.iam.addClient(comcast.mqttClient);
document.getElementById("msg-text").focus();

$("#login").click(function() {
    $("#login-modal").modal("hide");
});

$("#login-modal").modal({ backdrop: "static" });