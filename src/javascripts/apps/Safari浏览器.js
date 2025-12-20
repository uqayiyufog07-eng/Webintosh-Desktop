const iframe = document.getElementById("safari-iframe");
const urlInput = document.getElementById("safari-url");
const backBtn = document.getElementById("safari-back");
const forwardBtn = document.getElementById("safari-forward");
const refreshBtn = document.getElementById("safari-refresh");

let history = ["https://mengobs.github.io/Webintosh-Desktop"];
let historyIndex = 0;

function navigateTo(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    iframe.src = url;
    urlInput.value = url;

    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    history.push(url);
    historyIndex = history.length - 1;
    updateButtons();
}

function updateButtons() {
    backBtn.disabled = historyIndex <= 0;
    forwardBtn.disabled = historyIndex >= history.length - 1;
}

urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        navigateTo(urlInput.value);
    }
});

backBtn.addEventListener("click", () => {
    if (historyIndex > 0) {
        historyIndex--;
        iframe.src = history[historyIndex];
        urlInput.value = history[historyIndex];
        updateButtons();
    }
});

forwardBtn.addEventListener("click", () => {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        iframe.src = history[historyIndex];
        urlInput.value = history[historyIndex];
        updateButtons();
    }
});

refreshBtn.addEventListener("click", () => {
    iframe.src = iframe.src;
});

updateButtons();