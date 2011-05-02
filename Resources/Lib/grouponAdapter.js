function fetchGroupon(apiKey){
 
  this.getDivisions=function(){
  	//TODO Add API lookup function
  };

  this.getNearbyDivisions=function(lat,lng){
  	//TODO Add API lookup function
  };
    
  function calculateDistance(startingLat,startingLng,destLat,destLng){

	var R = 6371; // km  
	var dLat = (destLat-startingLat)*Math.PI/180;  
	var dLon = (destLng-startingLng)*Math.PI/180;   
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +  
	        Math.cos(startingLat*Math.PI/180) * Math.cos(destLat*Math.PI/180) *   
	        Math.sin(dLon/2) * Math.sin(dLon/2);   
	var c = 2 * Math.asin(Math.sqrt(a));   
	var distance = R * c; //In KM

	return distance;
	
  };

  function buildNearbyDealsQry(lat,lng,radius){
	var qryUrl = 'http://api.groupon.com/v2/deals.json?client_id=' + apiKey + '&lat=' + lat + '&lng=' + lng + '&radius=' + radius;
	Ti.API.info('Lookup url=' + qryUrl);
	return qryUrl;
  };

  this.getNearbyDeals=function(lat,lng,radius,callback){
  	var results = {success:true,deals:[]};

	try{
		var query = buildNearbyDealsQry(lat,lng,radius);
		var done = false;
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(){
			if (this.readyState == 4 && !done) {
				// convert the response JSON text into a JavaScript object
				var apiResults = eval('(' + this.responseText + ')');
				done=true;
				var dealCount=apiResults.deals.length;
				for (iLoop=0;iLoop < dealCount;iLoop++){
					var currentDeal = {
						id:apiResults.deals[iLoop].id,
						title:apiResults.deals[iLoop].announcementTitle,
						summary:apiResults.deals[iLoop].title,
						lat:apiResults.deals[iLoop].division.lat,
						lng:apiResults.deals[iLoop].division.lng,	
						image:apiResults.deals[iLoop].smallImageUrl,
						pitchHtml : apiResults.deals[iLoop].pitchHtml,
						startAt : apiResults.deals[iLoop].startAt,
						endAt : apiResults.deals[iLoop].endAt,
						dealUrl	: apiResults.deals[iLoop].dealUrl
					};
						//Big assumption that options are returned
						// TODO need to add validation checks here						
						//if there are more then one location just take the first
						// TODO need to add radius check here so that we pick the nearest location
						if(apiResults.deals[iLoop].options[0].redemptionLocations.length>0){
							currentDeal.lat=apiResults.deals[iLoop].options[0].redemptionLocations[0].lat;
							currentDeal.lng=apiResults.deals[iLoop].options[0].redemptionLocations[0].lng;
						}
						
					currentDeal.distance = calculateDistance(lat,lng,currentDeal.lat,currentDeal.lng);
					results.deals.push(currentDeal);
				}

				if(callback!=undefined){
					callback(results); //Callback					
				}else{
					throw "no callback function provided";
				}
			}	
		};
		xhr.onerror = function(e){
			Ti.API.info('>>>>> Error calling groupon ' + e.error );
			results.success=false;
			if(callback!=undefined){
				callback(results); //Callback					
			}			
		};			
      xhr.open('GET',query);
  	  xhr.send();
	 } catch(err) {
	  	Ti.API.info('>>>>>>> Error In getNearbyDeals ' + err );
		results.success=false;
		if(callback!=undefined){
			callback(results); //Callback					
		}
	}
  };
};