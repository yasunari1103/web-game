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
const gameBackGround = "背景素材/ゲーム画面.png"; // 7016 * 4961
game.preload([gameBackGround]);

const sd = "sdキャラ素材/笑顔.png"; // 211 * 313
game.preload([sd]);

//ボタン系統
const prime = "ボタン素材/素数.png"; // 2192 * 1450
game.preload([prime]);

const primeSelected = "ボタン素材/素数(選択時).png"; // 2192 * 1450
game.preload([primeSelected]);

const composite = "ボタン素材/合成数.png"; // 2192 * 1450
game.preload([composite]);

const compositeSelected = "ボタン素材/合成数(選択時).png"; // 2192 * 1450
game.preload([compositeSelected]);

//パーツ準備終わり
////////////////////////////////////////

game.onload = function startGame() {
  //グローバル変数
  let point = 0;
  let result = [];

  const mainScene = new Scene();
  game.pushScene(mainScene);
  mainScene.backgroundColor = "black";

  var BackGround = new Sprite(625, 441);
  const surfaceBackGround = new Surface(625, 441); // 縮小後のサイズでSurfaceを作成
  surfaceBackGround.draw(
    game.assets[gameBackGround],
    0,
    0,
    7016,
    4961,
    0,
    0,
    625,
    441
  );
  BackGround.image = surfaceBackGround;
  mainScene.addChild(BackGround);

  //sdイラスト
  var sdIllust = new Sprite(211, 313);
  sdIllust.moveTo(15, 95);
  sdIllust.image = game.assets[sd];
  mainScene.addChild(sdIllust);

  //ポイント表示
  const pointLabel = new Label("0");
  pointLabel.x = 115;
  pointLabel.y = 69;
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
  //easy modeの設定
  number = getRandomInt(2, 51);
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

  //数字を入れる予定のLabel
  const num = new Label("");
  num.font = "120px sans-serif";
  num.color = "white";
  mainScene.addChild(num);

  //数字を代入
  num.text = number;

  num.width = num._boundWidth; // テキストの幅を更新
  num.height = num._boundHeight; // テキストの高さを更新

  num.x = 420 - num.width / 2;
  num.y = 160 - num.height / 2;

  //ボタン作成
  var primeButton = new Sprite(200, 130);
  primeButton.moveTo(405, 275);
  const surfacePrime = new Surface(200, 130);
  const surfacePrimeSelected = new Surface(200, 130);
  surfacePrime.draw(game.assets[prime], 0, 0, 2192, 1450, 0, 0, 200, 130); //scale使えないからsurfaceを使って描画した
  surfacePrimeSelected.draw(
    game.assets[primeSelected],
    0,
    0,
    2192,
    1450,
    0,
    0,
    200,
    130
  ); //scale使えないからsurfaceを使って描画した
  primeButton.image = surfacePrime;
  mainScene.addChild(primeButton);

  var compositeButton = new Sprite(200, 130);
  compositeButton.moveTo(195, 275);
  const surfaceComposite = new Surface(200, 130);
  const surfaceCompositeSelected = new Surface(200, 130);
  surfaceComposite.draw(
    game.assets[composite],
    0,
    0,
    2192,
    1450,
    0,
    0,
    200,
    130
  );
  surfaceCompositeSelected.draw(
    game.assets[compositeSelected],
    0,
    0,
    2192,
    1450,
    0,
    0,
    200,
    130
  ); //scale使えないからsurfaceを使って描画した
  compositeButton.image = surfaceComposite;
  mainScene.addChild(compositeButton);

  // ボタンクリック時の処理
  /////////////////////////////////////////////////////////////////////////
  primeButton.addEventListener("touchstart", function () {
    if (primes.includes(number)) {
      point += number; //素数の時ポイント増加
      result.push({ [number]: "〇(素数)" });
      console.log("correct!");
      pointLabel.text = "" + point;
      game.assets[correctSound].clone().play();
    } else {
      console.log("incorrect!");
      result.push({ [number]: "✕(合成数)" });
      point -= number * 10;
      pointLabel.text = "" + point;
      game.assets[incorrectSound].clone().play();
    }
    number = getRandomInt(2, 51);
    num.text = number;

    num.width = num._boundWidth; // テキストの幅を更新
    num.height = num._boundHeight; // テキストの高さを更新

    num.x = 420 - num.width / 2;
    num.y = 160 - num.height / 2;
    primeButton.image = surfacePrimeSelected;
    setTimeout(() => {
      primeButton.image = surfacePrime;
    }, 100);
  });
  //Pキーが押されたら実行
  document.addEventListener("keydown", (event) => {
    if (countdown > 0) {
      if (event.code === "KeyP") {
        if (primes.includes(number)) {
          point += number; //素数の時ポイント増加
          console.log("correct!");
          result.push({ [number]: "〇(素数)" });
          pointLabel.text = "" + point;
          game.assets[correctSound].clone().play();
        } else {
          console.log("incorrect!");
          result.push({ [number]: "✕(合成数)" });
          point -= number * 10;
          pointLabel.text = "" + point;
          game.assets[incorrectSound].clone().play();
        }
        number = getRandomInt(2, 51);
        num.text = number;

        num.width = num._boundWidth; // テキストの幅を更新
        num.height = num._boundHeight; // テキストの高さを更新

        num.x = 420 - num.width / 2;
        num.y = 160 - num.height / 2;
        primeButton.image = surfacePrimeSelected;
        setTimeout(() => {
          primeButton.image = surfacePrime;
        }, 100);
      }
    }
  });
  /////////////////////////////////////////////////////////////////////////
  compositeButton.addEventListener("touchstart", function () {
    if (primes.includes(number)) {
      result.push({ [number]: "✕(素数)" });
      console.log("incorrect!");
      point -= number * 10;
      pointLabel.text = "" + point;
      game.assets[incorrectSound].clone().play();
    } else {
      point += number;
      console.log("correct!");
      result.push({ [number]: "〇(合成数)" });
      pointLabel.text = "" + point;
      game.assets[correctSound].clone().play();
    }
    number = getRandomInt(2, 51);
    num.text = number;

    num.width = num._boundWidth; // テキストの幅を更新
    num.height = num._boundHeight; // テキストの高さを更新

    num.x = 420 - num.width / 2;
    num.y = 160 - num.height / 2;
    compositeButton.image = surfaceCompositeSelected;
    setTimeout(() => {
      compositeButton.image = surfaceComposite;
    }, 100);
  });
  //Cキーが押されたら実行
  document.addEventListener("keydown", (event) => {
    if (countdown > 0) {
      if (event.code === "KeyC") {
        if (primes.includes(number)) {
          result.push({ [number]: "✕(素数)" });
          console.log("incorrect!");
          point -= number * 10;
          pointLabel.text = "" + point;
          game.assets[incorrectSound].clone().play();
        } else {
          point += number;
          result.push({ [number]: "〇(合成数)" });
          console.log("correct!");
          pointLabel.text = "" + point;
          game.assets[correctSound].clone().play();
        }
        number = getRandomInt(2, 51);
        num.text = number;

        num.width = num._boundWidth; // テキストの幅を更新
        num.height = num._boundHeight; // テキストの高さを更新

        num.x = 420 - num.width / 2;
        num.y = 160 - num.height / 2;
        compositeButton.image = surfaceCompositeSelected;
        setTimeout(() => {
          compositeButton.image = surfaceComposite;
        }, 100);
      }
    }
  });
  /////////////////////////////////////////////////////////////////////////
  // カウントダウン表示
  let countdown = 30;
  const countdownLabel = new Label("" + countdown);
  countdownLabel.x = 102;
  countdownLabel.y = 43;
  countdownLabel.color = "white";
  countdownLabel.font = "24px sans-serif";
  mainScene.addChild(countdownLabel);

  game.onenterframe = function () {
    // 一秒ごとにカウントダウンを更新
    if (game.frame % game.fps === 0 && countdown > 0) {
      countdown--;
      countdownLabel.text = "" + countdown;
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
