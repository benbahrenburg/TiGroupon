function fetchGroupon(apiKey){
 
  this.getDivisions=function(){
  };

  this.getNearbyDivisions=function(lat,lng){
  
  };
  
  this.getDeals=function(){
  };
  
  function buildNearbyDealsQry(lat,lng,radius){
	var qryUrl = 'http://api.groupon.com/v2/deals.json?client_id=' + apiKey + '&lat=' + lat + '&lng=' + lng + '&radius=' + radius;
	Ti.API.info('Lookup url=' + qryUrl);
	return qryUrl;
  };

  this.getNearbyDeals=function(lat,lng,radius,callback){
  	var results = {success:true,deals:[]};

	try{
		Ti.API.info('in getNearbyDeals');
		var query = buildNearbyDealsQry(lat,lng,radius);
		var done = false;
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(){
			if (this.readyState == 4 && !done) {
				// convert the response JSON text into a JavaScript object
				var apiResults = eval('(' + this.responseText + ')');
				done=true;
//				Ti.API.info('apiResults=' + JSON.stringify(apiResults));
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
						
						var locCount =apiResults.deals[iLoop].options[0].redemptionLocations.length;
						//if there are more then one location just take the first
						if(locCount>0){
							currentDeal.lat=apiResults.deals[iLoop].options[0].redemptionLocations[0].lat;
							currentDeal.lng=apiResults.deals[iLoop].options[0].redemptionLocations[0].lng;
						}
					
					results.deals.push(currentDeal);
				}

//				Ti.API.info('results=' + JSON.stringify(results));
				if(callback!=undefined){
					callback(results); //Callback					
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