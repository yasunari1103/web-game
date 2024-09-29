document.addEventListener("DOMContentLoaded", () => {
  const target = document.body;
  //mutationobserverでDOMを監視
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      let resultImage = document.getElementById("resultImage");
      if (resultImage && !document.getElementById("homeButton")) {
        let canvas = document.getElementById("enchant-stage");
        if (canvas) {
          canvas.style.display = "none";
        }
        observer.disconnect();
        let div = document.createElement("div");
        div.id = "resultScene";

        const homeButton = document.createElement("button");
        const homeImage = document.createElement("img");
        homeImage.src = "ボタン素材/resultボタン/home.png";
        homeButton.appendChild(homeImage);
        // 追加前にボタンにIDを付与しておく
        homeButton.id = "homeButton";

        const logButton = document.createElement("button");
        const logImage = document.createElement("img");
        logImage.src = "ボタン素材/resultボタン/log.png";
        logButton.appendChild(logImage);
        // 追加前にボタンにIDを付与しておく
        logButton.id = "logButton";

        const score = document.createElement("p");
        score.innerHTML = point;

        div.appendChild(score);
        div.appendChild(resultImage);
        div.appendChild(homeButton);
        div.appendChild(logButton);

        let styleImage = document.createElement("style");
        styleImage.textContent =
          "#resultScene img {display: block;height: 100%;width: 100%;}";
        document.head.appendChild(styleImage);

        // styleの整理
        div.style.position = "relative";
        div.style.height = "100%";
        div.style.fontSize = "calc(1vw + 1vh + 1vmin)";

        score.style.height = "6%";
        score.style.padding = "0";
        score.style.margin = "0";
        score.style.backgroundColor = "rgba(0, 0, 0, 0)";
        score.style.position = "absolute";
        score.style.left = "30%";
        score.style.top = "12%";
        score.style.border = "none";
        score.style.color = "white";
        score.style.fontSize = "1em";

        homeButton.style.height = "13%";
        homeButton.style.padding = "0";
        homeButton.style.margin = "0";
        homeButton.style.backgroundColor = "rgba(0, 0, 0, 0)";
        homeButton.style.position = "absolute";
        homeButton.style.left = "3%";
        homeButton.style.top = "19%";
        homeButton.style.border = "none";
        homeButton.onclick = function () {
          location.reload();
        };

        logButton.style.height = "13%";
        logButton.style.padding = "0";
        logButton.style.margin = "0";
        logButton.style.backgroundColor = "rgba(0, 0, 0, 0)";
        logButton.style.position = "absolute";
        logButton.style.left = "28%";
        logButton.style.top = "19%";
        logButton.style.border = "none";
        logButton.onclick = function () {
          resultText = "";
          result.forEach((element) =>
            Object.keys(element).forEach(function (value) {
              resultText += value + ":" + this[value] + " / ";
            }, element)
          );
          alert(resultText);
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
