var expect = require("expect");

var { generateMessage } = require("./message.js");

describe("generateMessage", () => {
  it("Should generate correct message object", () => {
    var from = "Issiac";
    var text = "Some message";
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({
      from,
      text
    });
  });
});
