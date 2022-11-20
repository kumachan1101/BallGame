/*
・import exportで依存関係を構築。依存関係が構築されればF12でジャンプできる
・databaseのアクセス方法は、DBControlを作成してそこで行う。各コントロールクラスでDBControlのアクセスを行う。
・各コントロールクラスは、FireBaseの更新のやり方は意識しないが、データの要素名は決めれる。→要素名を決めれなかった

・スコア判定クラスを用意する
・スコア表示も、Ballなどと同じくDrawControlへ切り出す
・BallクラスとPaddleクラスなど、ポジションを意識するクラスは、ポジションクラスを継承する
・画面に入力した文字列を数字に変換しており、文字列と数字の責務が良くわからん。常に数字で扱いたい。　
・githubで完成したコードは管理したい
・部品の取り外しができるように。ボール、パドルを削除、追加、がクラスの削除、追加だけでできるように。
・各部品のUIの処理も、各機能クラスへ移動する。
*/
/* https://ballgame-f147e.web.app */
/*
https://qiita.com/ikdysk/items/c4390c2204b9a8d48b98

*/

console.log('test1');

import {DBControl} from "./Modules/DBControl";
import {BallControl} from "./Modules/Ball";
import {PaddleControl} from "./Modules/PaddleControl";
import {DrawControl} from "./Modules/DrawControl";
import {CollisionWall} from "./Modules/CollisionWall";

var cDBControl = new DBControl();

// Score
var score = 0;
const name = document.getElementById("name");
var player1win = 0;
var player2win = 0;

// canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var cDrawControl = new DrawControl();

// Wall
var wall_left = 0;
var wall_up = 0;
var wall_right = canvas.width;
var wall_down = canvas.height;
var cCollisionWall = new CollisionWall(wall_left, wall_up, wall_right, wall_down);

// Paddle
var cPaddleControl = new PaddleControl(cCollisionWall, cDrawControl, cDBControl);

// Ball
var x = Math.floor( Math.random() * 350 ) + 50;
var y = Math.floor( Math.random() * 350 ) + 100;

var input_ballspeed = document.getElementById("speed");
input_ballspeed.addEventListener('change', handleChange1);
var input_ballnum = document.getElementById("ballnum");
input_ballnum.addEventListener('change', handleChange2);
var cBallControl = new BallControl(x, y, parseInt(input_ballspeed.value), cCollisionWall, cPaddleControl, cDrawControl);

var interval = setInterval(draw, 20);

// database
var database = firebase.database();
let room = "ballgame";
// databaseURL
// https://console.firebase.google.com/project/ballgame-f147e/database/ballgame-f147e-default-rtdb/data



export function updated_db_paddle(paddleX1, paddleX2){
    cPaddlePlayer1 = cPaddleControl.GetPaddlePlayer1;
    cPaddlePlayer2 = cPaddleControl.GetPaddlePlayer2;
    cPaddlePlayer1.SetPosX = paddleX1;
    cPaddlePlayer2.SetPosX = paddleX2;
}

export function updated_db_ball_num(data){
    input_ballnum.value = data; 
    update_db_ball();
}

export function updated_db_score(db_player1win, db_player2win){
    player1win =db_player1win; 
    player2win =db_player2win; 
    drawScore();
}

export function update_db_ball(){
    cBallControl.clear();
    for(var i =0;i<input_ballnum.value ;i++){
        var x = Math.floor( Math.random() * 350 ) + 50;
        var y = Math.floor( Math.random() * 350 ) + 100;
        cBallControl.add(x,y, parseInt(input_ballspeed.value));
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("win: "+player1win, 8, canvas.height-10);
    ctx.fillText("win: "+player2win, 8, 20);
}  

function updateScore(){
    if (name.value == "yuu"){
        cDBControl.updated_DB_SCORE(player1win, player2win);
    }
}

function updatePaddle(){
    if (name.value == "yuu"){
        cPaddleControl.updatePaddlePlayer1();
    }
    else if (name.value == "hiroaki"){
        cPaddleControl.updatePaddlePlayer2();
    }
}

function updateBall(){
    length = cBallControl.getLen();
    for(var i =0;i<length;i++){
        cBallControl.updatePos(i);
        cBall = cBallControl.get(i);
        if (cBall === undefined){
            return;
        }
        if (name.value == "yuu"){
            cDBControl.update_DB_BALL_LIST(i, cBall.GetPosX, cBall.GetPosY,cBall.GetDx, cBall.GetDy);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cBallControl.draw();
    cPaddleControl.draw();
    drawScore();
    updateBall();
    updatePaddle();
    updateScore();
}

// ボールスピード変更
function handleChange1(event) {
    var value = parseInt(input_ballspeed.value);
    length = cBallControl.getLen();
    for(var i =0;i<length;i++){
        cBall = cBallControl.get(i);
        cDBControl.update_DB_BALL_LIST(i, cBall.GetPosX, cBall.GetPosY,value, value);
    }
    cDBControl.update_DB_BALL_SPEED(value);
}

// ボール数変更
function handleChange2(event) {
    var value = parseInt(input_ballnum.value);
    cDBControl.update_DB_BALL_NUM(value);
}
