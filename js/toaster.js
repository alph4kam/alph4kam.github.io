// Function to copy text to clipboard and show a toaster notification
function copyToClipboard(username, account, language) {
  text_en = `Username for ${account} copied to clipboard`;
  text_err_en = "Failed to copy username.";
  text_fr = `Nom d'utilisateur pour ${account} copié dans le presse-papiers`;
  text_err_fr = "Échec de la copie du nom d'utilisateur.";
  text = language === "fr" ? text_fr : text_en;
  text_err = language === "fr" ? text_err_fr : text_err_en;
  if (username.startsWith("@")) {
    username = username.substring(1);
  }
  navigator.clipboard.writeText(username).then(
    function () {
      showToaster(text);
    },
    function (err) {
      showToaster(text_err);
      console.error("Could not copy text: ", err);
    },
  );
}

// Function to show a toaster notification
function showToaster(message) {
  const toaster = document.createElement("div");
  toaster.className = "toaster";
  toaster.textContent = message;
  document.body.appendChild(toaster);
  setTimeout(() => {
    toaster.classList.add("show");
  }, 10);
  setTimeout(() => {
    toaster.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(toaster);
    }, 500);
  }, 3000);
}