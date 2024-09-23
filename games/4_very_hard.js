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

const sd = "sdキャラ素材/煽り.png"; // 211 * 313
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
  //very hard modeの設定
  number = getRandomInt(2, 3001);
  const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
    157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
    239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
    331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
    421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
    509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607,
    613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701,
    709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811,
    821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911,
    919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013,
    1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091,
    1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181,
    1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277,
    1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361,
    1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451,
    1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531,
    1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609,
    1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699,
    1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789,
    1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889,
    1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997,
    1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083,
    2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161,
    2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273,
    2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357,
    2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441,
    2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551,
    2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663,
    2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729,
    2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819,
    2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917,
    2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999,
  ];

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
    number = getRandomInt(2, 3001);
    num.text = number;

    num.width = num._boundWidth; // テキストの幅を更新
    num.height = num._boundHeight; // テキストの高さを更新

    num.x = 420 - num.width / 2;
    num.y = 160 - num.height / 2;
    primeButton.image = surfacePrimeSelected;
    sdIllust.y -= 10;
    setTimeout(() => {
      primeButton.image = surfacePrime;
      sdIllust.y += 10;
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
        number = getRandomInt(2, 3001);
        num.text = number;

        num.width = num._boundWidth; // テキストの幅を更新
        num.height = num._boundHeight; // テキストの高さを更新

        num.x = 420 - num.width / 2;
        num.y = 160 - num.height / 2;
        primeButton.image = surfacePrimeSelected;
        sdIllust.y -= 10;
        setTimeout(() => {
          primeButton.image = surfacePrime;
          sdIllust.y += 10;
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
    number = getRandomInt(2, 3001);
    num.text = number;

    num.width = num._boundWidth; // テキストの幅を更新
    num.height = num._boundHeight; // テキストの高さを更新

    num.x = 420 - num.width / 2;
    num.y = 160 - num.height / 2;
    compositeButton.image = surfaceCompositeSelected;
    sdIllust.y -= 10;
    setTimeout(() => {
      compositeButton.image = surfaceComposite;
      sdIllust.y += 10;
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
        number = getRandomInt(2, 3001);
        num.text = number;

        num.width = num._boundWidth; // テキストの幅を更新
        num.height = num._boundHeight; // テキストの高さを更新

        num.x = 420 - num.width / 2;
        num.y = 160 - num.height / 2;
        compositeButton.image = surfaceCompositeSelected;
        sdIllust.y -= 10;
        setTimeout(() => {
          compositeButton.image = surfaceComposite;
          sdIllust.y += 10;
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
