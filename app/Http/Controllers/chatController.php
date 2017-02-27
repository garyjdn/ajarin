<?php

namespace App\Http\Controllers;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use LRedis;

class chatController extends Controller {
	public function __construct()
	{
		$this->middleware('guest');
	}
	public function sendMessage(Request $request){
		$redis = LRedis::connection();
		// echo "<pre>";
		// print_r($request->message);
		// echo "</pre>";
		// die();
		$message = ['message' => $request->message, 'user' => $request->user];
		$redis->publish('message', json_encode($message));
		return response()->json([]);
	}
}
