enchant();

//画面サイズ,設定
const game = new Game(400, 500);
game.fps = 30;

////////////////////////////////////////
//パーツ準備

//音系統
const correctSound = game.preload([]);
const incorrectSound = game.preload([]);

//イラスト系統

//ボタン系統

//パーツ準備終わり
////////////////////////////////////////

game.onload = function () {
  //グローバル変数
  let point = 0;
  let state = 0;

  const mainScene = new Scene();
  game.pushScene(mainScene);
  mainScene.backgroundColor = "black";

  // 30秒後にゲームを終了するタイマー
  setTimeout(function () {
    gameOver();
  }, 30000); // 30000ミリ秒 = 30秒

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
};
game.start();
