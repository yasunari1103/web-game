enchant();

//画面サイズ,設定
const game = new Game(400, 500);
game.fps = 30;

////////////////////////////////////////
//パーツ準備

//音系統
const correctSound = "";
game.preload([]);

const incorrectSound = "";
game.preload([]);

//イラスト系統

//ボタン系統
const primeButton = "素数ボタン.png";
game.preload([primeButton]);

const compositeButton = "合成数ボタン.png";
game.preload([compositeButton]);

//パーツ準備終わり
////////////////////////////////////////

game.onload = function () {
  //グローバル変数
  let point = 0;

  const mainScene = new Scene();
  game.pushScene(mainScene);
  mainScene.backgroundColor = "black";

  //ポイント表示
  const pointLabel = new Label("point: 0");
  pointLabel.x = 175;
  pointLabel.y = 5;
  pointLabel.font = "24px sans-serif";
  pointLabel.color = "white";
  pointLabel.textAlign = "center";
  pointLabel.style = { borderRadius: "10px" };
  pointLabel.padding = "10px";
  mainScene.addChild(pointLabel);

  ////////////////////////////////////////
  // ランダムで整数を獲得する関数
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // 上限は除き、下限は含む
  }

  ////////////////////////////////////////
  //easy modeの設定
  number = getRandomInt(2, 51);
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

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
  correctButton.moveTo(200, 300);
  correctButton.image = game.assets[primeButton];
  mainScene.addChild(correctButton);

  const incorrectButton = new Sprite(200, 200);
  incorrectButton.moveTo(0, 300);
  incorrectButton.image = game.assets[compositeButton];
  mainScene.addChild(incorrectButton);
  // ボタンクリック時の処理
  /////////////////////////////////////////////////////////////////////////
  correctButton.addEventListener("touchstart", function () {
    if (primes.includes(number)) {
      point += number; //素数の時ポイント増加
      console.log("correct!");
      pointLabel.text = "point:" + point;
    } else {
      console.log("incorrect!");
      point -= number * 10;
      pointLabel.text = "point:" + point;
    }
    number = getRandomInt(2, 51);
    num.text = number; //素数以外の時ポイント増加
  });
  //Pキーが押されたら実行
  document.addEventListener("keydown", (event) => {
    if (event.code === "KeyP") {
      if (primes.includes(number)) {
        point += number; //素数の時ポイント増加
        console.log("correct!");
        pointLabel.text = "point:" + point;
      } else {
        console.log("incorrect!");
        point -= number * 10;
        pointLabel.text = "point:" + point;
      }
      number = getRandomInt(2, 51);
      num.text = number; //素数以外の時ポイント増加
    }
  });
  /////////////////////////////////////////////////////////////////////////
  incorrectButton.addEventListener("touchstart", function () {
    if (primes.includes(number)) {
      console.log("incorrect!");
      point -= number * 10;
      pointLabel.text = "point:" + point;
    } else {
      point += number;
      console.log("correct!");
      pointLabel.text = "point:" + point;
    }
    number = getRandomInt(2, 51);
    num.text = number;
  });
  //Cキーが押されたら実行
  document.addEventListener("keydown", (event) => {
    if (event.code === "KeyC") {
      if (primes.includes(number)) {
        console.log("incorrect!");
        point -= number * 10;
        pointLabel.text = "point:" + point;
      } else {
        point += number;
        console.log("correct!");
        pointLabel.text = "point:" + point;
      }
      number = getRandomInt(2, 51);
      num.text = number;
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
    const label = new Label("Game Over! Your score: " + point);
    label.x = 100;
    label.y = 200;
    gameOverScene.addChild(label);
    game.replaceScene(gameOverScene); // ゲーム終了シーンに切り替える
  }
  ////////////////////////////////////////
};

game.start();
