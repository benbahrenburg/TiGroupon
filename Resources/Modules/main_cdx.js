tg.customMsg = function(inputTitle,inputMsg){
  	Ti.UI.createAlertDialog({
  	  title:inputTitle,
  	  message:inputMsg
  	}).show();		
};

tg.visitDeal=function(dealUrl){
	if(!Ti.App.myTools.isEmpty(dealUrl)){
		//Ask if you want to visit
		var ask = Ti.UI.createAlertDialog({
			title:"See Deal on Groupon.com?",
			buttonNames:["Yes","No"],
			cancel:1
		});
		ask.show();

		ask.addEventListener('click',function(e){
			Ti.API.info(dealUrl);
			if(e.index==0){
				Ti.Platform.openURL(dealUrl);
			}
		});
	}	
};
tg.getAddressCoordinates=function(address){
	Ti.App.fireEvent('show_indicator');
	Ti.Geolocation.forwardGeocoder(address,function(evt){
	 	Ti.API.info("lat:"+evt.latitude+", long:"+evt.longitude);
		tg.grouponLookup.getNearbyDeals(evt.latitude,evt.longitude,10,tg.grouponCallback); //Find deals
	});	
};

tg.uiAddLookup=function(){
	if(!tg.hasLocation){
		return;
	}
	if(Ti.App.myTools.isEmpty(tg.txtLocation.value)){
		tg.customMsg('Missing Information','Please enter your location so we can find deals around you.');
	}else{
		tg.getAddressCoordinates(tg.txtLocation.value);
	}
};

tg.getMapAnnotate=function(lat,lng,inputTitle,inputSummary,inputImg,detailId,dealUrl){
	
	var point = Ti.Map.createAnnotation({
		latitude:lat,
		longitude:lng,
		title:inputTitle,
		leftButton:inputImg,
		rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		animate:true,
		detailId:detailId,
		dealUrl:dealUrl
	});	

	if(Ti.App.myTools.isAndroid()){
		point.pinImage = "../Images/map-pin.png";
		point.subtitle=inputSummary + '\n\nTap to view on Groupon.com';
	}else{
		point.pincolor=Ti.Map.ANNOTATION_GREEN;
		point.subtitle=inputSummary;		
	}
	
	return point;

};

tg.grouponCallback=function(e){
//	Ti.API.info('results=' + JSON.stringify(e));		
	try{
	var dealAnnotations = [];

	if (!e.success){
		alert('error');
		return;
	}
	
	tg.mapview.removeAllAnnotations();
	
	tg.deals=e.deals; //Save for later
	//Start adding 
	var dealCount=tg.deals.length;

	
	for (iLoop=0;iLoop < dealCount;iLoop++){
		tg.mapview.addAnnotation(tg.getMapAnnotate(e.deals[iLoop].lat,
						  e.deals[iLoop].lng,
						  e.deals[iLoop].title,
						  e.deals[iLoop].summary,
						  e.deals[iLoop].image,
						  e.deals[iLoop].id,
						  e.deals[iLoop].dealUrl));
	}		

	tg.mapview.zoom(-1);
	tg.setDataInfo();
	Ti.App.fireEvent('hide_indicator',{});

 } catch(err) {
  	Ti.API.info('>>>>>>> Error In grouponCallback ' + err );
}		
};

tg.getUrlFromDeals=function(title){
	var returnValue='';
	var dealCount=tg.deals.length;	
	
	for (iLoop=0;iLoop < dealCount;iLoop++){
		if(tg.deals[iLoop].title==title){
			returnValue=tg.deals[iLoop].dealUrl;
		}
	}		
	
	return returnValue;
};

tg.buildRows=function(inputTitle,inputSummary,detailUrl){
	var row = Ti.UI.createTableViewRow({height:120,selectedBackgroundColor:'#c7c8ca',backgroundImage:'../Images/row_effect.png',hasChild:false,detailUrl:detailUrl});
	var vwRow = Ti.UI.createView({
		left:5,
		right:5,
		layout:'vertical'
		});
	var lblPart1 = Ti.UI.createLabel({
		text:inputTitle,
		color:'#000',
		textAlign:'left',
		top:7,
		height:45,
		width:'300',
		font:{fontSize:18,fontWeight:'bold'}

		});
	vwRow.add(lblPart1);

	var lblPart2 = Ti.UI.createLabel({
		text:inputSummary,
		font:{fontSize:14},
			color:'#000',
			textAlign:'left',
			top:3,
			height:65,
			left:10,
			right:20
	});
	vwRow.add(lblPart2);

	row.add(vwRow);
	row.className = 'dataRow_' + new Date().getTime();
	return row;		

};

tg.setDataInfo=function(){
	var table = [];
	var dealCount=tg.deals.length;
	for (iLoop=0;iLoop < dealCount;iLoop++){
		table.push(tg.buildRows(tg.deals[iLoop].title,tg.deals[iLoop].summary,tg.deals[iLoop].dealUrl));
	}
	tg.tableview.setData(table);
};

tg.googleCallback=function(e){
	Ti.API.info('hopefully ' + e.results[0].formatted_address);
	//Ti.API.info("stuff from google = "+JSON.stringify(e));
	if (e.results.length>0) {
			tg.txtLocation.value = e.results[0].formatted_address;
			tg.hasLocation=true;
	}else{
		tg.txtLocation.value="No address found";
		tg.hasLocation=false;
	}
	
};
tg.googleGeo=function(latitude,longitude,callback){
	try{
		Ti.API.info('latitude=' + latitude);
		Ti.API.info('longitude=' + longitude);
		Ti.API.info('Google Provider lookup called');
		var query = "http://maps.google.com/maps/api/geocode/json?latlng="+ latitude +"," + longitude + "&sensor=false";
		var done = false;
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(){
			if (this.readyState == 4 && !done) {
				// convert the response JSON text into a JavaScript object
				var results = eval('(' + this.responseText + ')');
				done=true;
				callback(results);
			}	
		};
		xhr.onerror = function(e){
			Ti.API.info('>>>>> Error calling Google ' + e.error );
			geo.geoTraceLog('ERROR','GoogleReverseGeo','Service Error=' + err);
			Ti.App.fireEvent('geo_error');
		};			
      xhr.open('GET',query);
  	  xhr.send();
	 } catch(err) {
	  	Ti.API.info('>>>>>>> Error In performGoogleReverse ' + err );
		myt.geo.geoTraceLog('ERROR','GoogleReverseGeo','Service Error=' + err);
	}
};

tg.locationChangeCallback=function(e){
	try{

		if(!Ti.Network.online){
			tg.txtLocation.value="No address found";
			tg.hasLocation=false;
			Ti.UI.createAlertDialog({
				title:'No Netowkr',
				message:"We're sorry, we didn't have time to build an offline experience."
			}).show();
			return;
		}
		if (!e.success || e.error){
			Ti.API.error('Error In Geo Callback ' + e.error);
			Ti.App.fireEvent('hide_indicator',{});
			return;
		}

		var latitude=e.coords.latitude; //GPS
		var longitude=e.coords.longitude; //GPS
		Ti.API.info('latitude=' + latitude);
		Ti.API.info('longitude=' + longitude);
		tg.mapview.setLocation({latitude:latitude,longitude:longitude,animate:true,latitudeDelta:0.04, longitudeDelta:0.04});
		
		tg.grouponLookup.getNearbyDeals(latitude,longitude,10,tg.grouponCallback); //Find deals

		tg.googleGeo(latitude,longitude,tg.googleCallback);
		
//		Ti.Geolocation.reverseGeocoder(latitude,longitude,function(evt){
//			Ti.App.fireEvent('hide_indicator',{});
//			if (evt.success) {
//				Ti.API.info("reverse geolocation result = "+JSON.stringify(evt));
//				var places = evt.places;
//				if (places && places.length) {
//					tg.txtLocation.value = places[0].address;
//				} else {
//					tg.txtLocation.value="No address found";
//				}
//				tg.txtLocation.blur();
//			}
//			else {
//				Ti.UI.createAlertDialog({
//					title:'Reverse geo error',
//					message:evt.error
//				}).show();					
//			}
//		});
	 } catch(err) {
	  	Ti.API.info('>>>>>>> Error In location callback ' + err );
	}	
};