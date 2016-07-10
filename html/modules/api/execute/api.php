<?php

/**
 * Модуль gdecomanda
 */

class api{
	
	private static $cookieSalt = "jhyeuwiuoied8937YEULHDW7ufeyk,wjk.dl/cejf,jdmli.s;o'p";
	
	private static function getKey($password){
		return md5(self::$cookieSalt . $password . self::$cookieSalt);
	}
	
	private function checkAuthorisation(){
		if (empty($_COOKIE['auth_email']))return false;
		
		//$user = mysql_fetch_arrs
	}
	
    public function action_default(){
		
		
    }
	
	public function action_event(){
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, POST, PUT');
		header('Access-Control-Allow-Headers: Content-Type');
		$data = file_get_contents("php://input");
		$array = json_decode($data, true);
		
		switch($array['method']){
			case "PUT":
				$title = trim(full_escape($array['title']));
				$about = trim(full_escape($array['about']));
				$date = intval($array['date']);
				if (!empty($title) && !empty($about) && !empty($data)){
					mysql_query("INSERT INTO `hackatons` SET `title` = '".$title."', `about` = '".$about."', `date` = '".$date."'");
					echo json_encode(array("answer"=>mysql_insert_id()));
				}
				else{
					echo json_encode(array("answer"=>"-1"));
				}
			break;
			default:
				$hackatons = mysql_query("SELECT * FROM `hackatons`");
				$hackatons_list = fetch_mysql($hackatons);
				echo json_encode($hackatons_list);
			break;
		}
		
	}
	
	public function action_skills(){
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, POST, PUT');
		header('Access-Control-Allow-Headers: Content-Type');
		$data = file_get_contents("php://input");
		$array = json_decode($data, true);
		
		switch($array['method']){
			default:
			
			echo json_encode(fetch_mysql(mysql_query("SELECT * FROM `skills`")));
		}
	}
	
	public function action_profile(){
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, POST, PUT');
		header('Access-Control-Allow-Headers: Content-Type');
		$data = file_get_contents("php://input");
		$array = json_decode($data, true);
		
		
		$email = trim(full_escape($array['email']));
		$password = full_escape($array['password']);
		
		switch($array['method']){
			case "PUT":
				$name = trim(full_escape($array['name']));
				
				if (!empty($email) && email_check($email) && !empty($name) && !empty($password)){
					if (mysql_num_rows(mysql_query("SELECT * FROM `users` WHERE (`email`='".$email."')")) > 0){
						die(json_encode(array("answer"=>"FAIL_EMAIL_ALREADY_USED")));
					}
					mysql_query("INSERT INTO `users` SET `name` = '".$name."', `email`='".$email."', `password` = '".$password."'");
					die(json_encode(array("answer"=>"OK")));
				}
				else{
					die(json_encode(array("answer"=>"FAIL")));
				}
				break;
			default:
				if (!empty($email) && !empty($password) && 
					(mysql_num_rows(mysql_query("SELECT * FROM `users` WHERE ((`email`='".$email."') AND (`password` = '".$password."'))")) > 0)){
						setcookie ("auth_email", $email);
						setcookie ("auth_key", self::getKey($password));
						die(json_encode(array("answer"=>"OK")));
				}
				else{
					die(json_encode(array("answer"=>"FAIL_USER_NOT_FOUND")));
				}
		}
	}
	
	public function action_participant(){
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, POST, PUT');
		header('Access-Control-Allow-Headers: Content-Type');
		$data = file_get_contents("php://input");
		$array = json_decode($data, true);
		
		switch($array['method']){
			case "PUT":
				$title = trim(full_escape($array['title']));
				$about = trim(full_escape($array['about']));
				$date = intval($array['date']);
				if (!empty($title) && !empty($about) && !empty($date)){
					mysql_insert("INSERT INTO `hackatons` SET `title` = '".$title."', `about` = '".$about."', `date` = '".$date."'");
					echo json_encode(array("answer"=>mysql_insert_id()));
				}
				else{
					echo json_encode(array("answer"=>"0"));
				}
			break;
			default:
				$hackatons = mysql_query("SELECT * FROM `hackatons`");
				$hackatons_list = fetch_mysql($hackatons);
				echo json_encode($hackatons_list);
			break;
		}
	}
	
	
	public function action_ideaman(){
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, POST, PUT');
		header('Access-Control-Allow-Headers: Content-Type');
		$data = file_get_contents("php://input");
		$array = json_decode($data, true);
		
		switch($array['method']){
			case "PUT":
				$title = trim(full_escape($array['title']));
				$about = trim(full_escape($array['about']));
				$date = intval($array['date']);
				if (!empty($title) && !empty($about) && !empty($date)){
					mysql_insert("INSERT INTO `hackatons` SET `title` = '".$title."', `about` = '".$about."', `date` = '".$date."'");
					echo json_encode(array("answer"=>mysql_insert_id()));
				}
				else{
					echo json_encode(array("answer"=>"0"));
				}
			break;
			default:
				$hackatons = mysql_query("SELECT * FROM `hackatons`");
				$hackatons_list = fetch_mysql($hackatons);
				echo json_encode($hackatons_list);
			break;
		}
	}
	
}

?>