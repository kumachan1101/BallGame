class Ball{

  constructor(posx, posy, radius, speed, cCollisionWall, cPaddleControl, cDrawControl){
    this.posx = posx;
    this.posy = posy;
    this.radius = radius;
    this.speed = speed;
    this.cCollisionWall = cCollisionWall;
    this.direction = 1;
    this.dx = this.speed;
    this.dy = this.speed;
    this.cPaddleControl = cPaddleControl;
    this.cDrawControl = cDrawControl;
  }

  draw() {
    this.cDrawControl.drawArc(this.GetPosX, this.GetPosY, this.GetRadius);
  }

  updateX(){
    let bRet = this.cCollisionWall.check_right(this.posx + this.radius + this.dx);
    if (bRet){
      this.direction = -1;
      this.dx *= this.direction;
      this.posx = this.cCollisionWall.GetWallRight - this.radius*2;
      return;
    }     
    bRet = this.cCollisionWall.check_left(this.posx - this.radius + this.dx);
    if (bRet){
      this.direction = -1;
      this.dx *= this.direction;
      this.posx = this.cCollisionWall.GetWallLeft + this.radius*2;
      return;
    }     
    this.posx += this.dx;
  }

  updateY(){
    let bRet = this.cCollisionWall.check_up(this.posy + this.radius + this.dy);
    // 壁検出
    if (bRet){
      // パレット検出による跳ね返り
      bRet = this.cPaddleControl.CheckPaddlePlayer2(this.posx);
      if(bRet) {
        this.direction = -1;
        this.dy *= this.direction;
        this.posy = this.cCollisionWall.GetWallUp + this.radius*2;
      }
      // パレット検出せずゲーム終了
      else{
        this.posx = Math.floor( Math.random() * 350 ) + 50;
        this.posy = this.cCollisionWall.GetWallDown / 2;
        player1win++;
      }
      return;
    }

    bRet = this.cCollisionWall.check_down(this.posy - this.radius + this.dy);
    // 壁検出
    if (bRet){
      // パレット検出による跳ね返り
      bRet = this.cPaddleControl.CheckPaddlePlayer1(this.posx);
      if(bRet) {
        this.direction = -1;
        this.dy *= this.direction;
        this.posy = this.cCollisionWall.GetWallDown - this.radius*2;
      }
      // パレット検出せずゲーム終了
      else{
        this.posx = Math.floor( Math.random() * 350 ) + 50;
        this.posy = this.cCollisionWall.GetWallDown / 2;
        player2win++; 
      }
      return;
    }
    this.posy += this.dy;
  }

  /**
   * @param {any} posx
   */
  set SetPosX(posx){
    this.posx = posx;
  }

  get GetPosX(){
    return this.posx;
  }

  /**
   * @param {any} posy
   */
  set SetPosY(posy){
    this.posy = posy;
  }

  get GetPosY(){
    return this.posy;
  }

  /**
   * @param {any} dx
   */
  set SetPosDx(dx){
    this.dx = dx;
  }

  get GetDx(){
    return this.dx;
  }

  /**
   * @param {any} dy
   */
  set SetPosDy(dy){
    this.dy = dy;
  }

  get GetDy(){
    return this.dy;
  }

  get GetRadius(){
    return this.radius;
  }
}
