<?php

/**
 * Модуль gdecomanda
 */

class index{

    
    public function action_default(){
		
		$hackatons = mysql_query("SELECT * FROM `hackatons`");
		
		$hackatons_list = fetch_mysql($hackatons);
		
		
        Template::display("header", array());
        Template::assign(array('hackaton_list' => $hackatons_list));
        Template::display("hackaton_list");
        Template::display("footer");

    }

}

?>