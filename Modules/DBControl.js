import {updated_db_paddle, updated_db_ball_num, updated_db_score, update_db_ball} from "../main";

// database
database = firebase.database();
room = "ballgame";
// databaseURL
// https://console.firebase.google.com/project/ballgame-f147e/database/ballgame-f147e-default-rtdb/data

let DB_BALL_NUM   = "DB_BALL_NUM________";
let DB_SCORE      = "SCORE______________";
let DB_BALL_SPEED = "DB_BALL_SPEED______";

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

let DB_BALL_LIST = [DB_BALL1, DB_BALL2, DB_BALL3, DB_BALL4, DB_BALL5, DB_BALL6, DB_BALL7, DB_BALL8, DB_BALL9, DB_BALL10];


class DBControl{

    update_DB_BALL_NUM(value) {
        if(DB_BALL_LIST.length < value){
            return;
        }
        database.ref(room).child(DB_BALL_NUM).update({
            ball_num: value
        });
    }
    
    updated_DB_SCORE(player1win, player2win){
        database.ref(room).child(DB_SCORE).update({
            player1win: player1win,
            player2win: player2win
        });
    }

    update_DB_PADDLE1(PosX){
        database.ref(room).child(DB_PADDLE).update({
            paddleX1: PosX
        });
    }

    update_DB_PADDLE2(PosX){
        database.ref(room).child(DB_PADDLE).update({
            paddleX2: PosX
        });
    }

    update_DB_BALL_SPEED(value){
        database.ref(room).child(DB_BALL_SPEED).update({
            ball_speed: value
        });
 
    }

    update_DB_BALL_LIST(i, db_posx, db_posy, db_dx, db_dy){
        if (i >= DB_BALL_LIST.length){
            return;
        }

        database.ref(room).child(DB_BALL_LIST[i]).update({
            x:  db_posx,
            y:  db_posy,
            dx: db_dx,
            dy: db_dy
        });
    }
}

database.ref(room).on("child_changed", function(data) {
    updated_DB_PADDLE(data);
    updated_DB_BALL_LIST(data);
    updated_DB_BALL_SPEED(data);
    updated_DB_BALL_NUM(data);
    updated_DB_SCORE(data);
});

function updated_DB_BALL_NUM(data){
    var key = data.key;
    if (DB_BALL_NUM != key){
        return;
    }
    const v = data.val();
    updated_db_ball_num(v.ball_num); 
}


function updated_DB_SCORE(data){
    var key = data.key;
    if (DB_SCORE != key){
        return;
    }
    const v = data.val();
    updated_db_score(v.player1win, v.player2win);
}


function updated_DB_PADDLE(data){
    var key = data.key;
    if (DB_PADDLE != key){
        return;
    }
    const v = data.val();
    updated_db_paddle(v.paddleX1, v.paddleX2);
  }

  function updated_DB_BALL_LIST(data){
    var key = data.key;
    for(var i = 0;i<DB_BALL_LIST.length;i++){
        if (DB_BALL_LIST[i] == key){
            break;
        }
    }
    if(i>=DB_BALL_LIST.length){
        return;
    }
    const v = data.val();
    cBallControl.updateBallList(i, v.x, v.y, v.dx, v.dy);
}


function updated_DB_BALL_SPEED(data){
    var key = data.key;
    if (DB_BALL_SPEED != key){
        return;
    }
    const v = data.val();
    input_ballspeed.value = v.ball_speed;
    update_db_ball();
}
