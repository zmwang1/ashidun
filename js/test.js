//var ipConfig = "http://10.1.114.229:8081"; //测试
//var ipConfig = "http://10.30.80.149:8089"; //uat
 var ipConfig = "";
//var ipConfig = "http://10.1.114.179:8080"; //dev
jQuery.support.cors = true; //解决IE9以下 ajax请求发不出的问题
var goToTop = function() {
	$('.js-gotop').on('click', function(event) {
		console.log('test');
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $('html').offset().top
		}, 500);
		return false;
	});
	$(window).scroll(function() {
		var $win = $(window);
		if($win.scrollTop() > 200) {
			$('.js-top').addClass('active');
		} else {
			$('.js-top').removeClass('active');
		}
	});
};
var contentWayPoint = function() {
	var i = 0;
	$('.animate-box').waypoint(function(direction) {
		if(direction === 'down' && !$(this.element).hasClass('animated-fast')) {
			i++;
			$(this.element).addClass('item-animate');
			setTimeout(function() {
				$('body .animate-box.item-animate').each(function(k) {
					var el = $(this);
					setTimeout(function() {
						var effect = el.data('animate-effect');
						if(effect === 'fadeIn') {
							el.addClass('fadeIn animated-fast');
						} else if(effect === 'fadeInLeft') {
							el.addClass('fadeInLeft animated-fast');
						} else if(effect === 'fadeInRight') {
							el.addClass('fadeInRight animated-fast');
						} else if(effect === 'bounceIn') {
							el.addClass('swing animated');
						} else {
							el.addClass('fadeInUp animated-fast');
						}
						el.removeClass('item-animate');
					}, k * 200, 'easeInOutExpo');
				});
			}, 100);
		}
	}, {
		offset: '85%'
	});
};
$(function() {
	goToTop();
	contentWayPoint();
	var flag = GetQueryString('flag');
	/* if(flag=='loan'){
	     $(window).scrollTop($('#loan').offset().top);
	 }else if(flag=='maps'){
	     $(window).scrollTop('1080');
	 }else if(flag=='advance'){
	     $(window).scrollTop('206');
	 }/!*else{
	     $(window).scrollTop(0);
	 }*!/*/
});
function isPhone(value) {
	return /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
}
function isChinese(value) {
	return /[\u4e00-\u9fa5]/.test(value);
}
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return(r[2]);
	return null;
}
function add0(m) {
	return m < 10 ? '0' + m : m
}
function format(shijianchuo) {
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
function ajaxRequest(param, fn) { //公共的调接口函数
	$.ajax({
		type: "POST",
		url: ipConfig + "/api/DsWebsit/getDatas.action",
		data: param,
		dataType: "json",
		success: function(jsonResult) {
			console.log(param.type, jsonResult);
			if(jsonResult.code == "0000") {
				fn(jsonResult);
			} else {
				layer.msg("系统异常，请稍后再试！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			layer.msg("系统异常，请稍后再试！");
		}
	});
}
function getCityList(fn) {
	$.ajax({
		type: "POST",
		url: ipConfig + "/api/DsWebsit/getCityGroupList.action",
		dataType: "json",
		success: function(jsonResult) {
			if(jsonResult.code == "0000") {
				fn(jsonResult.data);
			} else {
				layer.msg("系统异常，请稍后再试！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			layer.msg("系统异常，请稍后再试！");
		}
	});
}

function getCompanyInfo(fn) {
	$.ajax({
		type: "POST",
		url: ipConfig + "/api/company/getCompanyInfoAll.action",
		dataType: "json",
		success: function(jsonResult) {
			if(jsonResult.code == "0000") {
				fn(jsonResult.data);
			} else {
				layer.msg("系统异常，请稍后再试！");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			layer.msg("系统异常，请稍后再试2！");
		}
	});
}

function getBanner(type) { //获取banner图片，生成轮播图
	ajaxRequest({
		type: type,
		page: "0",
		size: "4"
	}, function(jsonResult) {
		for(var i = 0; i < jsonResult.data.length; i++) {
			var targetLink = jsonResult.data[i].field1 ? jsonResult.data[i].field1 : jsonResult.data[i].imageLink;
			if(i == 0) {
				if(jsonResult.data.length > 1) {
					$('.carousel-indicators').append(' <li data-target="#carousel-example-generic" data-slide-to="' + i + '" class="active"></li>');
					$("#carousel-example-generic").append('<a class="left carousel-control my-carousel" href="#carousel-example-generic" role="button" data-slide="prev"><span class="icon-prev" aria-hidden="true"></span></a>');
					$("#carousel-example-generic").append('<a class="right carousel-control my-carousel" href="#carousel-example-generic" role="button" data-slide="next"><span class="icon-next" aria-hidden="true"></span></a>');
				}
				if(targetLink) { //如果有链接
					$('.carousel-inner').append('<div class="item active"> <a href="' + targetLink + '"><img src="' + ipConfig + jsonResult.data[i].imageSrc + '"></a></div>');
				} else {
					$('.carousel-inner').append('<div class="item active"> <img src="' + ipConfig + jsonResult.data[i].imageSrc + '"> </div>');
				}
			} else {
				$('.carousel-indicators').append(' <li data-target="#carousel-example-generic" data-slide-to="' + i + '" ></li>');
				if(targetLink) {
					$('.carousel-inner').append('<div class="item"> <a href="' + targetLink + '"><img src="' + ipConfig + jsonResult.data[i].imageSrc + '"></a> </div>');
				} else {
					$('.carousel-inner').append('<div class="item"> <img src="' + ipConfig + jsonResult.data[i].imageSrc + '"> </div>');
				}
			}
		}
	})
}
(function judgeNav() { //判断浏览器类型 自执行函数 所有页面均执行
	if(navigator.appVersion.match(/9./i) == "9.") {
		console.log("ie9删除动画效果");
		$(".animate-box").removeClass("animate-box").removeAttr("data-animate-effect");
	}
})()