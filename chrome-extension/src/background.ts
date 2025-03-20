const NEXTJS_API_URL = "http://localhost:3001/api/save-result";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "checkProgram") {
    console.log("✅ Next.js에서 요청 받음, Electron 실행 준비");

    let port = chrome.runtime.connectNative("com.example.electron_app");

    port.onMessage.addListener((response) => {
      console.log("📤 Electron에서 응답 받음:", response);
      sendResponse(response);

      fetch(NEXTJS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          installed: response.installed,
          timestamp: new Date().toISOString(),
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Next.js에 저장 완료:", data))
        .catch((error) => console.error("❌ Next.js 전송 오류:", error));
    });

    port.onDisconnect.addListener(() => {
      console.error("❌ Electron과 연결 끊김");
      sendResponse({ installed: false });
    });

    port.postMessage({ command: "check" });

    return true;
  }
});
