<?php

/**
    * Часто используемые функции
*/

function full_escape($str){
    return mysql_real_escape_string(htmlspecialchars($str, ENT_QUOTES));
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