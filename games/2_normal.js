enchant();

//画面サイズ,設定
const game = new Game(625, 441);
game.fps = 30;

////////////////////////////////////////
//パーツ準備

//音系統
const correctSound = "SE/seikaiSE.wav";
game.preload([correctSound]);

const incorrectSound = "SE/huseikaiSE.wav";
game.preload([incorrectSound]);

//イラスト系統
const gameBackGround = "背景素材/ゲーム画面.png";

//ボタン系統
const primeButton = "素数ボタン.png";
game.preload([primeButton]);

const compositeButton = "合成数ボタン.png";
game.preload([compositeButton]);

//パーツ準備終わり
////////////////////////////////////////

game.onload = function startGame() {
  //グローバル変数
  let point = 0;
  let result = [];

  const mainScene = new Scene();
  game.pushScene(mainScene);
  mainScene.backgroundColor = "black";

  //ポイント表示
  const pointLabel = new Label("Point: " + point);
  pointLabel.x = 10;
  pointLabel.y = 35;
  pointLabel.font = "24px sans-serif";
  pointLabel.color = "white";
  mainScene.addChild(pointLabel);

  ////////////////////////////////////////
  // ランダムで整数を獲得する関数
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // 上限は除き、下限は含む
  }

  ////////////////////////////////////////
  //normal modeの設定
  number = getRandomInt(2, 101);
  const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ];

  //数字
  const num = new Label(number + "");
  num.x = 100;
  num.y = 50;
  num.font = "24px sans-serif";
  num.color = "white";
  num.backgroundColor = "blue";
  num.textAlign = "center";
  num.style = { borderRadius: "10px" };
  num.padding = "10px";
  mainScene.addChild(num);

  //ボタン作成
  const correctButton = new Sprite(200, 200);
  correctButton.height = 100;
  correctButton.width = 100;
  correctButton.moveTo(200, 300);
  correctButton.image = game.assets[primeButton];
  mainScene.addChild(correctButton);

  const incorrectButton = new Sprite(200, 200);
  incorrectButton.height = 100;
  incorrectButton.width = 100;
  incorrectButton.moveTo(0, 300);
  incorrectButton.image = game.assets[compositeButton];
  mainScene.addChild(incorrectButton);

  // ボタンクリック時の処理
  /////////////////////////////////////////////////////////////////////////
  correctButton.addEventListener("touchstart", function () {
    if (primes.includes(number)) {
      point += number; //素数の時ポイント増加
      result.push({ [number]: "〇(素数)" });
      console.log("correct!");
      pointLabel.text = "Point: " + point;
      game.assets[correctSound].clone().play();
    } else {
      console.log("incorrect!");
      result.push({ [number]: "✕(合成数)" });
      point -= number * 10;
      pointLabel.text = "Point: " + point;
      game.assets[incorrectSound].clone().play();
    }
    number = getRandomInt(2, 101);
    num.text = number; //素数以外の時ポイント増加
  });
  //Pキーが押されたら実行
  document.addEventListener("keydown", (event) => {
    if (countdown > 0) {
      if (event.code === "KeyP") {
        if (primes.includes(number)) {
          point += number; //素数の時ポイント増加
          result.push({ [number]: "〇(素数)" });
          console.log("correct!");
          pointLabel.text = "Point: " + point;
          game.assets[correctSound].clone().play();
        } else {
          console.log("incorrect!");
          result.push({ [number]: "✕(合成数)" });
          point -= number * 10;
          pointLabel.text = "Point: " + point;
          game.assets[incorrectSound].clone().play();
        }
        number = getRandomInt(2, 101);
        num.text = number; //素数以外の時ポイント増加
      }
    }
  });
  /////////////////////////////////////////////////////////////////////////
  incorrectButton.addEventListener("touchstart", function () {
    if (primes.includes(number)) {
      result.push({ [number]: "✕(素数)" });
      console.log("incorrect!");
      point -= number * 10;
      pointLabel.text = "Point: " + point;
      game.assets[incorrectSound].clone().play();
    } else {
      point += number;
      console.log("correct!");
      result.push({ [number]: "〇(合成数)" });
      pointLabel.text = "Point: " + point;
      game.assets[correctSound].clone().play();
    }
    number = getRandomInt(2, 101);
    num.text = number;
  });
  //Cキーが押されたら実行
  document.addEventListener("keydown", (event) => {
    if (countdown !== 0) {
      if (event.code === "KeyC") {
        if (primes.includes(number)) {
          result.push({ [number]: "✕(素数)" });
          console.log("incorrect!");
          point -= number * 10;
          pointLabel.text = "Point: " + point;
          game.assets[incorrectSound].clone().play();
        } else {
          point += number;
          console.log("correct!");
          result.push({ [number]: "〇(合成数)" });
          pointLabel.text = "Point: " + point;
          game.assets[correctSound].clone().play();
        }
        number = getRandomInt(2, 101);
        num.text = number;
      }
    }
  });
  /////////////////////////////////////////////////////////////////////////

  // カウントダウン表示
  let countdown = 30;
  const countdownLabel = new Label("Time: " + countdown);
  countdownLabel.x = 10;
  countdownLabel.y = 10;
  countdownLabel.color = "white";
  countdownLabel.font = "24px sans-serif";
  mainScene.addChild(countdownLabel);

  game.onenterframe = function () {
    // 一秒ごとにカウントダウンを更新
    if (game.frame % game.fps === 0 && countdown > 0) {
      countdown--;
      countdownLabel.text = "Time: " + countdown;
    }

    // カウントが0になったらゲームオーバーを表示
    if (countdown === 0) {
      gameOver();
    }
  };

  // ゲーム終了時に呼ばれる関数
  function gameOver() {
    // ゲーム終了シーンを表示するか、スコア表示などを行う
    const gameOverScene = new Scene();
    gameOverScene.backgroundColor = "red"; // ゲーム終了時に背景を赤にする例

    //リザルト表示テキスト
    resultText = "";
    result.forEach((element) =>
      Object.keys(element).forEach(function (value) {
        resultText += value + ":" + this[value] + "  ";
      }, element)
    );
    const resultLabel = new Label(resultText);
    resultLabel.x = 0;
    resultLabel.y = 0;
    gameOverScene.addChild(resultLabel);
    //point表示テキスト
    const label = new Label("Game Over! Your score: " + point);
    label.x = 100;
    label.y = 200;
    gameOverScene.addChild(label);

    //同難易度ボタン
    const againButton = new Label("again!");
    againButton.x = 100;
    againButton.y = 250;
    gameOverScene.addChild(againButton);

    //ホームに戻るボタン
    const homebackButton = new Label("back to home");
    homebackButton.x = 100;
    homebackButton.y = 300;
    gameOverScene.addChild(homebackButton);
    game.replaceScene(gameOverScene); // ゲーム終了シーンに切り替える

    //addEventListener系統
    againButton.addEventListener("touchstart", function () {
      // もう一度同じ難易度でゲームをスタートさせる処理
      startGame();
    });
    homebackButton.addEventListener("touchstart", function () {
      // ホーム画面に戻る処理
      window.location.reload();
    });
  }
  ////////////////////////////////////////
};

game.start();
