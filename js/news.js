

			$(function() {
				console.log(1111);
				setMsg(sessionStorage.onPage1);
				console.log(sessionStorage.onPage1+";;;;;;");
			});

			if(sessionStorage.onPage1 == undefined){
				sessionStorage.onPage1=0;
			}
			var size = 6;

			function setMsg(i) {
				$.get("../news.json",function(jsonResult){
						var reportList = jsonResult.data.list;
						setNews(reportList,i,size);
						console.log(i+"66666");
						pages(Math.ceil(jsonResult.data.total / size), i, size);
						console.log(i+"88888");
				});
			}

			function setNews(reportList,index,size){
				$(".report-list").empty();
				console.log(index+"size="+size);
				console.log(reportList.length);
				for(var i=0;i<reportList.length&&i<size&&i<(reportList.length-index*size);i++){
					if(parseInt( reportList[size*index+i].status )== 2){
						var oNewsCard = $("<div class='news-card'></div>");
						var data = reportList[size*index+i].baseContent;
						var oDiv = $("<div class='news-card_div'>" +reportList[size*index+i].baseContent+ "</div>");
						var oImg = $("<a class='news_list_show' href='javascript:void(0)' onclick='showNews(this.parentNode.parentNode.childNodes["+i*2+"])'><img src='" + reportList[size*index+i].imageSrc +"'/></a>");
						var oNewsCardBottom = $('<div class="news-card-right"></div>').append('<h3 class="summarize-title">' +reportList[size*index+i].title + '</h3>').append('<p class="summarize-content">' 
						+ reportList[size*index+i].subTitle + '</p>').append('<a class="news_list_show news_list_a" href="javascript:void(0)" onclick="showNews(this.parentNode.parentNode.parentNode.childNodes['+i*2+'])">阅读全文</a>').append('<p class="news-time"><span class="news-time-icon"></span>'+ reportList[size*index+i].publishDate + '</p>');
						oNewsCard.append(oImg).append(oNewsCardBottom);
						$(".report-list").append(oDiv);
						$(".report-list").append(oNewsCard);
						console.log(oImg);
					}
				}				
			}
			
			function showNews(i) {
				$(".report-list").empty();
				$('.pagination').empty();
				var data = $(i);
				console.log(9999999999);
				var oDiv = $("<div class='news_list_cont_first'>" +data.context.innerHTML+ "</div>");
				$(".new_list_cont").append(oDiv);
				var oA = $("<a class='news_list_cont_a' href='#'>&gt详情</a>");
				$(".news_list_link").append(oA);
			}

			function pages(totalPage) {
				$('.pagination').empty();
				for(var i = 0; i < totalPage; i++) {
					if(i == sessionStorage.onPage1) {
						$('.pagination').append('<li class="active"><a href="javascript:void(0)">' + (i + 1) + '</a></li>');
					} else {
						$('.pagination').append('<li><a href="javascript:void(0)" onclick="pageClick(this)">' + (i + 1) + '</a></li>');
					}
				}
			}

			function pageClick(othis, f) {
				sessionStorage.onPage1 = $(othis).text() - 1;
				setMsg(sessionStorage.onPage1);
				
			}
		