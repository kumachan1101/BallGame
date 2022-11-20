export class Ball{

  constructor(posx, posy, radius, speed){
    this.posx = posx;
    this.posy = posy;
    this.radius = radius;
    this.dx = speed;
    this.dy = speed;
    this.end = false;
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
