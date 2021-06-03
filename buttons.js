//draw circles with specified color ,radius and a number within
function drawCircles(x,y,r,clr,fillclr,number){

    ctx.beginPath();
    ctx.strokeStyle=clr;
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle=fillclr;
    ctx.arc(x,y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    ctx.font = "20px Times";
    if(number/10 >=1){
      ctx.fillText(number, x-9, y+5);    
    }
    else{
      ctx.fillText(number, x-5, y+5);    
    }
    ctx.closePath();
}
//distance between two points
function disPoint(x1,y1,x2,y2){
    var distanceX=Math.pow((x1-x2),2)
    var distanceY=Math.pow((y1-y2),2)
    return Math.sqrt(distanceX+distanceY);
    
}
//drawing arrowheads
function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var midx=(fromx+tox)/2
    var midy=(fromy+toy)/2
    var angle = Math.atan2(dy, dx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.moveTo(midx, midy);
    context.lineTo(midx - headlen * Math.cos(angle - Math.PI / 6), midy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(midx, midy);
    context.lineTo(midx - headlen * Math.cos(angle + Math.PI / 6), midy - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
  }
  function searchForArray(haystack, needle){
    var i, j, current;
    for(i = 0; i < haystack.length; ++i){
      if(needle.length === haystack[i].length){
        current = haystack[i];
        for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
        if(j === needle.length)
          return i;
      }
    }
    return -1;
  }
  function reverseArr(input) {
    var ret = new Array;
    for(var i = input.length-1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}
