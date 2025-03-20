"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string | null>(null);

  const checkInstallation = () => {
    chrome.runtime.sendMessage({ action: "checkProgram" }, (response) => {
      if (response && response.installed !== undefined) {
        setStatus(response.installed ? "✅ 설치됨" : "❌ 설치되지 않음");

        fetch("/api/save-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            installed: response.installed,
            timestamp: new Date().toISOString(),
          }),
        });
      } else {
        setStatus("⚠️ 응답 없음");
      }
    });
  };

  return (
    <div>
      <h1>프로그램 설치 확인</h1>
      <button onClick={checkInstallation}>설치 확인</button>
      {status && <p>{status}</p>}
    </div>
  );
}
