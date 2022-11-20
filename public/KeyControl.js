
class KeyControl{

  keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
      cPaddleControl.SetRightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      cPaddleControl.SetLeftPressed = true;
    }
  }
  
  keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
      cPaddleControl.SetRightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      cPaddleControl.SetLeftPressed = false;
    }
  }
}