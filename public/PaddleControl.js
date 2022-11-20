class PaddleStatus{
  constructor(){
    this.rightPressed = false;
    this.leftPressed = false;
  }
  /**
   * @param {boolean} boolstatus
   */
  set SetRightPressed(boolstatus){
    this.rightPressed = boolstatus;
  }
  /**
   * @param {boolean} boolstatus
   */
  set SetLeftPressed(boolstatus){
    this.leftPressed = boolstatus;
  }
  get GetRightPressed(){
    return this.rightPressed;
  }
  get GetLeftPressed(){
    return this.leftPressed;
  }
}

class PaddleControl{
  constructor(cCollisionWall, cDrawControl){
    this.paddleHeight = 10;
    this.paddleWidth = 120;
    var paddleX1 = (cCollisionWall.GetWallRight-this.paddleWidth)/2;
    var paddleX2 = (cCollisionWall.GetWallRight-this.paddleWidth)/2;
    var paddleY1 = cCollisionWall.GetWallDown-this.paddleHeight;
    var paddleY2 = 0;
    var paddleSpeed1 = 7;
    var paddleSpeed2 = 7;
    this.cPaddlePlayer1 = new Paddle(paddleX1, paddleY1, this.paddleWidth, this.paddleHeight, paddleSpeed1, cCollisionWall);
    this.cPaddlePlayer2 = new Paddle(paddleX2, paddleY2, this.paddleWidth, this.paddleHeight, paddleSpeed2, cCollisionWall);
    this.cDrawControl = cDrawControl;
    this.cPaddleStatus = new PaddleStatus();
  }

  get GetRightPressed(){
    return this.cPaddleStatus.rightPressed;
  }

  /**
   * @param {any} boolstatus
   */
  set SetRightPressed(boolstatus){
    this.cPaddleStatus.SetRightPressed = boolstatus;
  }

  get GetLeftPressed(){
    return this.cPaddleStatus.leftPressed;
  }

  /**
   * @param {any} boolstatus
   */
  set SetLeftPressed(boolstatus){
    this.cPaddleStatus.SetLeftPressed = boolstatus;
  }

  draw() {
    this.cDrawControl.drawRect(this.cPaddlePlayer1.GetPosX, this.cPaddlePlayer1.GetPosY, this.cPaddlePlayer1.GetWidth, this.cPaddlePlayer1.GetHeight);
    this.cDrawControl.drawRect(this.cPaddlePlayer2.GetPosX, this.cPaddlePlayer2.GetPosY, this.cPaddlePlayer2.GetWidth, this.cPaddlePlayer2.GetHeight);
  }

  update(cPaddle){
    if(this.cPaddleStatus.GetRightPressed){
      cPaddle.MoveRight();
    }
    else if(this.cPaddleStatus.GetLeftPressed){
      cPaddle.MoveLeft();
    }
  }

  updatePaddlePlayer1(){
    var cPaddle = this.cPaddlePlayer1;
    this.update(cPaddle);
    database.ref(room).child(DB_PADDLE).update({
      paddleX1: cPaddle.GetPosX
    });
  }

  updatePaddlePlayer2(){
    var cPaddle = this.cPaddlePlayer2;
    this.update(cPaddle);
    database.ref(room).child(DB_PADDLE).update({
      paddleX2: cPaddle.GetPosX
    });
  }

  get GetPaddlePlayer1(){
    return this.cPaddlePlayer1;
  }
  
  get GetPaddlePlayer2(){
    return this.cPaddlePlayer2;
  }

  CheckPaddlePlayer1(posx){
    if(posx >= this.cPaddlePlayer1.GetPosX && posx <= this.cPaddlePlayer1.GetPosX + this.paddleWidth) {
      return true;
    }
    return false;
  }

  CheckPaddlePlayer2(posx){
    if(posx >= this.cPaddlePlayer2.GetPosX && posx <= this.cPaddlePlayer2.GetPosX + this.paddleWidth) {
      return true;
    }
    return false;
  }
}
