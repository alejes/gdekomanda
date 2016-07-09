<?php
require "config.php";
require "libraries/router.php";
require "libraries/template.php";
require "kernel/general.php";

Router::route();

if (file_exists(ROUTE_CONTROLLER_PATH)){
    require(ROUTE_CONTROLLER_PATH);
}
else throw new Exception('00404');

$class = ROUTE_MODULE;
$controller = new $class();

if ( ! empty(Router::$action)) {
    $action_method = 'action_'. Router::$action;
    if (method_exists($controller, $action_method)) {
        $controller->$action_method();
    }
    else  throw new Exception('00404');
}
else {
    if (method_exists($controller, 'action_default')) {
        $controller->action_default();
    }else      throw new Exception('00404');
}

?>