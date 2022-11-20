class DrawControl{

    drawArc(x, y, radius){
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    drawRect(x, y, w, h){
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }

}