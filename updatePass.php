<?php
// print_r('xxx');die;
	include "conn.php";
	$username=magic($_POST["username"]);
	// print_r($username);die;
	
	$mpass=magic($_POST["mpass"]);
	$newpass=magic($_POST["newpass"]);
	$renewpass=magic($_POST["renewpass"]);
	if($newpass!=$renewpass){
		print_r('密码不一样');die;
	}
	$user = mysql_query("select * from user where username='$username'");

	if(!$user){
		die('用户不存在');
	}
	// print_r($newpass);die;
	$res = mysql_query("update user set password='$newpass' where username='$username'");
	if($res){
		print_r('修改成功');die;
	}else{
		die("修改失败");
	}
	// print_r($res);
	// die;
	// $row = mysql_fetch_row($res);
	// $isok = $row[0];
	// echo $isok;
	// if($isok==1) {
	// 	session_start();
	// 	$_SESSION["isok"]="ok";
	// 	header('Location:loginSuccess.html');
	// }else {
	// 	header('Location:userLogin.php?login=1');
	// }
	
	
	
	function magic($str) {
		$str=trim($str);
		if(!get_magic_quotes_gpc()) {
			$str=addslashes($str);
		}
		return htmlspecialchars($str);
	}

?>