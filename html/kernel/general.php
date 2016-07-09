<?php

/**
    * Часто используемые функции
*/

function full_escape($str){
    return mysql_real_escape_string(htmlspecialchars($str, ENT_QUOTES));
}

function email_check($email) {
	return preg_match("/^(?:[a-z0-9]+(?:[-_.]?[a-z0-9]+)?@[a-z0-9_.-]+(?:\.?[a-z0-9]+)?\.[a-z]{2,5})$/i",trim($email));
}

function fetch_mysql($data){
	$result = array();
	while($res = mysql_fetch_assoc($data)){
		$result[] = $res;
	}
	return $result;
}


function redirect($url){
    header("Location: ".$url);
}

?>