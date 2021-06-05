const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

var row;
var col;
var buttons=[];
var order=[];
var click=0;
var route=[];
var flow=[];

document.getElementById('submit').addEventListener('click',function(evt){
    evt.preventDefault();
    buttons=[];
    order=[]
    ctx.clearRect(0,0,canvas.width,canvas.height);
    row=parseInt(document.getElementById('row').value)
    col=parseInt(document.getElementById('col').value)
    // console.log(row,col);
    drawButtons(row,col);
})
//drawing rows and columns of buttons
function drawButtons(r,c){
    var obj;
    num=1
    k=c+1
    l=r+1
    xpos=canvas.width/k 
    ypos=canvas.height/l
    
    for (var i=0;i<r;i++){
        for(var j=0;j<c;j++){
            drawCircles((j+1)*xpos,(i+1)*ypos,25,"black","white",num)
            obj={
                val:num,
                X:(j+1)*xpos,
                Y:(i+1)*ypos,
                clicked:false,
                order:0
            }
            buttons.push(obj);
            num++;
        }
    }
}
function redrawButton(){
    for(var i=0;i<buttons.length;i++){
        if(order.length>0 && buttons[i].val==order[0].val ){
            drawCircles(buttons[i].X,buttons[i].Y,25,"black","red",buttons[i].val);
        }
        else{
            drawCircles(buttons[i].X,buttons[i].Y,25,"black","white",buttons[i].val);
        }
    }
    
}
function drawArrows(){
    // console.log(route);
    var x1,y1,x2,y2,dx,dy,angle,dotted;
    var rad=25;
    for(var j=0;j<route.length;j++){
        for(var k=0;k<1;k++){
            x1=route[j][k].X
            y1=route[j][k].Y
            x2=route[j][k+1].X
            y2=route[j][k+1].Y;
            dx=x2-x1;
            dy=y2-y1;
            angle= Math.atan2(dy, dx);
            x1=x1+rad*Math.cos(angle);
            y1=y1+rad*Math.sin(angle);
            x2=x2-rad*Math.cos(angle);
            y2=y2-rad*Math.sin(angle);
            // console.log(x1,y1,x2,y2,angle);
            if(j%2==0){
                dotted=true;
            }
            else{
                dotted=false;
            }
            canvas_arrow(ctx,x1,y1,x2,y2,dotted)
        }
    }
}
function clickDetection(x,y){
    // console.log(click);
for(var i=0;i<buttons.length;i++){
    
    if(disPoint(buttons[i].X,buttons[i].Y,x,y)<=25){
        click++

        buttons[i].clicked=true;
        order.push(buttons[i]);
        
        if(click==2 && disPoint(order[0].X,order[0].Y,order[1].X,order[1].Y)<=25){
            click=0;
            order=[];
            console.log(route);
        }

        if(click==2){
            click=0;
            revOrder=reverseArr(order)
            if(searchForArray(route,order)==-1 && searchForArray(route,revOrder)==-1){
                route.push(order)
            }
            else{
                alert('wrong input')
            }
            order=[]    

        }


    }
}
console.log(click)
console.log(order);
console.log(route);

}

//delete all connections
function deleteAllConnections(){
    console.log("clicked");
    click=0
    order=[]
    route=[];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawArrows();
    redrawButton();
}

//button event listener
document.getElementById('delete').addEventListener('click',deleteAllConnections);

canvas.addEventListener('click',function(evt){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    clickDetection(evt.offsetX,evt.offsetY);   
    // console.log(order);
    drawArrows();
    redrawButton();
})
