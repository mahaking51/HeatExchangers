const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

var row;
var col;
var buttons=[];
var order=[];
var click=0;
var route=[];
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
    for(var j=0;j<route.length;j++){
        for(var k=0;k<1;k++){
            canvas_arrow(ctx,route[j][k].X,route[j][k].Y,route[j][k+1].X,route[j][k+1].Y)
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
canvas.addEventListener('click',function(evt){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    clickDetection(evt.offsetX,evt.offsetY);   
    // console.log(order);
    redrawButton();
    drawArrows()
})