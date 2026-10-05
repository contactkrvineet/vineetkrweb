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

// Get a free key at https://web3forms.com (sent to contactkrvineet@gmail.com) and paste it here.
var WEB3FORMS_ACCESS_KEY = "";

function mailtoFallback(name, email, message) {
  window.location.href =
    "mailto:contactkrvineet@gmail.com" +
    "?subject=" + encodeURIComponent("Contact Form Submission from " + name) +
    "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nMessage: " + message);
}

function sendEmail(event) {
  event.preventDefault();

  var form = event.target;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var status = document.getElementById("form-status");
  var button = form.querySelector("button[type=submit]");

  if (!WEB3FORMS_ACCESS_KEY) {
    mailtoFallback(name, email, message);
    return;
  }

  button.disabled = true;
  status.textContent = "Sending...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "Contact Form Submission from " + name,
      from_name: "vineetkr.com contact form",
      name: name,
      email: email,
      message: message,
      botcheck: form.elements["botcheck"].checked
    })
  })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.success) {
        status.textContent = "Thanks! Your message was sent. I'll reply soon.";
        form.reset();
      } else {
        throw new Error(data.message || "failed");
      }
    })
    .catch(function () {
      status.textContent = "Could not send. Opening your email app instead.";
      mailtoFallback(name, email, message);
    })
    .finally(function () { button.disabled = false; });
}
