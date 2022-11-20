/*
・ボールスピードとボール数は、データベースに登録して、同期をとる
・BallクラスとPaddleクラスなど、ポジションを意識するクラスは、ポジションクラスを継承する
・Ballクラスが他のコントロールクラスを意識しすぎ。BallControlクラスを用意する
・スコア表示も、Ballなどと同じくDrawControlへ切り出す
・スコア判定クラスを用意する
*/
/* https://ballgame-f147e.web.app */
/*
https://qiita.com/ikdysk/items/c4390c2204b9a8d48b98

*/

// Score
var score = 0;
const name = document.getElementById("name");
var player1win = 0;
var player2win = 0;

// canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var cDrawControl = new DrawControl();
var interval = setInterval(draw, 20);

// Wall
var wall_left = 0;
var wall_up = 0;
var wall_right = canvas.width;
var wall_down = canvas.height;
var cCollisionWall = new CollisionWall(wall_left, wall_up, wall_right, wall_down);

// Paddle
var cPaddleControl = new PaddleControl(cCollisionWall, cDrawControl);
cPaddlePlayer1 = cPaddleControl.GetPaddlePlayer1;
cPaddlePlayer2 = cPaddleControl.GetPaddlePlayer2;
initPaddle();

// Ball
var ballRadius = 10;
var x = Math.floor( Math.random() * 350 ) + 50;
var y = Math.floor( Math.random() * 350 ) + 100;

var input_ballspeed = document.getElementById("speed");
input_ballspeed.addEventListener('change', handleChange1);
var input_ballnum = document.getElementById("ballnum");
input_ballnum.addEventListener('change', handleChange2);
var cBall = new Ball(x, y, ballRadius, parseInt(input_ballspeed.value), cCollisionWall, cPaddleControl, cDrawControl);
balllist = [];
balllist.push(cBall);

// database
var database = firebase.database();
let room = "ballgame";
// databaseURL
// https://console.firebase.google.com/project/ballgame-f147e/database/ballgame-f147e-default-rtdb/data

// paddle1,paddle2
let DB_PADDLE  = "NClMDI0iiwrNG0Uj3XK";
// ball1-ball10
let DB_BALL1 = "-NE0mrLQCO1nCmezYCQf";
let DB_BALL2 = "-NE0mrL7XOvKaHJ0w_Pe";
let DB_BALL3 = "-NE0mrKpDWZz2aG8dDE1";
let DB_BALL4 = "-NE0mrKWQ2r5sv0pmuYc";
let DB_BALL5 = "-NE0mrKAZESr88qgkYgn";
let DB_BALL6 = "-NE0mrJrzZ7Y1GLifobA";
let DB_BALL7 = "-NE0mrJYtMMK2IIFuz8y";
let DB_BALL8 = "-NE0mrJEutu_mkOqShTI";
let DB_BALL9 = "-NE0mrJEJ9ZB-dM8hRr3";
let DB_BALL10= "-NE0mrIvufMYzrYn45mE";
// ballsetting
let DB_BALL_SPEED = "DB_BALL_SPEED______";
let DB_BALL_NUM   = "DB_BALL_NUM________";

let DB_BALL_LIST = [DB_BALL1, DB_BALL2, DB_BALL3, DB_BALL4, DB_BALL5, DB_BALL6, DB_BALL7, DB_BALL8, DB_BALL9, DB_BALL10];

database.ref(room).on("child_changed", function(data) {
    var key = data.key;
    if (DB_PADDLE != key){
        return;
    }
    const v = data.val();
    cPaddlePlayer1.SetPosX = v.paddleX1;
    cPaddlePlayer2.SetPosX = v.paddleX2;
});

database.ref(room).on("child_changed", function(data) {
    var key = data.key;
    for(var i = 0;i<DB_BALL_LIST.length;i++){
        if (DB_BALL_LIST[i] == key){
            break;
        }
    }
    if(i>=DB_BALL_LIST.length){
        return;
    }
    cBall = balllist[i];
    const v = data.val();
    cBall.SetPosX = parseInt(v.x);
    cBall.SetPosY = parseInt(v.y);
    cBall.SetPosDx = v.dx;
    cBall.SetPosDy = v.dy;
});

database.ref(room).on("child_changed", function(data) {
    var key = data.key;
    if (DB_BALL_SPEED != key){
        return;
    }
    const v = data.val();
    input_ballspeed.value = v.ball_speed;
    update_db_ball();
});

database.ref(room).on("child_changed", function(data) {
    var key = data.key;
    if (DB_BALL_NUM != key){
        return;
    }
    const v = data.val();
    balllist.length = 0;
    input_ballnum.value =v.ball_num; 
    update_db_ball();
});

function update_db_ball(){
    for(var i =0;i<input_ballnum.value ;i++){
        var x = Math.floor( Math.random() * 350 ) + 50;
        var y = Math.floor( Math.random() * 350 ) + 100;
        cBall = new Ball(x, y, ballRadius, parseInt(input_ballspeed.value), cCollisionWall, cPaddleControl, cDrawControl);
        balllist.push(cBall);       
    }
}

function initPaddle(){
    document.getElementById('btnright').addEventListener('pointerdown', () => {
    const intervalId = setInterval(pushing_btnright, 50)
    
    document.addEventListener('pointerup', () => {
        cPaddleControl.SetRightPressed = false;
        clearInterval(intervalId)
        }, { once: true })
    })
    const pushing_btnright = () => {
        cPaddleControl.SetRightPressed = true;
    }

    document.getElementById('btnleft').addEventListener('pointerdown', () => {
        const intervalId = setInterval(pushing_btnleft, 50)

        document.addEventListener('pointerup', () => {
            cPaddleControl.SetLeftPressed = false;
        clearInterval(intervalId)
        }, { once: true })
    })
    const pushing_btnleft = () => {
        cPaddleControl.SetLeftPressed = true;
    }

    var cKeyControl = new KeyControl();
    document.addEventListener("keydown", cKeyControl.keyDownHandler, false);
    document.addEventListener("keyup", cKeyControl.keyUpHandler, false);
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("win: "+player1win, 8, canvas.height-10);
    ctx.fillText("win: "+player2win, 8, 20);
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

    for(var i =0;i<balllist.length;i++){
        cBall = balllist[i];
        cBall.updateX();
        cBall.updateY();
        if (name.value == "yuu"){
            database.ref(room).child(DB_BALL_LIST[i]).update({
            x:  cBall.GetPosX,
            y:  cBall.GetPosY,
            dx: cBall.GetDx,
            dy: cBall.GetDy
            });
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i =0;i<balllist.length;i++){
        cBall = balllist[i];
        cBall.draw();
    }
    cPaddleControl.draw();
    drawScore();
    updateBall();
    updatePaddle();
}

// ボールスピード変更
function handleChange1(event) {
    var value = parseInt(input_ballspeed.value);
    for(var i =0;i<balllist.length;i++){
        if (i >= DB_BALL_LIST.length){
            break;
        }
        
        //balllist[i].SetPosDx = value;
        //balllist[i].SetPosDy = value;
        database.ref(room).child(DB_BALL_LIST[i]).update({
            dx: value,
            dy: value
        });

        database.ref(room).child(DB_BALL_SPEED).update({
            ball_speed: value
        });
    }
}
str = "ball_num"
// ボール数変更
function handleChange2(event) {
    var value = parseInt(input_ballnum.value);
    if(DB_BALL_LIST.length < value){
        return;
    }

    database.ref(room).child(DB_BALL_NUM).update({
        //ball_num: value
        str: value
    });
}