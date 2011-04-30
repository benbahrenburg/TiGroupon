// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#fff');

// Add in Ti.APP methods for isAndroid

Ti.App.myTools ={};
Ti.App.myTools = {
	isAndroid : function(){
		return (Ti.Platform.name == 'android');
	},
	noNetworkAlertMsg : function(){
	  	Ti.UI.createAlertDialog({
	  	  title:'No Network',
	  	  message:'Unable to find a network, please try again'
	  	}).show();		
	},
	customMsg : function(inputTitle,inputMsg){
	  	Ti.UI.createAlertDialog({
	  	  title:inputTitle,
	  	  message:inputMsg
	  	}).show();		
	}
};

// create tab group
var tabGroup = Ti.UI.createTabGroup();
//
// create base UI tab and root window
//
var wMain = Ti.UI.createWindow({  
    title:'TiGroupon',
    backgroundColor:'#ebd077',
    barColor:'#76A045',
    tabBarHidden:true,
	url:'Modules/main_ui.js',
	navBarHidden : (Ti.Platform.name == 'android') 
});

if(Ti.Platform.name!='android'){
	var tab1 = Ti.UI.createTab({window:wMain});
	tabGroup.addTab(tab1);  
	// open tab group
	tabGroup.open();	
}else{
	wMain.open();
}

