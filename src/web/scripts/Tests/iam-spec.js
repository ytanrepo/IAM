///<reference path="~/scripts/knockout-3.4.0.js"/>
///<reference path="~/scripts/iam-module.js"/>


describe("iam", function () {
    it("should properly create a serializable command that can be sent over", function() {
        var testCmnd = comcast.iam.createCommand("command", "objectName", "objectType", "functionName", [], "deviceId");
        var str = testCmnd.toJsonString();
        var obj = JSON.parse(str);
        expect(obj.objectName).toBe("objectName");
    });

    it("should create a message model", function () {
        var model = comcast.iam.model;
        console.log(model.id());
        expect(model.id()).not.toBe(null);
    });

    it("should send actions", function () {

        var mock = {
             cmd: null, 
             sendMessage: function (msg) {
                this.cmd = msg;
            }
        };
        comcast.iam.addClient(mock);
        comcast.iam.sendAction("test");
        expect(mock.cmd).not.toBe(null);
    });
});