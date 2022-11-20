export class CollisionWall {
  
  constructor(wall_left, wall_up, wall_right, wall_down) {
    this.wall_left = wall_left;
    this.wall_up = wall_up;
    this.wall_right = wall_right;
    this.wall_down = wall_down;
  }

  get GetWallLeft(){
    return this.wall_left;
  }

  get GetWallUp(){
    return this.wall_up;
  }

  get GetWallRight(){
    return this.wall_right;
  }

  get GetWallDown(){
    return this.wall_down;
  }

  check_left(xpos) {
    if(xpos < this.wall_left){
      return true
    }
    return false
  }

  check_right(xpos) {
    if(this.wall_right < xpos){
      return true
    }
    return false
  }

  check_up(ypos) {
    if(ypos <= this.wall_up){
      return true
    }
    return false
  }

  check_down(ypos) {
    if(this.wall_down <= ypos){
      return true
    }
    return false
  }
}
  