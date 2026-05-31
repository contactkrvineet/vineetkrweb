// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.getElementById("primary-nav");

  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the menu after tapping a link (mobile)
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
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
