function baiduMap(contentId,pointX,pointY,mapTitle,mapContent){
    function initMap(){
        createMap();
        setMapEvent();
        addMapControl();
        addMarker();
    }
    
   
    function createMap(){
        var map = new BMap.Map(contentId);//创建地图实例contentId:元素ID
        var point = new BMap.Point(pointX,pointY);//设置中心点坐标
        map.centerAndZoom(point,17);//地图初始化，同时设置地图展示级别
        window.map = map;
    }
    
    
    function setMapEvent(){
        map.enableDragging();//开启拖拽
        map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
        map.enableDoubleClickZoom();//启用鼠标双击放大
        map.enableKeyboard();//启用键盘操作
    }
    
    
    function addMapControl(){//添加控件
        //平移缩放控件
		var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
		map.addControl(ctrl_nav);
	    //缩略地图
		var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
		map.addControl(ctrl_ove);
	    //比例尺
		var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
		map.addControl(ctrl_sca);
    }
    
    
    var markerArr = [{title:mapTitle,content:mapContent,point:pointX+'|'+pointY,isOpen:1,icon:{w:23,h:25,l:46,t:21,x:9,lb:12}}];
	
	
	
    function addMarker(){//添加标注图标
        for(var i=0;i<markerArr.length;i++){
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0,p1);
			var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point,{icon:iconImg});
			var iw = createInfoWindow(i);
			var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
			marker.setLabel(label);
            map.addOverlay(marker);//将标注添加到地图中
            label.setStyle({
                        borderColor:"#808080",
                        color:"#333",
                        cursor:"pointer"
            });
			
			(function(){
				var index = i;
				var _iw = createInfoWindow(i);
				var _marker = marker;
				_marker.addEventListener("click",function(){
				    this.openInfoWindow(_iw);//打开信息窗口
			    });
			    _iw.addEventListener("open",function(){
				    _marker.getLabel().hide();
			    })
			    _iw.addEventListener("close",function(){
				    _marker.getLabel().show();
			    })
				label.addEventListener("click",function(){
				    _marker.openInfoWindow(_iw);
			    })
				if(!!json.isOpen){
					label.hide();
					_marker.openInfoWindow(_iw);
				}
			})()
        }
    }
   
    function createInfoWindow(i){//添加信息窗口
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
        return iw;
    }
    
    function createIcon(json){//创建图标
        var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
        return icon;
    }
    
    initMap();
}