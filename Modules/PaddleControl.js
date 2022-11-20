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

export class PaddleControl{
  constructor(cCollisionWall, cDrawControl, cDBControl){
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
    this.cDBControl = cDBControl;
    this.initPaddle();
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

  initPaddle(){
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
    this.cDBControl.update_DB_PADDLE1(cPaddle.GetPosX);
  }

  updatePaddlePlayer2(){
    var cPaddle = this.cPaddlePlayer2;
    this.update(cPaddle);
    this.cDBControl.update_DB_PADDLE2(cPaddle.GetPosX);
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

