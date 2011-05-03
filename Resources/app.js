// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#fff');
var indicatorShowing = false;
// Add in Ti.APP methods for isAndroid
Ti.App.myTools ={};
Ti.App.myTools = {
	isAndroid : function(){
		return (Ti.Platform.name == 'android');
	},
	isEmpty : function(value){
		if(value==undefined){
			return true;
		}else{
			return (value.trim().length==0);
		}
	}
};

// create tab group
var tabGroup = Ti.UI.createTabGroup();
//
// create base UI tab and root window
//
var wMain = Ti.UI.createWindow({  
    title:'GroupR',
    backgroundColor:'#ebd077',
    barColor:'#76A045',
    tabBarHidden:true,
	url:'Screens/main_ui.js',
	fullscreen:false,
	navBarHidden : (Ti.Platform.name == 'android') 
});



// ---------------------------------------------------------------
// Create custom loading indicator
// ---------------------------------------------------------------
var indWin = null;
var actInd = null;
function showIndicator(title) {
	indicatorShowing = true;
  Ti.API.info("showIndicator with title " + title);
	
  	// window container
  	indWin = Ti.UI.createWindow({
  		height:150,
  		width:150
  	});

  	// black view
  	var indView = Ti.UI.createView({
  		height:150,
  		width:150,
  		backgroundColor:'#000',
  		borderRadius:10,
  		opacity:0.7
  	});
  	indWin.add(indView);

  	// loading indicator
  	actInd = Ti.UI.createActivityIndicator({
  		style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
  		height:30,
  		width:30
  	});
  	indWin.add(actInd);

  	// message
  	var message = Ti.UI.createLabel({
  		text:title,
  		color:'#fff',
  		width:'auto',
  		height:'auto',
  		font:{fontSize:20,fontWeight:'bold'},
  		bottom:20
  	});
  	indWin.add(message);
  	indWin.open();
  	actInd.show();
};


var droidActInd = Ti.UI.createActivityIndicator({height:30,width:30,message:'Loading...'});
function hideIndicator() {
	if(Ti.Platform.name == 'android'){
		droidActInd.hide();
	}else{
	    if (actInd && actInd !== null) {
	       actInd.hide();
	    }
	    
	    if (indWin && indWin !== null) {
	       indWin.close({opacity:0,duration:500});
	    }
	  	
	  	indicatorShowing = false;		
	}
};

// ---------------------------------------------------------------
// Add global event handlers to hide/show custom indicator
// ---------------------------------------------------------------

Ti.App.addEventListener('show_indicator', function(e) {
  if(Ti.Platform.name == 'android') {
    droidActInd.show();
  }else{
	  if(e.title == null) { 
		 e.title = 'Loading'; 
	   }
	  if(indicatorShowing) { 
		 hideIndicator(); 
	  }
	 showIndicator(e.title);	
  }
  

});

Ti.App.addEventListener('hide_indicator', function(e) {
	hideIndicator();
});

if(Ti.Platform.name!='android'){
	var tab1 = Ti.UI.createTab({window:wMain});
    tabGroup.addTab(tab1); 
	// open tab group
	tabGroup.open();	
}else{
	wMain.open();
}
