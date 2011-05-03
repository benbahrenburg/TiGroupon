tg.btnSearch.addEventListener('click', function(){
	Ti.Geolocation.getCurrentPosition(tg.locationChangeCallback); //Call to set baseline
});

tg.txtLocation.addEventListener('return', function(){
	tg.uiAddLookup();
});

tg.mapview.addEventListener('click', function(evt) {
	var dealUrl='';
	if(Ti.App.myTools.isAndroid()){
		//Properties are different on Android so 
		//lookup using pin title
		dealUrl=tg.getUrlFromDeals(evt.title);
	}else{
	    //is rightbutton clicked?
	    if (evt.clicksource == 'rightButton') {
			dealUrl=evt.annotation.dealUrl;
	    }		
	}

	tg.visitDeal(dealUrl);
});


tg.btnList.addEventListener('click', function(evt) {
	tg.tableview.top=Ti.App.myTools.isAndroid() ? 90 :50;
	tg.tableview.height=((Ti.Platform.displayCaps.platformHeight)-(Ti.App.myTools.isAndroid() ? 90 : 40));
	tg.tableview.visible=true;
	tg.win.RightNavButton=tg.btnGlobe;
	tg.btnList.visible=false;
	tg.btnGlobe.visible=true;
});

tg.btnGlobe.addEventListener('click', function(evt) {
	tg.win.RightNavButton=tg.btnList;
	tg.tableview.height=0;
	tg.tableview.visible=false;
	tg.btnList.visible=true;
	tg.btnGlobe.visible=false;
});

tg.tableview.addEventListener('click', function(e){
	tg.visitDeal(e.rowData.detailUrl);
});

tg.infoIOS.addEventListener('click', function(e){
	var wAbout = Ti.UI.createWindow({  
	    title:'About GroupR',
	    backgroundColor:'#ebd077',
	    barColor:'#76A045',
	    tabBarHidden:true,
		url:'about_ui.js',
		fullscreen:false,
		navBarHidden : (Ti.Platform.name == 'android') 
	});

	wAbout.open({modal:true});
});
