String.prototype.trim = function() { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };

var tg = {win:Ti.UI.currentWindow,hasLocation:false};
(function(){
	Ti.include('main_cdx.js','../Lib/grouponAdapter.js','../config.js');
	tg.grouponLookup = new fetchGroupon(tg.config.apiKey);
	tg.infoIOS = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.INFO_LIGHT
	});
	tg.btnList = Titanium.UI.createButton({
		image:'../Images/Buttons/light_list.png',
		width:30,
		height:30,
		right:5
	});

	tg.btnGlobe = Titanium.UI.createButton({
		image:'../Images/Buttons/light_globe.png',
		width:30,
		height:30,
		right:5,
		visible:false
	});
		
	if(Ti.App.myTools.isAndroid()){
		tg.vwHeader = Ti.UI.createView({id:'vwHeader'});		
		tg.win.add(tg.vwHeader);
			
	 	tg.headerLabel= Ti.UI.createLabel({text:'GroupR',id:'headerLabel'});
		tg.vwHeader.add(tg.headerLabel);
		tg.vwHeader.add(tg.btnList);
		tg.vwHeader.add(tg.btnGlobe);
			
	}else{

		tg.win.LeftNavButton=tg.infoIOS;		
		tg.win.RightNavButton=tg.btnList;
	}
	
	tg.vwMain = Ti.UI.createView({
		top: Ti.App.myTools.isAndroid() ? 40 : 0 ,
		id:'vwMain'
	});
	tg.win.add(tg.vwMain);
	
	tg.topContainer = Ti.UI.createView({
		width:Ti.Platform.displayCaps.platformWidth,
		id:'topContainer'
	});
	tg.vwMain.add(tg.topContainer);


	tg.txtLocation = Titanium.UI.createTextField({
		value:'My Location Is',
		height:40,
		top:5,
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		width:(Ti.Platform.displayCaps.platformWidth)-60,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType:Ti.UI.RETURNKEY_SEARCH
	});

	tg.topContainer.add(tg.txtLocation);
	
	tg.btnSearch = Ti.UI.createView({
		borderRadius:Ti.App.myTools.isAndroid() ? 3 :5,
		id:'btnSearch'
	});
	
	tg.btnSearchImg = Ti.UI.createView({id:'btnSearchImg'});
	tg.btnSearch.add(tg.btnSearchImg);		
	tg.topContainer.add(tg.btnSearch);
		
	tg.mapview = Ti.Map.createView({
		height:((Ti.Platform.displayCaps.platformHeight)-(Ti.App.myTools.isAndroid() ? 100 : 50)),
		left:0,
		right:0,
		bottom:0,
		mapType: Ti.Map.STANDARD_TYPE,
		region:{latitude:33.74511, longitude:-84.38993, latitudeDelta:0.5, longitudeDelta:0.5},
		animate:true,
		regionFit:true,
		userLocation:true
	});	
	tg.vwMain.add(tg.mapview);
	
	tg.tableview = Ti.UI.createTableView({
		data:[
			{title:'hello1'},
			{title:'hello2'},			
			{title:'hello3'}				
		],
		top:80,
		left:0,
		right:0,
		height:0,
		visible:false
	});
	tg.win.add(tg.tableview);
	
	if (Ti.Geolocation.hasCompass){
		//  TURN OFF ANNOYING COMPASS INTERFERENCE MESSAGE
		Ti.Geolocation.showCalibration = false;
	}

	if (Ti.Geolocation.locationServicesEnabled){	
			Ti.App.fireEvent('show_indicator');
			Ti.Geolocation.purpose = "Determine your for deals";
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
			Ti.Geolocation.preferredProvider = "gps";		
			Ti.Geolocation.distanceFilter = 100;
			Ti.Geolocation.getCurrentPosition(tg.locationChangeCallback); //Call to set baseline
	}
	
	Ti.include('main_evt.js');
	
if(Ti.App.myTools.isAndroid()){
		Ti.Android.currentActivity.onCreateOptionsMenu = function(e) {
	    var menu = e.menu;

			var mAboutAp = menu.add({title: 'About GroupR'});
		    mAboutAp.addEventListener("click", function(e) {
				var wAbout = Ti.UI.createWindow({  
				    title:'About GroupR',
				    backgroundColor:'#ebd077',
				    barColor:'#76A045',
				    tabBarHidden:true,
					url:'about_ui.js',
					fullscreen:false,
					navBarHidden : true
				});

				wAbout.open();
		    });
		};
	}
	
})();