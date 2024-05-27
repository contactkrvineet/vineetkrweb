document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    alert(`Thank you, ${name}! Your message has been sent.`);

    // Here, you could also add code to actually send the message to your email or backend server.
  });

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
