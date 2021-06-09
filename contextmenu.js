//positioning the right click menu
var clickCoords;
var clickCoordsX;
var clickCoordsY;
var menu = document.querySelector("#context-menu");
var contextMenuLinkClassName = "context-menu__link";
var contextMenuActive = "context-menu--active";
var contextMenuLinkClassName = "context-menu__link";
var taskItemInContext;
var menuWidth;
var menuHeight;
var windowWidth;
var windowHeight;
var menuState = 0;
var rSelect;

function getPosition(e) {
  var posx = 0;
  var posy = 0;

  if (!e) var e = window.event;
  
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  }
}

  /**
   * Turns the custom context menu on.
   */
   function toggleMenuOn() {
    if ( menuState !== 1 ) {
      menuState = 1;
      menu.classList.add( contextMenuActive );
    }
  }

/**
* Turns the custom context menu off.
*/
function toggleMenuOff() {
    if ( menuState !== 0 ) {
      menuState = 0;
      menu.classList.remove( contextMenuActive );
    }
}

function positionMenu(e) {
  clickCoords = getPosition(e);
  clickCoordsX = clickCoords.x;
  clickCoordsY = clickCoords.y;

  menuWidth = menu.offsetWidth + 4;
  menuHeight = menu.offsetHeight + 4;

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  if ( (windowWidth - clickCoordsX) < menuWidth ) {
    menu.style.left = windowWidth - menuWidth + "px";
  } else {
    menu.style.left = clickCoordsX + "px";
  }

  if ( (windowHeight - clickCoordsY) < menuHeight ) {
    menu.style.top = windowHeight - menuHeight + "px";
  } else {
    menu.style.top = clickCoordsY + "px";
  }
}


//detecting right click on a pipe
function rightClickDetect(e){
    console.log(buttons);
    for (var i=0;i<buttons.length;i++){
        buttons[i].rightClicked=false;
        if(disPoint(buttons[i].X,buttons[i].Y,e.offsetX,e.offsetY)<=25){
            buttons[i].rightClicked=true;
            rSelect=buttons[i].val;
            toggleMenuOn();
            positionMenu(e);        
        }
        
    }
}

// detecting right click on canvas
canvas.addEventListener('contextmenu',function(evt){
    evt.preventDefault();
    rightClickDetect(evt);
})

  /**
   * Listens for click events.
   */
    document.addEventListener( "click", function(e) {
      var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

      if ( clickeElIsLink ) {
        e.preventDefault();
        var option=clickeElIsLink.getAttribute("data-action");
        // console.log( ", Task action - " + clickeElIsLink.getAttribute("data-action"));
        if(option==="inlet"){
          if(!buttons[rSelect-1].inflow){
            buttons[rSelect-1].inlet=true;
            buttons[rSelect-1].outlet=false;
            buttons[rSelect-1].inter=false;
          }
          else{
            alert("Not possible")
          }
        }
        else if(option==="inter"){
            buttons[rSelect-1].inter=true;
            buttons[rSelect-1].outlet=false;
            buttons[rSelect-1].inlet=false;
        }
        else if(option==="outlet"){
          if(!buttons[rSelect-1].outflow){
            buttons[rSelect-1].outlet=true;
            buttons[rSelect-1].inter=false;
            buttons[rSelect-1].inlet=false;
          }
          else{
            alert("Not possible")
          }
        }
        toggleMenuOff();
        buttons[rSelect-1].rightClicked=false;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawArrows();
        redrawButton();
      }
    //  else {
    //     var button = e.which || e.button;
    //     if ( button === 1 ) {
    //       toggleMenuOff();
    //     }
    //   }
    });




