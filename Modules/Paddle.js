class Paddle{

  constructor(posx, posy, width, height, speed, cCollisionWall, cDrawControl){
    this.posx = posx;
    this.posy = posy;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.cCollisionWall = cCollisionWall;
    this.cDrawControl = cDrawControl;
  }

  MoveRight(){
    let bRet = this.cCollisionWall.check_right(this.posx + this.width + this.speed);
    if (bRet){
      return;
    }
    this.posx = this.posx + this.speed;
  }

  MoveLeft(){
    let bRet = this.cCollisionWall.check_left(this.posx - this.speed);
    if (bRet){
      return;
    }
    this.posx = this.posx - this.speed;
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
  
  get GetPosY(){
    return this.posy;
  }

  get GetWidth(){
    return this.width;
  }

  get GetHeight(){
    return this.height;
  }

  get GetSpeed(){
    return this.speed;
  }
}