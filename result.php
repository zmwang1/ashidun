

<?php
	include "conn.php";
	header("Content-Type: text/html; charset=UTF-8");
	
	$username=magic($_POST["name"]);
	$mobile=magic($_POST["mobile"]);
	$content=magic($_POST["content"]);
	
	function magic($str) {
		$str=trim($str);
		if(!get_magic_quotes_gpc()) {
			$str=addslashes($str);
		}
		return htmlspecialchars($str);
	}
	
	
	$isok = mysql_query("insert into
	guestlist(username,mobile,content,adddate)
	values('$username','$mobile','$content','".date("Y-m-d")."')");
	
	if($isok) {
		header('Location:success.php');
	}else {
		echo "执行失败";
	}
?>
