(function () {
  "use strict";

  var RECORDS_KEY = "locatorPracticeRecords";
  var ACCOUNTS_KEY = "locatorPracticeAccounts";

  function readJson(key) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function addRecord(type, details) {
    var records = readJson(RECORDS_KEY);
    records.unshift({
      id: Date.now(),
      type: type,
      details: details,
      at: new Date().toISOString(),
      page: window.location.pathname.split("/").pop() || "unknown",
    });
    writeJson(RECORDS_KEY, records.slice(0, 150));
    renderRecords();
  }

  function renderRecords() {
    var el = document.getElementById("locatorRecords");
    if (!el) {
      return;
    }

    var records = readJson(RECORDS_KEY);
    if (!records.length) {
      el.innerHTML =
        '<div class="lp-record-item">No saved activity yet. Submit a scenario or perform a locator action.</div>';
      return;
    }

    el.innerHTML = records
      .map(function (item) {
        return (
          '<div class="lp-record-item">' +
          "<strong>[" +
          escapeHtml(item.type) +
          "]</strong> " +
          escapeHtml(item.details) +
          "<br><small>" +
          escapeHtml(item.page) +
          " | " +
          new Date(item.at).toLocaleString() +
          "</small></div>"
        );
      })
      .join("");
  }

  function clearAllData() {
    localStorage.removeItem(RECORDS_KEY);
    localStorage.removeItem(ACCOUNTS_KEY);
    renderRecords();
    renderAccounts();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function bindScenarioForm() {
    var form = document.getElementById("scenarioForm");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var scenarioName = document.getElementById("scenarioName");
      var framework = document.getElementById("framework");
      var locatorType = document.getElementById("locatorType");
      var locatorValue = document.getElementById("locatorValue");

      if (!scenarioName || !framework || !locatorType || !locatorValue) {
        return;
      }

      addRecord(
        "Scenario",
        scenarioName.value +
          " | framework=" +
          framework.value +
          " | locator=" +
          locatorType.value +
          " | value=" +
          locatorValue.value,
      );

      form.reset();
    });
  }

  function bindLoginForm() {
    var form = document.getElementById("loginPracticeForm");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var userInput = document.getElementById("lp1-username");
      if (!userInput) {
        return;
      }

      addRecord("Login", "Login submitted for user: " + userInput.value);
      form.reset();
    });
  }

  function bindCreateAccountForm() {
    var form = document.getElementById("createAccountForm");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var fullName = document.getElementById("lp1-fullname");
      var email = document.getElementById("lp1-email");
      var role = document.getElementById("lp1-role");

      if (!fullName || !email || !role) {
        return;
      }

      var accounts = readJson(ACCOUNTS_KEY);
      accounts.unshift({
        id: Date.now(),
        fullName: fullName.value,
        email: email.value,
        role: role.value,
      });
      writeJson(ACCOUNTS_KEY, accounts.slice(0, 100));

      addRecord(
        "CreateAccount",
        "Created account for " + fullName.value + " (" + role.value + ")",
      );
      renderAccounts();
      form.reset();
    });
  }

  function renderAccounts() {
    var wrap = document.getElementById("accountTableWrap");
    if (!wrap) {
      return;
    }

    var accounts = readJson(ACCOUNTS_KEY);
    if (!accounts.length) {
      wrap.innerHTML = '<div class="lp-row">No accounts created yet.</div>';
      return;
    }

    var rows = accounts
      .map(function (account, index) {
        return (
          '<div class="lp-row" data-id="' +
          account.id +
          '"><strong>' +
          (index + 1) +
          ". " +
          escapeHtml(account.fullName) +
          "</strong> | " +
          escapeHtml(account.email) +
          " | role=" +
          escapeHtml(account.role) +
          ' <button type="button" data-remove-account="' +
          account.id +
          '\">Delete</button></div>'
        );
      })
      .join("");

    wrap.innerHTML = rows;

    wrap
      .querySelectorAll("button[data-remove-account]")
      .forEach(function (btn) {
        btn.addEventListener("click", function () {
          var accountId = Number(btn.getAttribute("data-remove-account"));
          var updated = readJson(ACCOUNTS_KEY).filter(function (item) {
            return Number(item.id) !== accountId;
          });
          writeJson(ACCOUNTS_KEY, updated);
          addRecord("DeleteAccount", "Deleted account id=" + accountId);
          renderAccounts();
        });
      });
  }

  function bindWindowActions() {
    var popupBtn = document.getElementById("openPopupBtn");
    if (popupBtn) {
      popupBtn.addEventListener("click", function () {
        var w = window.open("", "locatorPracticePopup", "width=520,height=420");
        if (w) {
          w.document.write(
            '<!DOCTYPE html><html><head><title>Locator Popup</title></head><body style="font-family:Arial;padding:16px">' +
              '<h2 id="popupTitle">Locator Popup Window</h2>' +
              '<button id="popupBtn" data-testid="popup-action">Popup Action Button</button>' +
              '<p><a id="popupLink" href="locator-basic.html">Go to Locator Hub</a></p>' +
              "</body></html>",
          );
          w.document.close();
          addRecord("Window", "Opened popup window for locator practice");
        }
      });
    }

    var tabBtn = document.getElementById("openNewTabBtn");
    if (tabBtn) {
      tabBtn.addEventListener("click", function () {
        window.open("locator-basic.html", "_blank");
        addRecord("Window", "Opened locator hub in a new tab");
      });
    }

    var saveScenarioBtn = document.getElementById("saveScenarioBtn");
    if (saveScenarioBtn) {
      saveScenarioBtn.addEventListener("click", function () {
        addRecord(
          "NavigationScenario",
          "Saved navigation/window scenario from page 2",
        );
      });
    }

    var clearWindowLogBtn = document.getElementById("clearWindowLogBtn");
    if (clearWindowLogBtn) {
      clearWindowLogBtn.addEventListener("click", function () {
        addRecord("Window", "Cleared window-specific temporary view");
        renderRecords();
      });
    }
  }

  function bindClearButton() {
    var btn = document.getElementById("clearLocatorDataBtn");
    if (!btn) {
      return;
    }

    btn.addEventListener("click", function () {
      clearAllData();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindScenarioForm();
    bindLoginForm();
    bindCreateAccountForm();
    bindWindowActions();
    bindClearButton();
    renderRecords();
    renderAccounts();
  });
})();
