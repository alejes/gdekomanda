<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/**
    * Создание файла паролей по умолчанию при первоначальной установке
*/
if (!file_exists('password.php')){
    copy('password.sample.php', 'password.php');
}
require('password.php');


define ('ROOT', __DIR__ .'/');
define ('STATIC_DIR', 'static');


$link = @mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD)
    or die("Could not connect: " . mysql_error());

mysql_select_db(MYSQL_DB, $link) or die ('Can\'t connect to database : ' . mysql_error());

mysql_set_charset('utf8',$link);

mb_internal_encoding('UTF-8');


?>