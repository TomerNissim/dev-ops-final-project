<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Simple Page</title>
</head>
<body>

    <input type="text" id="myInput" placeholder="Type done! " />

    <button onclick="sayHello()">Click Me</button>

    <p id="message"></p>

    <br/>

    <a href="https://www.tau.ac.il" target="_blank">GO TO HOME</a>

    <script>
        function sayHello() {
            var text = document.getElementById("myInput").value;
            if (text !== "") {
                document.getElementById("message").innerHTML = "Hello " + text + "!";
            }
        }

        document.getElementById("myInput").addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                sayHello();
            }
        });
    </script>

</body>
</html>
