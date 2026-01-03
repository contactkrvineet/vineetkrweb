function sendEmail(event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  var mailtoLink =
    "mailto:contactkrvineet@gmail.com" +
    "?subject=" +
    encodeURIComponent("Contact Form Submission from " + name) +
    "&body=" +
    encodeURIComponent(
      "Name: " + name + "\nEmail: " + email + "\nMessage: " + message
    );

  window.location.href = mailtoLink;
}
