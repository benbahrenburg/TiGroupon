String.prototype.trim = function() { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };

var tg = {win:Ti.UI.currentWindow,hasLocation:false};
(function(){
	if(Ti.App.myTools.isAndroid()){
		tg.vwHeader = Ti.UI.createView({id:'vwHeader'});		
		tg.win.add(tg.vwHeader);
	 	tg.headerLabel= Ti.UI.createLabel({text:'GroupR',id:'headerLabel'});
		tg.vwHeader.add(tg.headerLabel);
		tg.vwClose = Ti.UI.createView({
			width:50,
			height:30,
			backgroundColor:'#ebd077',
			right:5
		});		
		tg.vwHeader.add(tg.vwClose);
		
		tg.closeLabel= Ti.UI.createLabel({
			text:'Done',
			top:5,
			height:20,
			color:'#000',
			font:{fontWeight:'Bold'},
			textAlign:'center'
		});

		tg.vwClose.add(tg.closeLabel);

		tg.vwClose.addEventListener('click', function(e){
			tg.win.close();
		});
						
	}else{
		tg.closeIOS = Ti.UI.createButton({
			systemButton:Ti.UI.iPhone.SystemButton.DONE
		});		
		tg.win.RightNavButton=tg.closeIOS;
		tg.closeIOS.addEventListener('click', function(e){
			tg.win.close();
		});
	}
	
 	tg.AboutLabel= Ti.UI.createLabel({
		text:'GrouponR developed during Mobile Dev Camp NYC 2001 http://mobiledevcampnyc.com by Ben Bahrenburg, Ilya Zatulovskiy, Christelle Scharff, and Paul Fisher.\n\nGrouponR is powered by Appcelerator Titanium http://www.appcelerator.com.',
		top:Ti.App.myTools.isAndroid() ? 50 : 10,
		height:175,
		left:7,
		right:7,
		textAlign:'left',
		color:'#000'
	});

	tg.win.add(tg.AboutLabel);
		
})();