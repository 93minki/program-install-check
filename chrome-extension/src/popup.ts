document.getElementById("checkButton")?.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "checkProgram" }, (response) => {
    const resultText = response?.installed ? "Installed ✅" : "UnInstalled ❌";
    document.getElementById("result")!.innerText = resultText;
  });
});
