<?php

/**
 * Модуль gdecomanda
 */

class index{

    
    public function action_default(){
		
		$hackatons = mysql_query("SELECT * FROM `hackatons`");
		
		$hackatons_list = fetch_mysql($hackatons);
		
		
        Template::display("main", array());

    }

}

?>