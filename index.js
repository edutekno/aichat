<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> 
  <meta charset="utf-8">
  <meta name="generator" content="AlterVista - Editor HTML"/>
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
 <title>ChatBot</title>
 
 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <style>
      input[type="text"] {
        border-radius: 10px;
      }
      button[type="submit"] {
        border-radius: 10px;
      }
    </style>
 
</head>
<body>


<div id="divchatbot" style='border-style: solid; position: fixed; top: 10px; left:2%; width:96%; text-align: center; z-index: 1000; 
                     background-color: rgba(200, 200, 200, 1); visibility: visible; height: 65px; overflow-y : scroll; '>
  <p align=left>
 
<!--  <button type="button" onclick="document.getElementById('divchatbot').style.visibility = 'hidden' ; document.getElementById('divchatbotoff').style.visibility = 'visible'" title="" id="chatbotbutton"><font size=4>Close</font></button>
  -->&nbsp;
  <input id="chatuserinput" value="" style="font-size:20px;" placeholder="Type here..." onkeydown="if (event.keyCode == 13) { chatbotprocessinput() }  ;  if (event.keyCode == 38) { repeatuser() }"></input>
   <button type="button" onclick="chatbotprocessinput()" title="" id="chatbotbutton"><font size=4>Send</font></button>
  </p>
 
</div>
 <p id="chatlog" align=left style=" left:3%; width:95%; word-wrap:break-word;position: fixed;top:70px;"><br><b>Bot:</b> Hello, can I help you?</p>
<script>


prompt ="";
var chatbotprocessinput = function(){
 
  theprompt = "Q: " + document.getElementById("chatuserinput").value+"(newline= <br>)"
  document.getElementById("chatuserinput").value = ""
  document.getElementById("chatlog").innerHTML = "Thinking..."
  $.ajax({
      url: "http://lab.rumahguru.org/callAI.php?text=" + theprompt
    }).done(function(data) {
      console.log(data)
      var textupdate = theprompt+" "+data.replace(prompt,"").replace("https://api.openai.com/v1/engines/text-davinci-002/completions","")
      document.getElementById("chatlog").innerHTML = textupdate.replace(/Q: /g,"<br><b>Visitor: </b>").replace(/A: /g,"<br><b>Bot: </b>")

      console.log("------\n" + prompt)
  });
}

</script>

</body>
</html>
