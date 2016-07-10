<?php

/**
 * Модуль gdecomanda
 */

class api{
	
	private static $cookieSalt = "jhyeuwiuoied8937YEULHDW7ufeyk,wjk.dl/cejf,jdmli.s;o'p";
	
	private static function getKey($password){
		return md5(self::$cookieSalt . $password . self::$cookieSalt);
	}
	
	private static function apiFailedExit($text){
		header('Status: 400 Bad Request', false, 400);
		die($text);
	}
	
	
	private static function checkAuthorisation(){
		if (!isset($_COOKIE['auth_email']))return false;
		if (!isset($_COOKIE['auth_key']))return false;
		
		echo "isset_ok";
		
		$email = trim(full_escape($_COOKIE['auth_email']));
		$key = trim(full_escape($_COOKIE['auth_key']));
		if (empty($email) || empty($key))return false;
		
		echo "empty_ok";
		
		$user = mysql_fetch_array(mysql_query("SELECT * FROM `users` (`email` = '".$email."')"));
		
		var_dump($user);
		
		if (empty($user['password']))return false;
		
		echo "empty_user_ok";
		
		return self::getKey($user['password']) == $key;
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
					self::apiFailedExit(json_encode(array("answer"=>"-1")));
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
						self::apiFailedExit(json_encode(array("answer"=>"FAIL_EMAIL_ALREADY_USED")));
					}
					
					$skills = array();
					foreach ($array['skills'] AS $value){
						$skills[] = intval($value);
					}
					
					
					$skills_String = ';' . implode($skills, ';') . ';';
					
					
				
					mysql_query("INSERT INTO `users` SET `name` = '".$name."', `email`='".$email."', `password` = '".$password."', `skills` = '".$skills_String."'");
					setcookie ("auth_email", $email);
					setcookie ("auth_key", self::getKey($password));
					die(json_encode(array("answer"=>"OK")));
				}
				else{
					self::apiFailedExit(json_encode(array("answer"=>"FAIL")));
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
					self::apiFailedExit(json_encode(array("answer"=>"FAIL_USER_NOT_FOUND")));
				}
		}
	}
	
	public function action_participant(){
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, POST, PUT');
		header('Access-Control-Allow-Headers: Content-Type');
		$data = file_get_contents("php://input");
		$array = json_decode($data, true);
		
		if (!self::checkAuthorisation()){
			self::apiFailedExit(json_encode(array("answer"=>"FAIL_NOT_AUTH")));
		}
		
		switch($array['method']){
			case "PUT":
				$id = trim(full_escape($array['id']));
				if (mysql_num_rows(mysql_query("SELECT * FROM `hackatons` WHERE (`id` = '".$id."')")) <= 0){
					
					self::apiFailedExit(json_encode(array("answer"=>"FAIL_HACKATON_NOT_FOUND")));
				}
				
				$email = trim(full_escape($_COOKIE['auth_email']));
		
				$user = mysql_fetch_array(mysql_query("SELECT * FROM `users` (`email` = '".$email."')"));
				
				if (mysql_num_rows(mysql_query("SELECT * FROM `participant` WHERE ((`hackaton_id` = '".$id."') AND (`user_id` = '".$user['id']."'))")) > 0){
					self::apiFailedExit(json_encode(array("answer"=>"FAIL_USER_ALREADY_REGISTERED")));
				}
				
				mysql_query("INSERT INTO `participant` SET `hackaton_id` = '".$id."', `user_id` = '".$user['id']."'");
				die(json_encode(array("answer"=>"OK")));
			break;
			default:
		}
	}
	
	
	public function action_capitan(){
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, POST, PUT');
		header('Access-Control-Allow-Headers: Content-Type');
		$data = file_get_contents("php://input");
		$array = json_decode($data, true);
		
		if (!self::checkAuthorisation()){
			self::apiFailedExit(json_encode(array("answer"=>"FAIL_NOT_AUTH")));
		}
		
		switch($array['method']){
			case "PUT":
				$title = trim(full_escape($array['title']));
				$hackaton_id = intval($array['hackaton_id']);
				$description = trim(full_escape($array['description']));
				
				$skills = array();
				foreach ($array['skills'] AS $value){
					$skills[] = intval($value);
				}
				
				
				$skills_String = ';' . implode($skills, ';') . ';';
				
				$user = mysql_fetch_array(mysql_query("SELECT * FROM `users` (`email` = '".$email."')"));
				
				mysql_insert("INSERT INTO `capitans` SET `hackaton_id`='".$hackaton_id."', `user_id`='".$user['id']."', `title` ='".$title."', `description` ='".$description."', `skills` ='".$skills_String."'");
				
				die(json_encode(array("answer"=>mysql_insert_id())));
				
			break;
			default:
		}
	}
	
}

?>