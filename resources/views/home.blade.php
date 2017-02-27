@extends('layouts.app')
@section('content')

<div class="container spark-screen">
    <div class="row">
        <div class="col-md-3">
            <div class="panel panel-default">
                <div class="panel-heading">User</div>
                <div class="panel-body">
                    <ul>
                        <li>Gary</li>
                        <li>Calvine</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="panel panel-default">
                <div class="panel-heading">Chat</div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-lg-11" >
                        <div id="messages"></div>
                        </div>
                        <div class="col-lg-11" >
                            <form action="{{route('sendmsg')}}" method="post">
                                <input type="hidden" name="_token" value="{{ csrf_token() }}" >
                                <input type="hidden" name="user" value="{{ Auth::user()->name }}" >
                                <div class="row">
                                    <div class="col-md-10 col-for-msg">
                                        <textarea class="form-control msg" name="message"></textarea>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="submit" value="Send" class="btn btn-success send-msg">
                                    </div>
                                </div>
                                <!-- <textarea class="form-control msg" name="message"></textarea>
                                <input type="submit" value="Send" class="btn btn-success send-msg"> -->
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-9 col-md-offset-3">
            <div class="body-board">
                <div class="chalk"></div>
                <canvas id="chalkboard"></canvas>
                <img src="/img/bg.png" id="patern" width="50px" height="50px">
            </div>
        </div>
    </div>
</div>

<!-- <script src="{{asset('/js/chalk.js')}}"></script> -->
@endsection

@section('script')
<script>
  var user = '{{ Auth::user()->name }}';
  /*
  $(document).ready(function(){
      var canvas = document.getElementById("chalkboard");
      canvas.width = $('#chalkboard').width();
      canvas.height = $('#chalkboard').height();
      var ctx = canvas.getContext("2d");
  });
  var brushDiameter = 7;

  var socket = io.connect('localhost:8890');
  socket.on('message', function (data) {
      data = jQuery.parseJSON(data);
      console.log(data.user);
      $( "#messages" ).append( "<strong>"+data.user+":</strong><p>"+data.message+"</p>" );
  });
  socket.on('draw', function(data){
      //var pdata = JSON.parse(data);
      console.log(data);
      //drawOnClient(data[0], data[1], data[2], data[3]);
      //draw(data.mouseX + 1, data.mouseY + 1);
      if(data[4] != user){
        drawOnClient(data[0], data[1], data[2], data[3]);
      }
  });

  function drawOnClient(x, y, xLast, yLast){
    console.log('drawOnClient');
    ctx.strokeStyle = 'rgba(255,255,255,'+(0.4+Math.random()*0.2)+')';
    ctx.beginPath();
    ctx.moveTo(xLast - 15, yLast);
    ctx.lineTo(x - 15, y);
    ctx.stroke();

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
  $(".send-msg").click(function(e){

      e.preventDefault();
      alert('send clicked');
      var token = $("input[name='_token']").val();
      var user = $("input[name='user']").val();
      var msg = $(".msg").val();
      //alert(token+" "+user+" "+msg);
      //alert('{!! URL::to("sendmessage") !!}');
      //alert('{{route("sendmsg")}}');
      if(msg != ''){
          $.ajax({
              type: "POST",
              url: 'api/sendmessage',
              dataType: "json",
              data: {'_token':token,'message':msg,'user':user},
              success:function(data){
                  $(".msg").val('');

              }
          });
      }else{
          alert("Please Add Message.");
      }
  })
*/
</script>
<script src="{{asset('/js/custom.js')}}"></script>
@endsection
