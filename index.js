var game;
document.addEventListener("DOMContentLoaded", () => {
  const target = document.body;
  //mutationobserverでDOMを監視
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      let resultImage = document.getElementById("resultImage");
      if (resultImage && !document.getElementById("homeButton")) {
        observer.disconnect();
        let div = document.createElement("div");
        div.id = "resultScene";
        const homeButton = document.createElement("button");
        const homeImage = document.createElement("img");
        homeImage.src = "ボタン素材/resultボタン/home.png";
        homeButton.appendChild(homeImage);

        // 追加前にボタンにIDを付与しておく
        homeButton.id = "homeButton";

        div.appendChild(resultImage);
        div.appendChild(homeButton);

        let styleImage = document.createElement("style");
        styleImage.textContent =
          "#resultScene img {display: block;height: 100%;width: 100%;}";
        document.head.appendChild(styleImage);

        // styleの整理
        div.style.position = "relative";
        div.style.height = "100%";
        homeButton.style.height = "8%";
        homeButton.style.padding = "0";
        homeButton.style.margin = "0";
        homeButton.style.backgroundColor = "rgba(0, 0, 0, 0)";
        homeButton.style.position = "absolute";
        homeButton.style.left = "4%";
        homeButton.style.top = "20%";
        homeButton.style.border = "none";
        homeButton.onclick = function () {
          location.reload();
        };

        document.body.appendChild(div);
      }
    });
  });

  //監視対象の設定
  const config = {
    childList: true,
    attributes: true,
    subtree: true,
    characterData: true,
  };

  observer.observe(target, config);
});
