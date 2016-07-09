<?php

/**
    * Простенький шаблонизатор
*/
class Template{
    
    public static $vars = array();
    public static $template_file;
    
    public static function assign($param1) {
        if(is_array($param1)) {
            foreach($param1 AS $key => $value) {
                self::$vars[$key] = $value;
            }
            return TRUE;
        }
        return FALSE;
    }

    
    private static function load($str, $arr){
        self::assign($arr);
        if (file_exists(ROOT. 'templates/'. $str . '.tpl')){
            self::$template_file  = ROOT. 'templates/'. $str . '.tpl';
        }
        else if (file_exists(ROOT. ROUTE_MODULE . '/execute/'. $str . '.tpl')){
            self::$template_file = ROOT. ROUTE_MODULE . '/execute/'. $str . '.tpl';
        }
        else throw new Exception('00563');
        
        extract(self::$vars, EXTR_REFS);
        
        ob_start();
        include(self::$template_file);
        $page_content = ob_get_clean();
        return $page_content;
    }
    
    public static function display($str, $arr = array()){
        echo self::load($str, $arr);
        self::$vars = array();
    }
}