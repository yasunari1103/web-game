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
        const retryButton = document.createElement("button");
        const homeImage = document.createElement("img");
        homeImage.src = "ボタン素材/resultボタン/home.png";
        const retryImage = document.createElement("img");
        retryImage.src = "ボタン素材/resultボタン/retry.png";
        homeButton.appendChild(homeImage);
        retryButton.appendChild(retryImage);

        // 追加前にボタンにIDを付与しておく
        homeButton.id = "homeButton";
        retryButton.id = "retryButton";

        div.appendChild(resultImage);
        div.appendChild(homeButton);
        div.appendChild(retryButton);

        // styleの整理
        div.style.position = "relative";
        div.style.height = "100%";
        homeButton.style.height = "5%";
        homeButton.style.padding = "0";
        homeButton.style.margin = "0";
        homeButton.style.backgroundColor = "rgba(0, 0, 0, 0)";
        homeButton.style.position = "absolute";
        homeButton.style.left = "10%";
        homeButton.style.top = "10%";
        retryButton.style.height = "5%";
        retryButton.style.padding = "0";
        retryButton.style.margin = "0";
        retryButton.style.backgroundColor = "rgba(0, 0, 0, 0)";
        retryButton.style.position = "absolute";
        retryButton.style.left = "20%";
        retryButton.style.top = "10%";
        document.body.appendChild(div);

        console.log("a");
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
