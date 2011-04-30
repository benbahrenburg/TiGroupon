var tg ={win:Ti.UI.currentWindow};
(function(){

	tg.topContainer = Ti.UI.createView({
		top:0,
		height:50,
		width:Ti.Platform.displayCaps.platformWidth,
		layout:'horizontal',
		backgroundColor:'#fff'
	});
	tg.win.add(tg.topContainer);
				
	tg.mapview = Ti.Map.createView({
		top:50,
		bottom:0,
		mapType: Ti.Map.STANDARD_TYPE,
		region:{latitude:33.74511, longitude:-84.38993, latitudeDelta:0.5, longitudeDelta:0.5},
		animate:true,
		regionFit:true,
		userLocation:true
	});	
	tg.win.add(tg.mapview);
})();