var tg ={win:Ti.UI.currentWindow};
(function(){

	//create table view data object
	tg.data = [
		{title:'Login/Logout', hasChild:true, test:'../examples/facebook_login_logout.js'},
		{title:'Query', hasChild:true, test:'../examples/facebook_query.js'},
		{title:'Properties', hasChild:true, test:'../examples/facebook_properties.js'},
		{title:'Publish Stream', hasChild:true, test:'../examples/facebook_publish_stream.js'},
		{title:'Photos', hasChild:true, test:'../examples/facebook_photos.js'}

	];



	tg.topContainer = Ti.UI.createView({
		top:0,
		height:50,
		width:Ti.Platform.displayCaps.platformWidth,
		layout:'horizontal',
		backgroundColor:'#fff'
	});
	tg.win.add(tg.topContainer);
				
	tg.tableview = Titanium.UI.createTableView({
		data:tg.data
	});
	
	
	// create table view event listener
	tg.tableview.addEventListener('click', function(e)
	{
		if (e.rowData.test)
		{
			tg.win = Titanium.UI.createWindow({
				url:e.rowData.test,
				title:e.rowData.title
			});
			Titanium.UI.currentTab.open(tg.win,{animated:true});
		}
	});
	
	tg.win.add(tg.tableview);
})();





