

export class BallControl{

    constructor(posx, posy, speed, cCollisionWall, cPaddleControl, cDrawControl){
        this.ballRadius = 10;
        this.cCollisionWall = cCollisionWall;
        this.cPaddleControl = cPaddleControl;
        this.cDrawControl = cDrawControl;
        this.balllist = [];
        let cBall = new Ball(posx, posy, this.ballRadius, speed);
        this.balllist.push(cBall);
    }

    updateBallList(i, x, y, dx, dy){
        let cBall = this.balllist[i];
        cBall.SetPosX = parseInt(x);
        cBall.SetPosY = parseInt(y);
        cBall.SetPosDx = dx;
        cBall.SetPosDy = dy;
  
    }

    add(posx, posy, speed){
        let cBall = new Ball(posx, posy, this.ballRadius, speed);
        this.balllist.push(cBall);     
    }

    clear(){
        this.balllist.length = 0;
    }

    getLen(){
        return this.balllist.length;
    }

    get(i){
        return this.balllist[i];
    }

    draw() {
        for(var i =0;i<this.balllist.length;i++){
            let cBall = this.balllist[i];
            this.cDrawControl.drawArc(cBall.GetPosX, cBall.GetPosY, cBall.GetRadius);
        }
    }
  
    updateX(i){
      let cBall = this.balllist[i];
      if(cBall === undefined){
        return;
      }
      let bRet = this.cCollisionWall.check_right(cBall.GetPosX + cBall.GetRadius + cBall.GetDx);
      if (bRet){
        cBall.SetPosDx = cBall.GetDx * -1;
        cBall.SetPosX = this.cCollisionWall.GetWallRight - cBall.GetRadius*2;
        return;
      }     
      bRet = this.cCollisionWall.check_left(cBall.GetPosX - cBall.GetRadius + cBall.GetDx);
      if (bRet){
        cBall.SetPosDx = cBall.GetDx * -1;
        cBall.SetPosX = this.cCollisionWall.GetWallLeft + cBall.GetRadius*2;
        return;
      }     
      cBall.SetPosX = cBall.GetPosX + cBall.GetDx;
    }
  
    updateY(i){
      let cBall = this.balllist[i];
      if(cBall === undefined){
        return;
      }
      let bRet = this.cCollisionWall.check_up(cBall.GetPosY + cBall.GetRadius + cBall.GetDy);
      // 壁検出
      if (bRet){
        // パレット検出による跳ね返り
        bRet = this.cPaddleControl.CheckPaddlePlayer2(cBall.GetPosX);
        if(bRet) {
            cBall.SetPosDy = cBall.GetDy * -1;
            cBall.SetPosY = this.cCollisionWall.GetWallUp + cBall.GetRadius*2;
        }
        // パレット検出せずゲーム終了
        else{
          this.balllist.splice(i,1);
          //cBall.end = true;
          //cBall.SetPosY = 0 - cBall.GetRadius*2;
          player1win++;
        }
        return;
      }
  
      bRet = this.cCollisionWall.check_down(cBall.GetPosY - cBall.GetRadius + cBall.GetDy);
      // 壁検出
      if (bRet){
        // パレット検出による跳ね返り
        bRet = this.cPaddleControl.CheckPaddlePlayer1(cBall.GetPosX);
        if(bRet) {
            cBall.SetPosDy = cBall.GetDy * -1;
            cBall.SetPosY = this.cCollisionWall.GetWallDown - cBall.GetRadius*2;
        }
        // パレット検出せずゲーム終了
        else{
          this.balllist.splice(i,1);
          //cBall.end = true;
          //cBall.SetPosY  = this.cCollisionWall.GetWallDown + cBall.GetRadius*2;
          player2win++; 
        }
        return;
      }
      cBall.SetPosY =  cBall.GetPosY + cBall.GetDy;
    }

    updatePos(i){
        this.updateX(i);
        this.updateY(i);

    }
}
  