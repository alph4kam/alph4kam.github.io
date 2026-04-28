// Fallback method for copying text to clipboard
function fallbackCopy(value, okText, errText) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    showToaster(okText);
  } catch (e) {
    console.error("Fallback copy failed:", e);
    showToaster(errText);
  }
  document.body.removeChild(textarea);
}

// Main function to copy text to clipboard
function copyToClipboard(data, isUrl, language) {
  const text =
    language === "fr"
      ? "Copié dans le presse-papiers."
      : "Copied to clipboard.";

  const text_err = language === "fr" ? "Échec de la copie." : "Failed to copy.";

  if (typeof data === "string" && data.startsWith("@")) {
    data = data.slice(1);
  }
  if (isUrl) {
    const base = window.location.href.split("#")[0];
    data = base + data;
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(data)
      .then(() => showToaster(text))
      .catch((err) => {
        console.error("Clipboard API failed:", err);
        fallbackCopy(data, text, text_err);
      });
  } else {
    fallbackCopy(data, text, text_err);
  }
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
