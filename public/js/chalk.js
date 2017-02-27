$(document).ready(chalkboard);

function chalkboard(){
	$('#chalkboard').remove();
  $('.chalk').remove();
  $('.body-board').prepend('<div class="panel-btn"><a class="link" target="_blank">Save</a></div>');
  $('.body-board').prepend('<img src="/img/bg.png" id="pattern" width=50 height=50>');
  $('.body-board').prepend('<canvas id="chalkboard"></canvas>');
  $('.body-board').prepend('<div class="chalk"></div>');
  $('.body-board').css({'width':'100%', 'height':'500px'});

	var brushDiameter = 7;
	var canvas = document.getElementById("chalkboard");
	canvas.width = $('.body-board').width();
	canvas.height = $('.body-board').height();
	var ctx = canvas.getContext("2d");

	var width = canvas.width;
	var height = canvas.height;
	var mouseX = 0;
	var mouseY = 0;
	var mouseD = false;
	var eraser = false;
	var xLast = 0;
	var yLast = 0;
	var eraserWidth = 50;
	var eraserHeight = 100;
	var offset = $("#chalkboard").offset();
	var dataTransfer = [];
	//var socket = io.connect('localhost:8890');

	$('#chalkboard').css('cursor','none');
	document.onselectstart = function(){ return false; };
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = brushDiameter;
	ctx.lineCap = 'round';

	var patImg = document.getElementById('pattern');

	document.addEventListener('touchmove', function(evt) {
        var touch = evt.touches[0];
        mouseX = touch.pageX - offset.left;
        mouseY = touch.pageY - offset.top;
        if (mouseY < height && mouseX < width) {
            evt.preventDefault();
            $('.chalk').css('left', mouseX + 'px');
            $('.chalk').css('top', mouseY + 'px');
            //$('.chalk').css('display', 'none');
            if (mouseD) {
                draw(mouseX, mouseY);
            }
        }
    }, false);

    document.addEventListener('touchstart', function(evt) {
        //evt.preventDefault();
        var touch = evt.touches[0];
        mouseD = true;
        mouseX = touch.pageX - offset.left;
        mouseY = touch.pageY - offset.top;
        xLast = mouseX;
        yLast = mouseY;
        draw(mouseX +1, mouseY + 1);
    }, false);

    document.addEventListener('touchend', function(evt) {
        mouseD = false;
    }, false);

    $('#chalkboard').css('cursor','none');
		ctx.fillStyle = 'rgba(255,255,255,0.5)';
		ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = brushDiameter;
		ctx.lineCap = 'round';

	$('.body-board').mousemove(function(evt){
		mouseX = evt.pageX - offset.left;
		mouseY = evt.pageY - offset.top;
		//console.log('X:'+mouseX+'y:'+mouseY);
		if(mouseY<height && mouseX<width){
			$('.chalk').css('left',(mouseX-0.5*brushDiameter)+'px');
			$('.chalk').css('top',(mouseY-0.5*brushDiameter)+'px');
			if(mouseD){
				if(eraser){
					erase(mouseX,mouseY);
				}else{
					draw(mouseX,mouseY);
					}
				}
		}else{
			$('.chalk').css('top',height-10);
			}
		});
	$('.body-board').mousedown(function(evt){
		mouseD = true;
		//console.log(mouseD);
		xLast = mouseX;
		yLast = mouseY;
		if(evt.button == 2){
			erase(mouseX,mouseY);
			eraser = true;
			$('.chalk').addClass('eraser');
		}else{
			if(!$('.panel-btn').is(':hover')){
				draw(mouseX+1,mouseY+1);
			}
		}
	});

	$('.body-board').mouseup(function(evt){
		mouseD = false;
		//console.log(mouseD);
		if(evt.button == 2){
			eraser = false;
			$('.chalk').removeClass('eraser');
		}
	});

	$(document).keyup(function(evt){
		if(evt.keyCode == 32){
			ctx.clearRect(0,0,width,height);
			layPattern();
		}
	});

	// $(document).keyup(function(evt){
	// 	if(evt.keyCode == 83){
	// 		changeLink();
	// 	}
	// });

	document.oncontextmenu = function() {return false;};

	function draw(x,y){
		ctx.strokeStyle = 'rgba(255,255,255,'+(0.4+Math.random()*0.2)+')';
		ctx.beginPath();
		ctx.moveTo(xLast - 15, yLast);
		ctx.lineTo(x - 15, y);
		ctx.stroke();

		dataTransfer[0] = x;
		dataTransfer[1] = y;
		dataTransfer[2] = xLast;
		dataTransfer[3] = yLast;
		dataTransfer[4] = user;
		//dataTransferJSON = JSON.stringify(dataTransfer);
		dataTransferJSON = dataTransfer;
		//console.log(dataTransferJSON);
		socket.emit('draw', dataTransferJSON);

		//console.log('x = '+x+', y = '+y+' , xLast = '+xLast+' , yLast = '+yLast);
  		// Chalk Effect
		var length = Math.round(Math.sqrt(Math.pow(x-xLast,2)+Math.pow(y-yLast,2))/(5/brushDiameter));
		var xUnit = (x-xLast)/length;
		var yUnit = (y-yLast)/length;
		for(var i=0; i<length; i++ ){
			var xCurrent = (xLast-15)+(i*xUnit);
			var yCurrent = yLast+(i*yUnit);
			var xRandom = xCurrent+(Math.random()-0.5)*brushDiameter*1.2;
			var yRandom = yCurrent+(Math.random()-0.5)*brushDiameter*1.2;
    	ctx.clearRect( xRandom, yRandom, Math.random()*2+2, Math.random()+1);
		}

		xLast = x;
		yLast = y;
	}

	function drawOnOtherClient(){
		ctx.strokeStyle = 'rgba(255,255,255,'+(0.4+Math.random()*0.2)+')';
		ctx.beginPath();
		ctx.moveTo(xLast - 15, yLast);
		ctx.lineTo(x - 15, y);
		ctx.stroke();

		//dataTransferJSON = JSON.stringify(dataTransfer);
		//console.log(dataTransferJSON);
		socket.emit('draw', dataTransferJSON);

		//console.log('x = '+x+', y = '+y+' , xLast = '+xLast+' , yLast = '+yLast);
  		// Chalk Effect
		var length = Math.round(Math.sqrt(Math.pow(x-xLast,2)+Math.pow(y-yLast,2))/(5/brushDiameter));
		var xUnit = (x-xLast)/length;
		var yUnit = (y-yLast)/length;
		for(var i=0; i<length; i++ ){
			var xCurrent = (xLast-15)+(i*xUnit);
			var yCurrent = yLast+(i*yUnit);
			var xRandom = xCurrent+(Math.random()-0.5)*brushDiameter*1.2;
			var yRandom = yCurrent+(Math.random()-0.5)*brushDiameter*1.2;
    	ctx.clearRect( xRandom, yRandom, Math.random()*2+2, Math.random()+1);
		}
	}

	function erase(x,y){
		ctx.clearRect (x-0.5*eraserWidth,y-0.5*eraserHeight,eraserWidth,eraserHeight);
	}

	$('.link').click(function(evt){

		$('.download').remove();

		var imgCanvas = document.createElement('canvas');
		var imgCtx = imgCanvas.getContext("2d");
		var pattern = imgCtx.createPattern(patImg,'repeat');

		imgCanvas.width = width;
		imgCanvas.height = height;

		imgCtx.fillStyle = pattern;
		imgCtx.rect(0,0,width,height);
		imgCtx.fill();


		var layimage = new Image;
		layimage.src = canvas.toDataURL("image/png");

		setTimeout(function(){

			imgCtx.drawImage(layimage,0,0);

			var compimage = imgCanvas.toDataURL("image/png");//.replace('image/png','image/octet-stream');

			$('.panel-btn').append('<a href="'+compimage+'" download="chalkboard.png" class="download">Download</a>');
			$('.download').click(function(){
				IEsave(compimage);
			});

		}, 500);


	});

	function IEsave(ctximage){
		setTimeout(function(){
			var win = window.open();
			$(win.document.body).html('<img src="'+ctximage+'" name="chalkboard.png">');
		},500);
	}

	$(window).resize(function(){
		// chalkboard();
	});

}
