// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');

// Add in Ti.APP methods for isAndroid

function noNetworkAlert() {
    Ti.App.fireEvent('hide_indicator',{});
  	Ti.UI.createAlertDialog({
  	  title:Ti.Locale.getString('twitter_no_network_title'),
  	  message:Ti.Locale.getString('twitter_no_network_msg')
  	}).show();	
};

function isAndroid(){
	return (Ti.Platform.name == 'android');
};

// create tab group
var tabGroup = Titanium.UI.createTabGroup();
//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'TiGroupon',
    backgroundColor:'#ebd077',
    barColor:'#76A045'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});


tabGroup.addTab(tab1);  

// open tab group
tabGroup.open();
