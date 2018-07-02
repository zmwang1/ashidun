<?php
	include "conn.php";
	header("Content-Type: text/html; charset=UTF-8");
	
	session_start();
	if($_SESSION["isok"]!="ok"){
		
		header('Location:userLogin.php');
	}
	$pagesize = 4;//一页显示的数量
	$result = mysql_query("select count(*) from guestlist");
	$row = mysql_fetch_row($result);
	$infoCount = $row[0];
	
	$pageCount = ceil($infoCount/$pagesize);//一共多少页
	
	$currpage = empty($_GET["page"])?1:$_GET["page"];//当前页
	if($currpage > $pageCount) {
		$currpage = 1;
	}
	
	$res = mysql_query("select * from guestlist limit ".($currpage-1)*$pagesize.",".$pagesize);
?>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="renderer" content="webkit">
    <title></title>  
    <link rel="stylesheet" href="css/pintuer.css">
    <link rel="stylesheet" href="css/admin.css">
    <script src="js/jquery.js"></script>
    <script src="js/pintuer.js"></script>  
</head>
<body>

  <div class="panel admin-panel">
    <div class="panel-head"><strong class="icon-reorder"> 留言管理</strong></div>
    <table class="table table-hover text-center">
    	<tr>
	        <th>姓名</th>       
	        <th>电话</th>
	        <th width="25%">内容</th>
	        <th width="120">留言时间</th>
	        <th>操作</th>       
      	</tr>      
    <?php
				while($row=mysql_fetch_array($res)) {
					echo '<tr>
				        <td>'.$row["username"].'</td>
				        <td>'.$row["mobile"].'</td>       
				        <td>'.$row["content"].'</td>
				        <td>'.$row["adddate"].'</td>
				        <td><a class="delword" href="del.php?id='.$row["id"].'">删除</a></td>
       		 			</tr>';
					
				}
				
	?>
    <td colspan="8"><div class="pagelist"> 
      	<?php
			
				for($i=1; $i <= $pageCount; $i++) {
					if($i == $currpage) {
						echo "<span class='current'>$i</span>";
					}else {
						echo "<a href='?page=$i'>$i</a>";
					}
				}
		?>
        
        
      </div>
      </td>
      </tr>
    </table>
  </div>


</body></html>