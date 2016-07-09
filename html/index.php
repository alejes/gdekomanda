<?php

/**
    * Запуск приложения в песочнице.
    * При возникновении ошибки или исключения запускается статическая страница.
*/
try{
    require 'sandbox.php';
}
catch(Exception $e){
    include 'error_page.html';
}

?>