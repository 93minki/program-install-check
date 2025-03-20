document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");
  button.innerText = "설치 확인";
  button.onclick = async () => {
    const result = await window.electron.checkProgram();
    console.log("📤 Electron에서 크롬 확장 프로그램으로 응답 전송:", result);
  };
  document.body.appendChild(button);
});
