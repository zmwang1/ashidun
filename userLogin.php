<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="renderer" content="webkit" />
		<title>登录页面</title> 
		<meta name="keywords" content="汇集金融精英，发挥专业优势">
		<meta name="description" content="深圳亿升金融服务有限公司作为国内知名金融信息咨询服务机构，
			汇集银行、证券、基金、信托等业界精英，深度钻研于各金融领域。 贯彻和落实国家和地方政府相关政策与制度，
			发挥专业机构优势，促进城市发展与金融的高度融合。"> 
		<link href="bootstrap/css/bootstrap.css" rel="stylesheet"/> 
		<link href="css/yisheng.css" rel="stylesheet"/>
	</head>
	<body>
		<div class="big-container">
			<div class="container">
				<div class="index-box-contactus">
					<div class="box-title">
						<span class="box-title-line"></span>
						<h3>login</h3>
						<h2>
							管理员<strong>登录</strong>
						</h2>
					</div>
					<div class="row contactus-list">
						<div class="col-lg-6 col-xs-6">
							<img src="img/contactus-map.png" alt="联系我们-地图"/>
						</div>
						<div class="col-lg-6 col-xs-6 login-right">
							<form action="login.php" enctype="multipart/form-data" method="post">
								<input type="hidden" name="action" value="post"/>
								<input type="hidden" name="diyid" value="1"/>
								<input type="hidden" name="do" value="2"/>
								<label>登录</label>
								<?php
									error_reporting(E_ALL || ~E_NOTICE);
									
									$login = $_GET["login"];
									if($login == 1) {
										echo '<div id="mobile_res">用户名或密码错误</div>';
									}
								?>
								<input type="text" name="username" id="username" placeholder="用户名" required="required"/>
								<input type="password" name="password" id="password" placeholder="密码" required="required" />
								<input type="submit" value="登录"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
