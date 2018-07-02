<?php

	include "conn.php";
	session_start();
	if($_SESSION["isok"]!="ok"){
		header('Location:userLogin.php');
	}
	$id = $_GET["id"];
	$result= mysql_query("delete from guestlist where id=$id");
	
	if($result==1) {
		header('Location:book.php');
	}

?>