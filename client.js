$(document).ready(() => {
  const chatbox = $("#chatbox");
  const userInput = $("#userInput");
  const sendButton = $("#sendButton");
  let messages = [];

  sendButton.on("click", () => {
    const message = userInput.val();
    if (message) {
      messages.push({
        role: "user",
        content: message
      });
      const displaytext = window.markdownit().render(message);
      let userMessageHtml =
        '<pre><div class="message right-side "  >' +
        displaytext +
        "</div></pre>";
      chatbox.append(userMessageHtml);
      chatbox.animate({ scrollTop: 20000000 }, "slow");
      userInput.val("");
      sendButton.val("Generating Response...");
      sendButton.prop("disabled", true);
      fetchMessages();
    }
  });

  userInput.on("keydown", (event) => {
    if (event.keyCode === 13 && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault();
      sendButton.click();
    } else if (event.keyCode === 13 && (event.ctrlKey || event.shiftKey)) {
      event.preventDefault();
      const cursorPosition = userInput.prop("selectionStart");
      const currentValue = userInput.val();

      userInput.val(
        currentValue.slice(0, cursorPosition) +
        "\n" +
        currentValue.slice(cursorPosition)
      );
      userInput.prop("selectionStart", cursorPosition + 1);

      userInput.prop("selectionEnd", cursorPosition + 1);
    }
  });

  function fetchMessages() {
   //const apiKey = "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"; // Replace with your OpenAI API key
    const apiKey = process.env['API_KEY'];
    var settings = {
      url: "https://api.openai.com/v1/chat/completions",
      method: "POST",
      timeout: 0,
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages
      })
    };
    $.ajax(settings)
      .done(function (response) {
        const message = response.choices[0].message;
        messages.push({
          role: message.role,
          content: message.content
        });
        const htmlText = window.markdownit().render(message.content);
        const botMessageHtml =
          '<pre><div class="message left-side " >' + htmlText + "</div></pre>";
        chatbox.append(botMessageHtml);
        chatbox.animate({ scrollTop: 20000000 }, "slow");
        sendButton.val("SUBMIT");
        sendButton.prop("disabled", false);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        sendButton.val("Error");
        let errorText =
          "Please provide chatGPT apiKey and try again.";
        let errorMessage =
          '<pre><div class="message left-side  text-danger" >' +
          errorText +
          "</div></pre>";
        chatbox.append(errorMessage);
        chatbox.animate({ scrollTop: 20000000 }, "slow");
      });
  }
});