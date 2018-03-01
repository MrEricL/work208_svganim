
var s = document.getElementById('not_canvas');


var stop = document.getElementById("stop");

var clear = document.getElementById("clear");

var dvd = document.getElementById("dvd");
var size = document.getElementById("size");


//0 true
//1 false
var mode = true;


//vars
var big = true; //if growing or not
var requestID;
var rad = 20; //original circ radius

var maxRad = 250; 

var xcor = 250;
var ycor = 250;
var width = 50;
var height = 25;

var xinc = 3;
var yinc = 3;
var angle = Math.random()*Math.PI*2;


//Clears Stuff
var clearAll = function(e){

	while (s.lastChild) {
        s.removeChild(s.lastChild);
    }
    r = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    r.setAttribute('width','500');
    r.setAttribute('height','500');
    r.setAttribute('stroke-width','1');
    r.setAttribute('stroke','green');
    r.setAttribute('fill','white');
    s.appendChild(r)
    
}

var reset = function(e){
	rad = 20;
	xcor = 250;
	ycor = 250;
	xinc = 3;
	yinc = 3;
	angle = Math.random()*Math.PI*2;
	stopit();
	clearAll();
}

clear.addEventListener("click",reset);

//Stops the animation
var stopit = function(){
    clearInterval(requestID)

};

stop.addEventListener('click',stopit)


var changeDVD = function(e){
	rad = 30;
	reset();
	window.mode = false;
	console.log(mode);
}

dvd.addEventListener('click',changeDVD)

var changeSize = function(e){
	reset();
	window.mode = true;
}

size.addEventListener('click',changeSize)


//DRAWS THE CIRCLE


var draw_circ = function(e){
	
	stopit();

	var draw = function(){
		clearAll();


	    c = document.createElementNS("http://www.w3.org/2000/svg", 'circle')
	    c.setAttribute('r',rad)
	    c.setAttribute('fill','yellow')
	    c.setAttribute('cx',250)
	    c.setAttribute('cy',250)
	    s.appendChild(c)  


	    if (big){
	    	rad++;
	    	if (rad>=maxRad){
    			big = false;
    		}
	    }
	    else{
	    	rad--;
	    	if (rad==0){
	    		big = true;
	    	}
	    }
  
	};
	requestID = setInterval(draw,10);
};


//DOES THE DVD BOUNCE

var dvdBounce = function (e) {

	stopit();
	var draw = function() {
		clearAll();

	    r = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	    r.setAttribute('width',width);
	    r.setAttribute('height',height);
	    r.setAttribute('fill','red');
	    r.setAttribute('x',xcor);
	    r.setAttribute('y',ycor);
	    s.appendChild(r)


		if ((xcor+width)>=500 || (xcor-rad) <= -20){
			xinc*=-1;
		}
		if ((ycor+height)>=500 || (ycor-rad)<= -height){
			yinc*=-1;
		}

		xcor+=(xinc*(Math.abs(Math.cos(angle))));
		ycor+=(yinc*(Math.abs(Math.sin(angle))));

	}
	requestID = setInterval(draw,10);
}

//SVG click action
clickAction = function(e){
	if (mode){
		draw_circ(e);
	}
	else{
		dvdBounce(e);
	}
}

s.addEventListener('click',clickAction)