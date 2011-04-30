var tg ={win:Ti.UI.currentWindow};
(function(){

	if(Ti.App.myTools.isAndroid()){
		tg.vwHeader = Ti.UI.createView({
			top:0,
			height:40,
			backgroundColor:'#76A045'
		});	
		
		tg.win.add(tg.vwHeader);
			
	 	tg.headerLabel= Ti.UI.createLabel({
			text:'TiGroupon',
			height:40,
			left:5,
			width:'auto',
			color:'#fff',
			font:{fontSize:24, fontWeight:'bold'},
			textAlign:'left'
		});

		tg.vwHeader.add(tg.headerLabel);
			
	}

	tg.vwMain = Ti.UI.createView({
		top: Ti.App.myTools.isAndroid() ? 40 : 0 ,
		left:0,
		right:0,
		bottom:0,
		layout:'vertical'
	});
	tg.win.add(tg.vwMain);
	
	tg.topContainer = Ti.UI.createView({
		top:0,
		height:50,
		width:Ti.Platform.displayCaps.platformWidth,
		layout:'horizontal',
		backgroundColor:'#fff'
	});
	tg.vwMain.add(tg.topContainer);


	tg.txtLocation = Titanium.UI.createTextField({
		value:'My Location Is',
		height:40,
		top:5,
		width:(Ti.Platform.displayCaps.platformWidth)-60,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	tg.topContainer.add(tg.txtLocation);
	
	
	tg.btnSearch = Ti.UI.createView({
		top:5,
		left:5,
		backgroundColor:'#000',
		height:40,
		width:50,
		borderRadius:Ti.App.myTools.isAndroid() ? 3 :5
	});
	

	tg.btnSearchImg = Ti.UI.createView({
		height:25,
		width:25,
		backgroundImage:'../Images/Buttons/light_search.png'
	});

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
		
})();