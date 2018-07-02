<?php

	include "conn.php";
	
	$username=magic($_POST["username"]);
	$password=magic($_POST["password"]);
	
	$res = mysql_query("select count(*) from user where username='$username' and password='$password'");
	$row = mysql_fetch_row($res);
	$isok = $row[0];
	echo $isok;
	if($isok==1) {
		session_start();
		$_SESSION["isok"]="ok";
		header('Location:loginSuccess.html');
	}else {
		header('Location:userLogin.php?login=1');
	}
	
	
	
	function magic($str) {
		$str=trim($str);
		if(!get_magic_quotes_gpc()) {
			$str=addslashes($str);
		}
		return htmlspecialchars($str);
	}

?>