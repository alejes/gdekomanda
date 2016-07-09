<?php

/**
    * Простенький роутер запросов
*/

class Router {
    
    public static $segment1;
    public static $segment2;
    public static $segment3;
    
    public static $controller_exists = true;
    public static $controller_path;
    public static $controller_name;
    public static $action;
    public static $page;
    public static $module;
    
    private static $parse = array('segment1' => '', 'segment2' => '', 'segment3'=>'');
    /**
    * Парсинг строки запроса
    */
    
    public static function parse_query(){
        $query = substr($_SERVER['REQUEST_URI'], 1);
        $ex = explode('/', $query);
        global $_GET;
        $_GET['parametrs']=array();
        
        for ($i=0; $i<3; $i++){
            if (!isset($ex[$i])){ break;}
            elseif ((strpos($ex[$i], '?') === false)){
                self::$parse['segment'.($i+1)] = mb_strtolower($ex[$i]);
            }else{
                $glob = substr($ex[$i], 1);
                parse_str($glob, $output);
                foreach ($output AS $key=>$value){
                    $_GET[$key] = $value;
                }
                break;
            }
        }
        if (count($ex)>3){
            for ($i=3; $i<count($ex); $i++){
                $_GET['parametrs'][$i] = $ex[$i];
            }
        }
    }
    
    /**
    * Определение запрашиваемого модуля и сегмента
    */
    
    public static function route(){
        self::parse_query();
        
        if (self::_check_segments()){
            self::$segment1 = self::$parse['segment1'];
            self::$segment2 = self::$parse['segment2'];
            self::$segment3 = self::$parse['segment3'];
            
            if(empty(self::$segment1)) {
                if(file_exists(ROOT .'modules/index/execute/index.php')) {
                    self::$controller_path = 'modules/index/execute/index.php';
                    self::$controller_name = 'index';
                    self::$action = '';
                    self::$page = '';
                    self::$module = 'index';
                }
                else self::$controller_exists = FALSE;
            }
            elseif(!empty(self::$segment1) && !empty(self::$segment2)) {
                
                if(file_exists(ROOT .'modules/'. self::$segment1 .'/execute/'. self::$segment1 .'.php')) {
                    self::$controller_path = 'modules/'. self::$segment1 .'/execute/'. self::$segment1 .'.php';
                    self::$controller_name = self::$segment1;
                    self::$action = self::$segment2;
                    self::$page = '';
                    self::$module = self::$segment1;
                }
                else self::$controller_exists = FALSE;
            }
            # Если указан только 1 сегмент
            elseif(!empty(self::$segment1)) {
                if(file_exists(ROOT . 'modules/'. self::$segment1 .'/execute/'. self::$segment1 .'.php')) {
                    self::$controller_path = 'modules/'. self::$segment1 .'/execute/'. self::$segment1 .'.php';
                    self::$controller_name = self::$segment1;
                    self::$action = '';
                    self::$page = '';
                    self::$module = self::$segment1;
                }
                else {
					self::$controller_path = 'modules/index/execute/index.php';
                    self::$controller_name = 'index';
                    self::$action = '';
                    self::$page = '';
                    self::$module = 'index';
					self::$controller_exists = TRUE;
				}
            }
            else {
				if(file_exists(ROOT .'modules/index/execute/index.php')) {
                    self::$controller_path = 'modules/index/execute/index.php';
                    self::$controller_name = 'index';
                    self::$action = '';
                    self::$page = '';
                    self::$module = 'index';
					self::$controller_exists = TRUE;
                }
                else self::$controller_exists = FALSE;
			}
        }
        if(self::$controller_exists) {
                define('ROUTE_CONTROLLER_PATH', self::$controller_path);
                define('ROUTE_CONTROLLER_NAME', self::$controller_name);
                define('ROUTE_CONTROLLER_URL', self::$module . ((self::$action) ? '/'. self::$action :  '') . ((self::$page) ? '/'. self::$page :  ''));
                define('ROUTE_ACTION', self::$action);
                define('ROUTE_PAGE', self::$page);
                define('ROUTE_MODULE', self::$module);
            }
            elseif (!empty(self::$segment1)) {
                if (!empty(self::$segment2)){
                    if (is_numeric(self::$segment2)){
                        if (!empty(self::$segment3)){
                            self::$action = self::$segment3;
                        }
                        else{
                            self::$action = "showThread";
                        }
                    }else{
                        self::$action = self::$segment2;
                    }
                }
                else{
                    self::$action = "showBoard";
                }
                define('ROUTE_CONTROLLER_PATH', ROOT . 'modules/index/execute/index.php');
                define('ROUTE_CONTROLLER_NAME', 'index');
                define('ROUTE_CONTROLLER_URL', self::$segment1);
                define('ROUTE_ACTION', self::$action);
                define('ROUTE_SEGMENT', self::$segment2);
                define('ROUTE_PAGE', self::$segment3);
                define('ROUTE_MODULE', 'index');
                define('ROUTE_LOGIN', self::$segment1);
            }else    throw new Exception('00404');//;
    }
    /**
    * Проверка правильности сегментов
    */
    protected static function _check_segments() {
        $check_segments = true;
        if(!empty(self::$parse['segment1'])) {
            if(preg_match('~^[0-9a-z_-]*$~', self::$parse['segment1'])) self::$segment1 = self::$parse['segment1'];
            else $check_segments = false;
        }
        if(!empty(self::$parse['segment2'])) {
            if(preg_match('~^[0-9a-z_-]*$~', self::$parse['segment2'])) self::$segment2 = self::$parse['segment2'];
            else $check_segments = false;
        }
        if(!empty(self::$parse['segment3'])) {
            if(preg_match('~^[0-9a-z_-]*$~', self::$parse['segment3'])) self::$segment3 = self::$parse['segment3'];
            else $check_segments = false;
        }
        
        if(!$check_segments) throw new Exception('00493');
        return true;
    }
    
};