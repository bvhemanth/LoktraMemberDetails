/*server*/
var mem_det_image_common_path=/*'/v2/modules/desktop/agent_details_map/*/'img/';// common image path
/*end server*/

 /*local*/
var base_path='/api/v2/';
var main_data;//pass all data into
var data//_marker_data;
//to close other marker if click on particular marker
var encodedStr;
var	all_markers;//waypoint markers
var all_markers_for_tasks;//task markers

var marker_type;
var bounds = new google.maps.LatLngBounds();

var Agentmap;// map 
var Mapstyles;//styles
var MemberDetailsmarker;//marker
var MemberDetailsinfowindow;//info window	
var taskMarkers=[];
var memberTaskMarker;
var rawMarker;
var RawMarkers=[];

var lineCoordinates=[];//using this red lines plotting
var waypoints_from_polylines=[];//process each polyline waypointss
var direction_services_array=[];//fro direction services variables
var keep_direction_services=[];//
var waypts_20=[];//to call each 20 for built drection
var markers = [];//push into all markers
var waypts = [];//
var polylines_array=[];//to clear all red dotted lines
var points_to_geometric_lines=[];//
var pointrs_polylines;
var line;
var polyline=[];

//to make multiple directions using waypoints
var greater_value=40;
var lesser_value=20;

//to find center of map using all lats and longs
var lat_min = '';
var lat_max = '';
var lng_min = '';
var lng_max = '';

var newVariable = 0;//dynamic variable addition
var newVariable_1=0;//dynamivc variable addition
var create_way_value=0;//to use for direction services aray

var all_latitudes=[];
var all_longitudes=[];
var points=[];
var shift_off='';
var shift_on='';

var data_format_for_all=''//=moment().format('YYYY-MM-DD');
var partition_count=0;
var agentMapUTC=new Date(new Date().setHours(0,0,0,0)).toISOString();
var bounds = new google.maps.LatLngBounds();
var tasks_find=0;
var raw_find=0;
var raw_data_per_page=100;
var page_number=1;
/*end of local*/


//start stayPointMarker
function stayPointMarker(latlng, Agentmap, imageSrc,type,on,off) {
	this.latlng_ = latlng;
	this.imageSrc = imageSrc;
	this.setMap(Agentmap);
	marker_type=type;
	this.shift_on=on;
	this.shift_off=off;
}

stayPointMarker.prototype = new google.maps.OverlayView();

stayPointMarker.prototype.draw = function () {
	var div = this.div_;
	if (!div) {
		div = this.div_ = document.createElement('div');
		div.className = "stayPointMarker";
		//$(div).html();
		var img = document.createElement("div");
		//if(this.shift_off!=0)
		//{
			var imageURL=mem_det_image_common_path+"agentMap_location.png";
			$(img).html('<div style="width:60px;z-index:999;"><img style="position:relative; left:-47px;z-index:999;" src="'+imageURL+'"/><div style="position:relative;left:5px;top:-26px;"><div class="top_time" style="height:17px; border-radius: 5px 5px 0px 0px;padding:2px 2px;text-align:center;">'+this.shift_on+'</div><div class="bottom_time" style="height:17px;border-radius: 0px 0px 5px 5px;padding:2px 2px;text-align:center;">'+this.shift_off+'</div></div></div>');	
		//}
		//$(img).html('<div style="width:50px;"><img src="img/location.png" style="float:left;"/> 2h 2m</div>');
		
		div.appendChild(img);
		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);
		
	}

	var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
	if (point) {
		div.style.left = point.x + 'px';
		div.style.top = point.y + 'px';	
	}
};

stayPointMarker.prototype.getPosition = function () {
	return this.latlng_;
};
//end stayPointMarker
		

function stayPointMarker_1(latlng, Agentmap, imageSrc,type,on,off) {
	this.latlng_ = latlng;
	this.imageSrc = imageSrc;
	this.setMap(Agentmap);
	marker_type=type;
	this.shift_on=on;
	this.shift_off=off;
}

stayPointMarker_1.prototype = new google.maps.OverlayView();

stayPointMarker_1.prototype.draw = function () {
	var div = this.div_;
	if (!div) {
		div = this.div_ = document.createElement('div');
		div.className = "stayPointMarker1";
		//$(div).html();
		var img = document.createElement("div");
		//	$(img).html('<div style="width:50px;z-index:999;"><img style="position:relative; left:-38px;z-index:999;" src='+imagePath+'"images/location.png" /><div style="position:relative;left:5px;top:-26px;"><div class="top_time" style="background-color:#2872EA;height:17px; border-radius: 5px 5px 0px 0px;padding:2px 2px;">'+this.shift_on+'</div><div style="height:17px;background-color:#FD7D6B;border-radius: 0px 0px 5px 5px;padding:2px 2px;">'+this.shift_off+'</div></div></div>');	
		//}
		var imageURL=mem_det_image_common_path+"agentMap_location.png";
		$(img).html('<div style="width:70px;z-index:999;padding:3px 2px;text-align:center;"><img src="'+imageURL+'" style="position:relative;top:0.5px; float:left;"/>'+this.shift_on+'</div>');
		
		div.appendChild(img);
		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);
		
	}

	var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
	if (point) {
		div.style.left = point.x + 'px';
		div.style.top = point.y + 'px';	
	}
};

stayPointMarker_1.prototype.getPosition = function () {
	return this.latlng_;
};
//end stayPointMarker		
	
//direciton markers on map
function rotateMarker(latlng, Agentmap, imageSrc,type,degree) {
	this.latlng_ = latlng;
	this.imageSrc = imageSrc;
	this.setMap(Agentmap);
	marker_type=type;
	this.degree=degree;
}

rotateMarker.prototype = new google.maps.OverlayView();

rotateMarker.prototype.draw = function () {
	var div = this.div_;
	if (!div) {
		div = this.div_ = document.createElement('div');
		div.className = "rotateMarker";
		var img = document.createElement("div");
		var imageURL=mem_det_image_common_path+"agentMap_location.png";
		$(img).html('<div style="width:25px;"><img src="'+this.imageSrc+'" style="transform: rotate('+this.degree+'deg);-webkit-transform: rotate('+this.degree+'deg)" height="15px" width="15px"/></div>');
		
		div.appendChild(img);
		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);
		
	}

	var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
	if (point) {
		div.style.left = point.x + 'px';
		div.style.top = point.y + 'px';	
	}
};

rotateMarker.prototype.getPosition = function () {
	return this.latlng_;
};	
//end of direciton markers

// it will start plltting markers
function markersPlotting()
{	

	var icon;
	var color;
	//points[points.length-1].latitude,points[points.length-1].longitude),Agentmap,main_data.member_details.agent_profile.avatar,'agent',main_data.member_details.agent_profile.status.last_activit
	all_markers.push({location_coordinates:[points[points.length-1].latitude,points[points.length-1].longitude],location_timestamp:main_data.member_details.agent_profile.status.last_activity,marker_type:'Latest Location'});

	all_markers.forEach(function(lat, i) 
	{	
		shift_off='';
		shift_on='';
		if((all_markers[i].marker_type=='SHIFT ON')||(all_markers[i].marker_type=='GPS ON'))
		{
			icon = {
				url: mem_det_image_common_path+"agentMap_shift_on.png",
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(10,10)
				};

			color='#00CC33';
		}	
		if((all_markers[i].marker_type=='GPS OFF')||(all_markers[i].marker_type=='PHONE OFF'))
		{	
			icon = {
				url: mem_det_image_common_path+"agentMap_gps_off.png",
				anchor: new google.maps.Point(10,10)
			};
			color=' #F3634F';
		}	
		if((all_markers[i].marker_type=='SHIFT OFF'))
		{	
			icon = {
				url: mem_det_image_common_path+"agentMap_shift_off.png",
				anchor: new google.maps.Point(10,10)
			};
			color=' #F3634F';
		}
		if(all_markers[i].marker_type=='NORMAL')
		{
			color='#0099FF';
			icon = {
				url: mem_det_image_common_path+"agentMap_location.png",
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(10,10)
			};
		}
		var for_only_stay_point='';
		if(all_markers[i].marker_type=='STAY POINT')
		{	
			color='#0099FF';
			if(all_markers[i].stay_duration.shift_off_duration==0)
			{
				var start_time=moment(all_markers[i].stay_duration.start_time).format("dddd, MMM Do YYYY, h:mm a");
				var convertingStartTime=start_time.split(",");
				var end_time=moment(all_markers[i].stay_duration.end_time).format("dddd, MMM Do YYYY, h:mm a");
				var convertingEndTime=end_time.split(",");
				for_only_stay_point=convertingStartTime[2]+' to '+ convertingEndTime[2];
				icon = {
				url: mem_det_image_common_path+"agentMap_stay_point.png",
				scaledSize: new google.maps.Size(50, 50), // scaled size
				origin: new google.maps.Point(0,0), // origin
				anchor: new google.maps.Point(26,30) // anchor
				};
				new stayPointMarker_1(new google.maps.LatLng(all_markers[i].location_coordinates[0], all_markers[i].location_coordinates[1]), Agentmap,mem_det_image_common_path+'agentMap_work_unsuccess.png','',all_markers[i].stay_duration.shift_on_duration,all_markers[i].stay_duration.shift_off_duration);
			}
			if(all_markers[i].stay_duration.shift_off_duration!=0)
			{	
				var start_time_2=moment(all_markers[i].stay_duration.start_time).format("dddd, MMM Do YYYY, h:mm a");
				var convertingStartTime_2=start_time_2.split(",");
				var end_time_2=moment(all_markers[i].stay_duration.end_time).format("dddd, MMM Do YYYY, h:mm a");
				var convertingEndTime_2=end_time_2.split(",");
				for_only_stay_point=convertingEndTime_2[2]+' to '+ convertingEndTime_2[2];
				icon = {
				url: mem_det_image_common_path+"agentMap_stay_point2.png",
				scaledSize: new google.maps.Size(50, 50), // scaled size
				origin: new google.maps.Point(0,0), // origin
				anchor: new google.maps.Point(28,33) // anchor
				};
				new stayPointMarker(new google.maps.LatLng(all_markers[i].location_coordinates[0], all_markers[i].location_coordinates[1]), Agentmap,mem_det_image_common_path+'agentMap_work_unsuccess.png','',all_markers[i].stay_duration.shift_on_duration,all_markers[i].stay_duration.shift_off_duration);
			}
		}
		if(all_markers[i].marker_type=='Latest Location')
		{	
			//var convertingTime=moment(all_markers[i].location_timestamp).format("dddd, MMM Do YYYY, h:mm:ss a");
			if(main_data.member_details.agent_profile.status.status=='ONLINE')
			{
				icon = {
					url: main_data.member_details.agent_profile.avatar+'_green',
					origin: new google.maps.Point(0,0),
					anchor: new google.maps.Point(20,40),
					scaledSize: new google.maps.Size(40, 50)
				};
			}	
			if(main_data.member_details.agent_profile.status.status=='OFFLINE')
			{
				icon = {
					url: main_data.member_details.agent_profile.avatar+'_red',
					origin: new google.maps.Point(0,0),
					anchor: new google.maps.Point(20,40),
					scaledSize: new google.maps.Size(40, 50),
					zIndex:99999999
				};
			}	
			color='#00CC33';
		}

		var content;
		var convertingTime=moment(all_markers[i].location_timestamp).format("dddd, MMM DD YYYY, h:mm a");
		var convertingTimeSplit=convertingTime.split(",");
		if(all_markers[i].marker_type=='STAY POINT')
		{
			content='<small class="font_family" style="color:'+color+';font-size:12px;"><b>'
				+all_markers[i].marker_type+'</b></small><br/><div class="address"> </div><small style="font-size:10px;color:#fff;font-weight:bold;">'
				+for_only_stay_point+' | '+convertingTimeSplit[1]+'</small>';
		}
		if(all_markers[i].marker_type!='STAY POINT')
		{
			content='<small class="font_family" style="color:'+color+';font-size:12px;"><b>'
				+all_markers[i].marker_type+'</b></small><br/><div class="address"> </div><small class="font_family" style="font-size:10px;color:#fff;font-weight:bold;">'
				+convertingTimeSplit[2]+' | '+convertingTimeSplit[1]+'</small>';
		}

		MemberDetailsinfowindow = new google.maps.InfoWindow();	
		MemberDetailsmarker = new google.maps.Marker({
			map: Agentmap,
			position: {lat: all_markers[i].location_coordinates[0], lng: all_markers[i].location_coordinates[1]},
			icon:icon,
			info:'<div id="content_'+i+'" class="content" style="font-family: Arial, Helvetica, Sans-Serif;padding:7px 10px 15px 10px;">'+content+'</div>'
		});



		var extendPoint = new google.maps.LatLng(all_markers[i].location_coordinates[0],all_markers[i].location_coordinates[1])
		bounds.extend(extendPoint);
		markers.push(MemberDetailsmarker);
		
		google.maps.event.addListener(MemberDetailsmarker, 'click', (function(MemberDetailsmarker, i) {
			return function() {
				var geocoder = new google.maps.Geocoder;
				var lattitude=this.getPosition().lat();
				var langitude=this.getPosition().lng();
				var lat_lan=lattitude+","+langitude;
				var information=this.info;
				var info_id = 'content_'+i;
				geocodeLatLng(geocoder, Agentmap, MemberDetailsinfowindow,lat_lan,MemberDetailsmarker,information,info_id);
				
				//MemberDetailsinfowindow.setContent(content);
				//MemberDetailsinfowindow.open(Agentmap, MemberDetailsmarker);
			}
		}) (MemberDetailsmarker, i));	
		google.maps.event.addListener(Agentmap, "click", function(event) {
		    MemberDetailsinfowindow.close();
		});//close information window when i click map 

		google.maps.event.addListener(MemberDetailsinfowindow, 'domready', function() {
		    var iwOuter = $('.gm-style-iw');
		    var iwBackground = iwOuter.prev();
		    iwBackground. css({'left':'-16px'});
		    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

		    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
		    iwOuter.parent().parent().css({left: '20px'});
		    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 80px !important;'});
		    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 80px !important;'});
		    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '99','background-color':'black'});
		    var iwCloseBtn = iwOuter.next();
		    iwCloseBtn.css({opacity: '1', right: '38px', display:'none',top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});
		    $('.iw-bottom-gradient').css({display: 'none'});
		    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
		    if($('.iw-content').height() < 140){
		      $('.iw-bottom-gradient').css({display: 'none'});
		    }

		    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
		    iwCloseBtn.mouseout(function(){
		      $(this).css({opacity: '1'});
		    });
		});		
	});	
	trafficLayer = new google.maps.TrafficLayer();

}
//end plotting markers and fit bouds

 function geocodeLatLng(geocoder, map, infowindow,position,MemberDetailsmarker,information,info_id) {
        var input = position;
        var latlngStr = input.split(',');
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
            	var content=information;
              infowindow.setContent(content);
              
              infowindow.open(map, MemberDetailsmarker);
              $("#"+info_id).children(":nth-child(3)").html("<div style='color:#CCCCCC;font-size:10px;font-weight:bold;'>"+results[1].formatted_address+"</div>");
            } else {
              window.alert('No results found');
            }
          } else {
            //window.alert('Geocoder failed due to: ' + status);
          }
        });
      }

function toggleTraffic()
{
	if(trafficLayer.getMap() == null){
	//traffic layer is disabled.. enable it
	trafficLayer.setMap(Agentmap);
	} else {
	//traffic layer is enabled.. disable it
	trafficLayer.setMap(null);             
	}
}//end toggleTraffic

//to make dark view
function dark_view_show_close(n)
{	
	if((n%2)==0)
	{
		var roadAtlasStyles = [
		  {
			  "featureType": "road.highway",
			  "elementType": "all",
			  "stylers": [
				{ "saturation": -100 },
				{ "lightness": -8 },
				{ "gamma": 1.18 }
			  ]
		  }, {
			  "featureType": "poi",
			  "elementType": "all",
			  "stylers": [
				{ "saturation": -100 }
			  ]
		  }, {
			  "featureType": "transit",
			  "stylers": [
				{ "saturation": -100 }
			  ]
		  }, {
			  "featureType": "water",
			  "elementType": "all",
			  "stylers": [
				{ "saturation": -100 }
			  ]
		  }, {
			  "featureType": "road",
			  "stylers": [
				{ "saturation": -100 }
			  ]
		  },  {
			  "featureType": "landscape",
			  "stylers": [
				{ "saturation": -100 }
			  ]
		  }
		]
		Agentmap.setOptions({styles: roadAtlasStyles});
	}
		if((n%2)==1)
		{
			var styles =[{	featureType: "water",
					elementType: "all",
					stylers: [{color: "#c9c9c9"}]},
				{	featureType: "poi.park",
					elementType: "all",
					stylers: [{color: "black"}]
				}]
			Agentmap.setOptions({styles: styles});
		}
	
}//end dark_view_show_close


//it ll decode the encoded polylines
function decodePolyline()
{	
	for(var cords=0;cords<encodedStr.length;cords++)
	{

		greater_value=40;
		lesser_value=20;
		//create_way_value=0;
		waypoints_from_polylines=[];
		//direction_services_array=[];
		gpsdata_length='';

		points=[ ]
		var index = 0, len = encodedStr[cords].length;
		var lat = 0, lng = 0;
		while (index < len) 
		{
			var b, shift = 0, result = 0;
			do 
			{
				b = encodedStr[cords].charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);

			var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
			lat += dlat;
			shift = 0;
			result = 0;
			do 
			{
				b = encodedStr[cords].charAt(index++).charCodeAt(0) - 63;
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);
			var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
			lng += dlng;
	 
			points.push({latitude:( lat / 1E5),longitude:( lng / 1E5)}) ;

			points_to_geometric_lines.push({latitude:( lat / 1E5),longitude:( lng / 1E5)});

		}
		
		waypoints_from_polylines=[];
		for(var way=0;way<points.length;way++)
		{		
			waypoints_from_polylines.push({lat:points[way].latitude,lan:points[way].longitude});
			all_latitudes.push(points[way].latitude);
			all_longitudes.push(points[way].longitude);
		}
		//each polyline start and end points
		lineCoordinates.push({lat:points[0].latitude,lan:points[0].longitude});
		lineCoordinates.push({lat:points[points.length-1].latitude,lan:points[points.length-1].longitude});

		var gpsdata_length=waypoints_from_polylines.length-1;
		var twenty_default=20;

		var waypts = [];
		for (var j = 0; j < waypoints_from_polylines.length; j++) {
			waypts.push({
				location: new google.maps.LatLng(waypoints_from_polylines[j].lat,waypoints_from_polylines[j].lan),
				stopover: true
			});
		}
				
		var gpsdata_length=waypoints_from_polylines.length-1;
		
		if(waypoints_from_polylines.length>=2)
		{	
			var divis=waypts.length/22;
			var rendererOptions = {
			   	suppressMarkers: true,
			    preserveViewport: true,
			    optimizeWaypoints:true,
			    provideRouteAlternatives: false,
			    polylineOptions: {
			      strokeColor: '#A880FF',
			      strokeWeight: 6.5,
			      strokeOpacity: 0.7
			    }
			 };
			divis++;
			for(var d=0;d<=divis;d++)
			{		
				var DirectionsRenderer=newVariable++;
				var new_var=DirectionsRenderer+"dirrender";
				var directionServices1=newVariable_1+"services";
				new_var=new google.maps.DirectionsRenderer(rendererOptions);//({ suppressMarkers: true });
				directionServices1=new google.maps.DirectionsService();
				direction_services_array.push({dis:directionServices1,dirren:new_var});
				keep_direction_services.push({dis:directionServices1,dirren:new_var})
			}
			for(i=0;i<waypoints_from_polylines.length;i++)
			{	
				if(i<=20)
				{	
					if((i>0)&&(i<20)&&(i!=gpsdata_length))
					{	
						//console.log(i+'--');
						waypts_20.push({lat:waypoints_from_polylines[i].lat,lan:waypoints_from_polylines[i].lan});
					}
					if((i==20)||(i==gpsdata_length))
					{	
						//console.log('start'+0+' end'+i);
						partition_count++;
						create_way(direction_services_array[create_way_value].dis,direction_services_array[create_way_value].dirren,waypoints_from_polylines[0].lat,waypoints_from_polylines[0].lan,waypoints_from_polylines[i].lat,waypoints_from_polylines[i].lan,waypts_20,partition_count,cords)
						create_way_value++;
						waypts_20=[];
						//console.log(greater_value,lesser_value)
					}
				}
				
				if((i<=greater_value)&&(i>lesser_value))
				{	
					
					if((i>lesser_value)&&(i<greater_value)&&(i!=gpsdata_length))
					{	
						//console.log('----'+i);
						waypts_20.push({lat:waypoints_from_polylines[i].lat,lan:waypoints_from_polylines[i].lan});
					}	
					if((i==greater_value)||(i==gpsdata_length))
					{	
						var a=lesser_value;
						//console.log('start '+a+' end '+i);
						partition_count++;
						create_way(direction_services_array[create_way_value].dis,direction_services_array[create_way_value].dirren,waypoints_from_polylines[lesser_value-1].lat,waypoints_from_polylines[lesser_value-1].lan,waypoints_from_polylines[i].lat,waypoints_from_polylines[i].lan,waypts_20,partition_count,cords)
						greater_value=greater_value+20;
						lesser_value=lesser_value+20;
						//console.log(greater_value,lesser_value)
						waypts_20=[];
						create_way_value++;
					}
				}
			}
		}
		if(cords==encodedStr.length-1)
		{
			drawPolyline();
			
			var to_loader=(partition_count-9)*1000;
			if(to_loader>=0)
			{	
				setTimeout(function(to_loader){
					$('#loading').css('display','none');
					$('#loading_row').css('display','none');
				},to_loader);
			}else
			{
				setTimeout(function(to_loader){
					$('#loading').css('display','none');
					$('#loading_row').css('display','none');
				},1000);
			}
		}
	}
}	

//to draw red dotted lines
function drawPolyline()
{
	var lineSymbol = {
		//path: 'M 0,-1 0,1',
		path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
		strokeOpacity: 0.8,
		strokeWeight: 3
		//scale: 3
	};
	var color = ["#FF6668"];
	var icons = [
		[{
			icon: lineSymbol,
			offset: '50%',
			repeat: '50px'
		}]
	];
	for(var i = 1; i < lineCoordinates.length-1; i++) {
		line = new google.maps.Polyline({
			path: [
				new google.maps.LatLng(lineCoordinates[i].lat,lineCoordinates[i].lan), 
				new google.maps.LatLng(lineCoordinates[i+1].lat,lineCoordinates[i+1].lan)
			],
			strokeOpacity: 0.8,
			icons: icons[0],
			strokeColor: color[0],
			map: Agentmap
		});
		polylines_array.push(line);
		i=i+1;
	}
	//overMapButtons();
	all_longitudes.sort(sortFloat);
	all_latitudes.sort(sortFloat);
	
	Agentmap.setCenter(new google.maps.LatLng(
	  ((all_latitudes[all_latitudes.length-1] + all_latitudes[0]) / 2.0),
	  ((all_longitudes[all_longitudes.length-1] + all_longitudes[0]) / 2.0)
	));
	var centera=(all_latitudes[all_latitudes.length-1] + all_latitudes[0]) / 2.0;
	var centerb=(all_longitudes[all_longitudes.length-1] + all_longitudes[0]) / 2.0;

	var map_ne 
	var map_sw
	var b
	google.maps.event.addListenerOnce(Agentmap,'bounds_changed',function(event) {
		var b=Agentmap.getBounds();
		map_ne = b.getNorthEast();
        map_sw = b.getSouthWest();

        var map_div_width=$('#MemberDetailsMap').width();

        var w = $('#MemberDetailsMap').width();
        var current_zoom=this.getZoom();
    	var zooms = [,21282,16355,10064,5540,2909,1485,752,378,190,95,48,24,12,6,3,1.48,0.74,0.37,0.19];
    	var mperpx=zooms[current_zoom];
    	var width_in_meters=mperpx*w;
    	var twety_per_more=width_in_meters+(width_in_meters*(20/100));
    	var x=0.001;
    	var z = 20, m;
    	while( zooms[--z] ){
    	    m = zooms[z] * w;
    	   	x=x+0.0001;
    	    if(twety_per_more < m){
   		        break;
   		    }
   		}
    	//return z;

        var GLOBE_WIDTH = 256; // a constant in Google's map projection
		var west = all_longitudes[0]-x;//Agentmap.getBounds().getSouthWest().lng();
		var east = all_longitudes[all_longitudes.length-1]+x;//Agentmap.getBounds().getNorthEast().lng();
		var north = all_latitudes[all_latitudes.length-1]+x;//<?php echo $maxLat; ?>;
		var south = all_latitudes[0]-x;//<?php echo $minLat; ?>;
		var angle = east - west;
		if (angle < 0) {
		  angle += 360;
		}
		var angle2 = north - south;
		if (angle2 > angle) angle = angle2;
		var zoomfactor = Math.round(Math.log( 600 * 360 / angle / GLOBE_WIDTH) / Math.LN2);
		this.setZoom(zoomfactor-1);
	});
}

//sorting latitudes longitudes
function sortFloat(a,b) { return a - b; };

//To display directons
function create_way(dir,disp,start_1,start_2,stop_1,stop_2,waypts_local,partition_count,cords)
{	
	var points_20=[];
	for(var way=0;way<waypts_local.length;way++)
	{
		points_20.push({
			location: new google.maps.LatLng(waypts_local[way].lat,waypts_local[way].lan)
		});
	}
	dir.route({
		origin:new google.maps.LatLng(start_1,start_2),//(lat, lng),//places_to_serve[0],
		destination:new google.maps.LatLng(stop_1,stop_2),
		waypoints: points_20,
		travelMode: 'DRIVING'
	}, function(response, status) {
		if (status === 'OK') {
			disp.setDirections(response);
			disp.setOptions({
				strokeColor: '#A880FF'
			});
			var route = response.routes[0];
		} 
		else if(status == 'OVER_QUERY_LIMIT')
		{
            setTimeout(create_way.bind(null,dir,disp,start_1,start_2,stop_1,stop_2,waypts_local,partition_count,cords), 800);	
        }
	});
	disp.setMap(Agentmap);	
}
 

function bearingBetweenLocations(a,z) 
{
    var angleRadians = Math.atan2(z.lng() - a.lng(), z.lat()-a.lat());
	// angle in degrees
	var angleDeg = Math.atan2(z.lng() - a.lng(), z.lat()-a.lat()) * 180 / Math.PI;
	return angleDeg;
}

//to clear all data on map
function removeAll()
{
	deleteMarkers();
	deleteTaskMarkers();
	//deleteRawMarkers();

	$('.tasks').html('');
	$('.tasks').removeClass('tasks');
	//agent_locator
	$('.agent_locator').html('');
	$('.agent_locator').removeClass('agent_locator');
	//stayPointMarker
	$('.stayPointMarker').html('');
	$('.stayPointMarker').removeClass('stayPointMarker');

	$('.stayPointMarker1').html('');
	$('.stayPointMarker1').removeClass('stayPointMarker1');

	$('.rotateMarker').html('');
	$('.rotateMarker').removeClass('stayPointMarker1');

	$('.one').html('');
	$('.one').removeClass('one');

	for(var j=0;j<keep_direction_services.length;j++)
	{
		var delete_route=keep_direction_services[j].dirren;
		delete_route.setMap(null);
	}
	points_to_geometric_lines=[];
	keep_direction_sesrvices=[];//
	markers=[];// clear all default icons 
	for (i=0; i<polylines_array.length; i++) 
	{                     
	  	polylines_array[i].setMap(null); //or line[i].setVisible(false);
	}
	polylines_array=[];

	all_latitudes=[];
	all_longitudes=[];
	lineCoordinates=[];
	waypoints_from_polylines=[];
}

function setMapOnAll(Agentmap) 
{
	if(markers.length>=1)
	{
		for (var i = 0; i < markers.length; i++) 
		{
			markers[i].setMap(Agentmap);
		}
	}	
}

function clearMarkers() {
    setMapOnAll(null);
}
 // Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
//end of clearing all thngs on map

//do task markers plotting
function TasksPlotting()
{
	var icon;
	var status;
	for(var i=0;i<all_markers_for_tasks.length;i++)
	{	
		//console.log(all_markers_for_tasks[i].status);
		if(all_markers_for_tasks[i].task_location!=null)
		{	
			if(all_markers_for_tasks[i].status=='FAILED')
			{	
				status='FAILED';
				icon = {
				url: mem_det_image_common_path+"task-failed.png",
				scaledSize: new google.maps.Size(40, 50), // scaled size
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(20,55)
				};
				//new unSuccessMarker(new google.maps.LatLng(all_markers_for_tasks[i].task_location[0],all_markers_for_tasks[i].task_location[1]), Agentmap,  mem_det_image_common_path+"agentMap_work_unsuccess.png",all_markers_for_tasks[i].status);
			}
			if(all_markers_for_tasks[i].status=='SUCCESS')
			{
				icon = {
				url: mem_det_image_common_path+"task-success.png",
				scaledSize: new google.maps.Size(40, 50), // scaled size
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(20,55)
				};
				//new unSuccessMarker(new google.maps.LatLng(all_markers_for_tasks[i].task_location[0],all_markers_for_tasks[i].task_location[1]), Agentmap,  mem_det_image_common_path+"agentMap_work_success.png",all_markers_for_tasks[i].status);
			}
			if(all_markers_for_tasks[i].status=='ACTIVE')
			{	
				status='ACTIVE';
				icon = {
				url: mem_det_image_common_path+"task-success.png",
				scaledSize: new google.maps.Size(40, 50), // scaled size
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(20,55)
				};
				//new unSuccessMarker(new google.maps.LatLng(all_markers_for_tasks[i].task_location[0],all_markers_for_tasks[i].task_location[1]), Agentmap,  mem_det_image_common_path+"agentMap_work_success.png",all_markers_for_tasks[i].status);
			}
	

			MemberDetailsinfowindow = new google.maps.InfoWindow();	
			memberTaskMarker = new google.maps.Marker({
				map: Agentmap,
				position: {lat: all_markers_for_tasks[i].task_location[0], lng: all_markers_for_tasks[i].task_location[1]},
				icon:icon
			});
			//var extendPoint = new google.maps.LatLng(all_markers[i].location_coordinates[0],all_markers[i].location_coordinates[1])
			////console.log(extendPoint);
			//bounds.extend(extendPoint);
			//markers.push(MemberDetailsmarker);
			taskMarkers.push(memberTaskMarker);	
			var convertingTime=moment(all_markers[i].location_timestamp).format("dddd, MMM Do YYYY, h:mm:ss a");
			var convertingTimeSplit=convertingTime.split(",");
			google.maps.event.addListener(memberTaskMarker, 'click', (function(memberTaskMarker, i) {
					return function() {
						$('.agent_locator').css('display', 'none');
						MemberDetailsinfowindow.setContent('<div id="content" class="content" style="padding:7px 10px 15px 10px;"><small style="color:white"><b>'+all_markers_for_tasks[i].status+' | '+all_markers_for_tasks[i].title+'</b></small><br/><p style="color:#fff;margin-top:0px;margin-bottom:0px;">'+all_markers_for_tasks[i].customer_details.name+'</p><p style="color:white;margin-top:0px;margin-bottom:0px;">'+all_markers_for_tasks[i].customer_details.full_address+'</p></div>');
						MemberDetailsinfowindow.open(Agentmap, memberTaskMarker);
					}
			}) (memberTaskMarker, i));	


			google.maps.event.addListener(MemberDetailsinfowindow, 'domready', function() {
		    var iwOuter = $('.gm-style-iw');
		    var iwBackground = iwOuter.prev();
		    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

		    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
		    iwOuter.parent().parent().css({'left': '5px'});
		    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 80px !important;'});

		    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 80px !important;'});
		    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '99','background-color':'#444444'});
		    var iwCloseBtn = iwOuter.next();
		    iwCloseBtn.css({opacity: '1', right: '38px', display:'none',top: '3px', border: '7px solid #48b5e9', 'border-radius': '20px', 'box-shadow': '0 0 5px #3990B9'});

		    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
		    if($('.iw-content').height() < 140){
		      $('.iw-bottom-gradient').css({display: 'none'});
		    }
		   // $('.gm-style-iw').css('left','5px;');
		    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
		    iwCloseBtn.mouseout(function(){
		      $(this).css({opacity: '1'});
		    });
		});			
		}			
	}
}	
//end of TasksPlotting

//start placing overmap buttons
function overMapButtons()
{
	all_longitudes.sort(sortFloat);
	all_latitudes.sort(sortFloat);
	
	Agentmap.setCenter(new google.maps.LatLng(
	  ((all_latitudes[all_latitudes.length-1] + all_latitudes[0]) / 2.0),
	  ((all_longitudes[all_longitudes.length-1] + all_longitudes[0]) / 2.0)
	));
	var centera=(all_latitudes[all_latitudes.length-1] + all_latitudes[0]) / 2.0;
	var centerb=(all_longitudes[all_longitudes.length-1] + all_longitudes[0]) / 2.0;

	var map_ne 
	var map_sw
	var b
	google.maps.event.addListenerOnce(Agentmap,'bounds_changed',function(event) {
		var b=Agentmap.getBounds();
		map_ne = b.getNorthEast();
        map_sw = b.getSouthWest();

        var map_div_width=$('#MemberDetailsMap').width();

        var w = $('#MemberDetailsMap').width();
        var current_zoom=this.getZoom();
    	var zooms = [,21282,16355,10064,5540,2909,1485,752,378,190,95,48,24,12,6,3,1.48,0.74,0.37,0.19];
    	var mperpx=zooms[current_zoom];
    	var width_in_meters=mperpx*w;
    	var twety_per_more=width_in_meters+(width_in_meters*(20/100));
    	var x=0.001;
    	var z = 20, m;
    	while( zooms[--z] ){
    	    m = zooms[z] * w;
    	   	x=x+0.0001;
    	    if(twety_per_more < m){
   		        break;
   		    }
   		}
    	//return z;

        var GLOBE_WIDTH = 256; // a constant in Google's map projection
		var west = all_longitudes[0]-x;//Agentmap.getBounds().getSouthWest().lng();
		var east = all_longitudes[all_longitudes.length-1]+x;//Agentmap.getBounds().getNorthEast().lng();
		var north = all_latitudes[all_latitudes.length-1]+x;//<?php echo $maxLat; ?>;
		var south = all_latitudes[0]-x;//<?php echo $minLat; ?>;
		var angle = east - west;
		if (angle < 0) {
		  angle += 360;
		}
		var angle2 = north - south;
		if (angle2 > angle) angle = angle2;
		var zoomfactor = Math.round(Math.log( 600 * 360 / angle / GLOBE_WIDTH) / Math.LN2);
		this.setZoom(zoomfactor-1);
	});
}
//end placing overMapButtons

//initially place_all_things
function memberDetails_place_all_things()
{	

	removeAll();
	
	$('.tasks').html('');
	$('.tasks').removeClass('tasks');
	//agent_locator
	$('.agent_locator').html('');
	$('.agent_locator').removeClass('agent_locator');
	//stayPointMarker
	$('.stayPointMarker').html('');
	$('.stayPointMarker').removeClass('stayPointMarker');

	$('.one').html('');
	$('.one').removeClass('one');

	for(var j=0;j<keep_direction_services.length;j++)
	{
		var delete_route=keep_direction_services[j].dirren;
		delete_route.setMap(null);
	}
	keep_direction_sesrvices=[];//
	markers=[];// clear all default icons
	for (i=0; i<polylines_array.length; i++) 
	{                           
	  	polylines_array[i].setMap(null); //or line[i].setVisible(false);
	}
	polylines_array=[];

	all_latitudes=[];
	all_longitudes=[];
	lineCoordinates=[];
	waypoints_from_polylines=[];
	waypts=[];
	
	page_number=1;
	greater_value=40;
	lesser_value=2;
	create_way_value=0;
	direction_services_array=[];
	newVariable = 0;//dynamic variable addition
	newVariable_1=0;//dynamivc variable addition

	tasks_find=0;
	raw_find=0;

	main_data={
	"status": 200,
	"organization_details": {
		"organization_name": "Loktra",
		"organization_logo": null
	},
	"member_details": {
		"agent_profile": {
			"status": {
				"status": "ONLINE",
				"battery": 13.0,
				"shift": "ON",
				"last_activity": "2017-05-11T18:17:33.452000Z",
				"total_working_hours": 16486.0,
				"gps": "ON"
			},
			"employee_id": "1",
			"home_address": null,
			"name": "hemanth",
			"email": "hemanth@loktra.com",
			"phone": "+918147634118",
			"reporting_manager_name": "Astha Gupta",
			"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/c2aee692-3916-4ee7-85ba-e72401931f19_user-blank-black.png",
			"id": "e07f5b45-e76f-44e0-856d-0fd7ca53a226",
			"today": false
		},
		"task_details": [{
			"status": "Pending",
			"last_updated": "2017-05-10T13:15:51.832312Z",
			"customer_details": {
				"cust_location": null,
				"id": "a90e7738-024e-46f1-b46f-f6a84d1ab21c",
				"full_address": null,
				"name": "test"
			},
			"title": "test",
			"created_by": "Astha Gupta",
			"created_on": "2017-05-10T13:15:51.759012Z",
			"task_location": null,
			"id": "828ef1fa-4230-4ee6-9ae9-702429272b9f"
		}],
		"location_polylines": ["gajsAqsp`NzgAq`@ngOdqJa}bCk_eFd}vCjfoC??j_~BreW"],
		"marker_data": [ {
			"location_coordinates": [13.81924,78.89737],
			"location_timestamp": "2002-05-11T14:25:37.000000Z",
			"marker_type": "NORMAL"
		}, {
			"location_coordinates": [12.97158, 79.15877],
			"location_timestamp": "2017-05-11T14:25:37.000000Z",
			"marker_type": "NORMAL"
		},{
			"location_coordinates": [13.80758,78.90274],
			"location_timestamp": "2003-05-11T14:24:49.718000Z",
			"marker_type": "NORMAL"
		}, {
			"location_coordinates": [13.72430,78.84351],
			"location_timestamp": "2008-05-11T14:25:37.000000Z",
			"marker_type": "NORMAL"
		}, {
			"location_coordinates": [14.39983,80.02117],
			"location_timestamp": "2010-05-11T14:27:08.000000Z",
			"marker_type": "NORMAL"
		}, {
			"location_coordinates": [13.62188,79.28271],
			"location_timestamp": "2014-05-11T14:29:08.000000Z",
			"marker_type": "NORMAL"
		}, {
			"location_coordinates": [12.97158,79.15877],
			"location_timestamp": "2017-05-11T14:32:16.646000Z",
			"marker_type": "NORMAL"
		}]
	},
	"members": [{
		"status": "ONLINE",
		"same_location": "1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T14:28:44.400000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 826,
		"country_code": "91",
		"id": "e8559a95-8f3e-457c-83d5-ae3842dbf834",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": "2017-05-12T08:16:29.400000Z",
		"name": "Piyush",
		"mobile": "9620365438",
		"location": [12.9956171, 77.7298729],
		"default_group": {
			"department_path": {
				"id": "52826cfa-f07f-4a77-bf35-aa8c85db15a2",
				"name": "Frontend"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/6f326791-e64c-4782-b621-f8ec76c2dedc_JPEG_20170424_105313_303976837.jpg",
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "Frontend",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "52826cfa-f07f-4a77-bf35-aa8c85db15a2"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "piyush@loktra.com",
		"activated_on": "2017-04-26T06:01:16.515857Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "dc32347a-dea6-4f1a-961c-c7bf26797b82",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Testing",
		"mobile": "9011223345",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
				"name": "Engineering"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c5520997-5280-4f9e-9c41-427a126e19e0",
			"name": "Lakshmi Narasimham"
		},
		"user_roles": [{
			"department": "Engineering",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "testing@loktra.com",
		"activated_on": null
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "f5c5ecb2-295e-4976-9b19-e35f9cd6e292",
		"total_tasks": 0,
		"employee_id": "",
		"last_activity_at": null,
		"name": "Testing",
		"mobile": "9874563210",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": null,
		"activated_on": null
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "07915f48-3439-4e0b-9cc7-b65c7a37d6e5",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Hemanth One",
		"mobile": "8233085555",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "abc123@loktra.com",
		"activated_on": null
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "f537bd44-f27a-49b8-8676-a440e8df5a59",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Member Test",
		"mobile": "9494949494",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
				"name": "Design"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "e07f5b45-e76f-44e0-856d-0fd7ca53a226",
			"name": "Ratul Bhowmik"
		},
		"user_roles": [{
			"department": "Design",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "b9439a5c-2b13-4acf-87d9-62c86368a286"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "member@loktra.com",
		"activated_on": "2017-04-30T05:50:59.221963Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "e1efd189-fc6c-4f82-a230-7ffc39fa19ba",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Testing Add Member",
		"mobile": "9977881123",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
				"name": "Engineering"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c5520997-5280-4f9e-9c41-427a126e19e0",
			"name": "Lakshmi Narasimham"
		},
		"user_roles": [{
			"department": "Engineering",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "loktratesting@gmail.com",
		"activated_on": null
	}, {
		"status": "INACTIVE",
		"same_location": "-1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T14:14:44.700000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "294c73a7-7d58-4d30-9b28-1f81a5493e00",
		"total_tasks": 3,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Bony Roopchandani",
		"mobile": "8233085557",
		"location": [12.9945355, 77.729191],
		"default_group": {
			"department_path": {
				"id": "26663257-a545-49d0-979c-cacd814608f5",
				"name": "Backend"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/2dec05ff-e36b-4959-9146-a79095286827_profile_pic.jpg",
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "Backend",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "26663257-a545-49d0-979c-cacd814608f5"
		}],
		"pending_tasks": 3,
		"successful_tasks": 0,
		"email": "bony@loktra.com",
		"activated_on": "2017-04-26T05:14:42.009363Z"
	}, {
		"status": "INACTIVE",
		"same_location": "-1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T13:43:58.300000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "64409164-8fd9-4840-ab0d-4cd0039e5ec2",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Rajendra Bhiwal",
		"mobile": "9314284938",
		"location": [26.918944, 75.7440083],
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/d3749dc2-bd3b-4562-a429-cc26edbc35e7_profile_pic.jpg",
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["admin", "manager", "agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "bhiwal1809@gmail.com",
		"activated_on": "2017-05-06T04:16:39.781139Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "cfc1e8b7-f734-4e72-ad25-99dad6f22ecc",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Sms Member Three",
		"mobile": "8233085557",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["manager", "agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "abc12345@gmail.com",
		"activated_on": null
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "46340506-22b2-4a62-bad9-8290dce9fa7f",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Testing Manager",
		"mobile": "9944552905",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "64409164-8fd9-4840-ab0d-4cd0039e5ec2",
			"name": "Rajendra Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["admin", "manager"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "losdjsj@gmail.com",
		"activated_on": null
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "f4f2456d-f6cc-41bc-9557-cb60e8e6b0ae",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Testing Member",
		"mobile": "9900123456",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
				"name": "Engineering"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c5520997-5280-4f9e-9c41-427a126e19e0",
			"name": "Lakshmi Narasimham"
		},
		"user_roles": [{
			"department": "Engineering",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "testingloktra@gmail.com",
		"activated_on": null
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "a682823d-cb7c-4c2a-a133-1a997b2886ea",
		"total_tasks": 0,
		"employee_id": "",
		"last_activity_at": null,
		"name": "Testing User",
		"mobile": "9874563215",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": null,
		"activated_on": null
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "96802082-f4e3-450b-bb7c-29ee3e16d462",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Sahbdckdwd",
		"mobile": "9896969696",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
				"name": "Design"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "Design",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "b9439a5c-2b13-4acf-87d9-62c86368a286"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "abdhh@loktra.cim",
		"activated_on": "2017-04-30T05:50:59.221963Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "94e2069a-58cd-4f14-ae33-534ad085641a",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Admin Member Test",
		"mobile": "9879081234",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "1a667a07-7bb2-42c1-967f-95fbd7608b1e",
				"name": "Test Group"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "Test Group",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "1a667a07-7bb2-42c1-967f-95fbd7608b1e"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "kano@gmail.com",
		"activated_on": "2017-04-30T05:50:59.221963Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "ca19a835-f8c4-4ace-9b94-ecda4a6d14c9",
		"total_tasks": 0,
		"employee_id": "",
		"last_activity_at": null,
		"name": "Abc",
		"mobile": "9620365789",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": null,
		"activated_on": null
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "ca04e9b6-44c4-4045-8c1b-c2b13b0b60d8",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Asha Bai",
		"mobile": "9663710835",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
				"name": "Design"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "Design",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "b9439a5c-2b13-4acf-87d9-62c86368a286"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "asha@loktra.com",
		"activated_on": "2017-04-30T05:50:59.221963Z"
	}, {
		"status": "ONLINE",
		"same_location": "1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T13:45:44.800000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 165,
		"country_code": "91",
		"id": "5543a16c-61e1-4ede-8e6b-ae9f83334f3e",
		"total_tasks": 7,
		"employee_id": "1",
		"last_activity_at": "2017-05-12T08:23:10.600000Z",
		"name": "Tushar Gupta",
		"mobile": "9971907017",
		"location": [12.9956171, 77.7298729],
		"default_group": {
			"department_path": {
				"id": "26663257-a545-49d0-979c-cacd814608f5",
				"name": "Backend"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/337a99f9-ca6f-4671-afe2-24ce03594dbc_profile_pic.jpg",
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "Backend",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "26663257-a545-49d0-979c-cacd814608f5"
		}],
		"pending_tasks": 6,
		"successful_tasks": 1,
		"email": "tushar@loktra.com",
		"activated_on": "2017-04-29T07:23:43.179877Z"
	}, {
		"status": "ONLINE",
		"same_location": "1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T13:51:52.224000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 827,
		"country_code": "91",
		"id": "e07f5b45-e76f-44e0-856d-0fd7ca53a226",
		"total_tasks": 1,
		"employee_id": "1",
		"last_activity_at": "2017-05-12T08:21:03.156000Z",
		"name": "Ratul Bhowmik",
		"mobile": "8147634118",
		"location": [12.9956171, 77.7298729],
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "31d2a124-54df-4048-a18c-c8ecc4dc272d",
			"name": "Astha Gupta"
		},
		"user_roles": [{
			"department": "Design",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["manager", "agent"],
			"department_id": "b9439a5c-2b13-4acf-87d9-62c86368a286"
		}, {
			"department": "Frontend",
			"region": "Bengaluru",
			"region_id": "8cb6d297-083f-4216-afb2-366a06668f72",
			"roles": ["agent"],
			"department_id": "52826cfa-f07f-4a77-bf35-aa8c85db15a2"
		}, {
			"department": "Engineering",
			"region": "Bengaluru",
			"region_id": "8cb6d297-083f-4216-afb2-366a06668f72",
			"roles": ["manager"],
			"department_id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e"
		}],
		"pending_tasks": 1,
		"successful_tasks": 0,
		"email": "ratul@loktra.com",
		"activated_on": "2017-04-27T05:35:40.876541Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "03a30357-e9e7-4508-b622-6fe9b6bba206",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Testing Role",
		"mobile": "8899245673",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "64409164-8fd9-4840-ab0d-4cd0039e5ec2",
			"name": "Rajendra Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["manager"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "djksdgag@gmail.com",
		"activated_on": null
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "9838e0bb-1dfe-4ad2-b99f-cef01f5c703b",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Testing  Home Page Add Member",
		"mobile": "9224435162",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
				"name": "Engineering"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c5520997-5280-4f9e-9c41-427a126e19e0",
			"name": "Lakshmi Narasimham"
		},
		"user_roles": [{
			"department": "Engineering",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "home@loktra.com",
		"activated_on": null
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "16bf9dac-94ca-49a1-b2a8-dae0aa33ae30",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Sneha Testing",
		"mobile": "9887766450",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
				"name": "Engineering"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c5520997-5280-4f9e-9c41-427a126e19e0",
			"name": "Lakshmi Narasimham"
		},
		"user_roles": [{
			"department": "Engineering",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "shhegg@gmail.com",
		"activated_on": null
	}, {
		"status": "ONLINE",
		"same_location": "1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T13:45:57.700000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 826,
		"country_code": "91",
		"id": "8d74688b-4c08-439d-abf1-6ac0f7d8bf57",
		"total_tasks": 2,
		"employee_id": "1",
		"last_activity_at": "2017-05-12T08:19:39.000000Z",
		"name": "Nirali Modi",
		"mobile": "8884681371",
		"location": [12.9956171, 77.7298729],
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/8acc4b87-a337-4169-884b-5967058d77a0_profile_pic.jpg",
		"manager_data": {
			"id": "c5520997-5280-4f9e-9c41-427a126e19e0",
			"name": "Lakshmi Narasimham"
		},
		"user_roles": [{
			"department": "Backend",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "26663257-a545-49d0-979c-cacd814608f5"
		}, {
			"department": "Engineering",
			"region": "Gujarat",
			"region_id": "43bcf8e3-bcaa-4df3-af7b-bdab6bdb525b",
			"roles": ["manager"],
			"department_id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e"
		}],
		"pending_tasks": 2,
		"successful_tasks": 0,
		"email": "nirali@loktra.com",
		"activated_on": "2017-04-26T05:48:01.109819Z"
	}, {
		"status": "OFFLINE",
		"same_location": "1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T13:52:25.700000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 807,
		"country_code": "91",
		"id": "a6b5d8e3-88e3-459b-a993-011feba53307",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": "2017-05-12T07:56:53.600000Z",
		"name": "Hemanth Kumar",
		"mobile": "9490707807",
		"location": [12.9956171, 77.7298729],
		"default_group": {
			"department_path": {
				"id": "52826cfa-f07f-4a77-bf35-aa8c85db15a2",
				"name": "Frontend"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/a7a9c82c-1d12-4767-919b-386eec1ec19a_profile_pic.jpg",
		"manager_data": {
			"id": "c5520997-5280-4f9e-9c41-427a126e19e0",
			"name": "Lakshmi Narasimham"
		},
		"user_roles": [{
			"department": "Frontend",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "52826cfa-f07f-4a77-bf35-aa8c85db15a2"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "hemanth@loktra.com",
		"activated_on": "2017-04-28T14:46:54.273924Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "597a9981-b0f3-4911-aef5-001d60c5ab2c",
		"total_tasks": 0,
		"employee_id": "",
		"last_activity_at": null,
		"name": "Testuseronetoethree",
		"mobile": "9887654311",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
				"name": "Engineering"
			},
			"region_path": {
				"id": "8cb6d297-083f-4216-afb2-366a06668f72",
				"name": "Bengaluru"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "Engineering",
			"region": "Bengaluru",
			"region_id": "8cb6d297-083f-4216-afb2-366a06668f72",
			"roles": ["agent"],
			"department_id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "testuser123@gmail.com",
		"activated_on": null
	}, {
		"status": "ONLINE",
		"same_location": "1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T07:22:08.800000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 746,
		"country_code": "91",
		"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
		"total_tasks": 1,
		"employee_id": "1",
		"last_activity_at": "2017-05-12T08:24:51.500000Z",
		"name": "Akhil Bhiwal",
		"mobile": "9799719444",
		"location": [12.9956171, 77.7298729],
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/88b983ac-d312-4af9-bb05-0689b9a4f990_profile_pic.jpg",
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["admin", "manager", "agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 1,
		"successful_tasks": 0,
		"email": "akhil@loktra.com",
		"activated_on": "2017-04-28T10:21:26.246886Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "830bdfeb-39dc-4366-8857-ee9c61f6b6f0",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Dashu",
		"mobile": "9988908909",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "lokkj@gmail.com",
		"activated_on": "2017-04-30T05:50:59.221963Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "ab55ad80-4cfc-4150-bf43-1a3d5bcb29c9",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Dafsasss",
		"mobile": "9988908123",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "loasssskkj@gmail.com",
		"activated_on": "2017-04-30T05:50:59.221963Z"
	}, {
		"status": "INACTIVE",
		"same_location": "-1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T12:22:34.300000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "31d2a124-54df-4048-a18c-c8ecc4dc272d",
		"total_tasks": 3,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Astha Gupta",
		"mobile": "9818777191",
		"location": [26.8306899, 75.7756207],
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/26d48f6d-294a-423c-8fec-5fb2e2fbdf0f_from_iphone_4Aprl_Morning.png",
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["admin", "agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 3,
		"successful_tasks": 0,
		"email": "astha@loktra.com",
		"activated_on": "2017-04-26T09:15:06.430642Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "e3a219e9-04fa-4650-ab26-fe3be80468dd",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Dsadassdd",
		"mobile": "9988776789",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "dghgsgaga@gmail.com",
		"activated_on": "2017-04-30T05:50:59.221963Z"
	}, {
		"status": "ONLINE",
		"same_location": "1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T13:42:48.300000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 837,
		"country_code": "91",
		"id": "44b714bf-3e02-4c36-b965-61c52f38fecf",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": "2017-05-12T08:29:34.700000Z",
		"name": "Dushyant Shekhawat",
		"mobile": "9999840235",
		"location": [12.9955567, 77.7297157],
		"default_group": {
			"department_path": {
				"id": "16386e5d-37bf-4591-8517-52dccb0fda7c",
				"name": "Android"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/378c92e0-a1e9-48f4-8c9c-f13add4cc41b_JPEG_20170424_150507_1379523318.jpg",
		"manager_data": {
			"id": "c5520997-5280-4f9e-9c41-427a126e19e0",
			"name": "Lakshmi Narasimham"
		},
		"user_roles": [{
			"department": "Android",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "16386e5d-37bf-4591-8517-52dccb0fda7c"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "dushyant@loktra.com",
		"activated_on": "2017-04-25T13:51:11.590263Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "0b4ed93e-6e7b-4c2f-8211-ff6bb5bdcdee",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Dashu",
		"mobile": "9900908909",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "dgsadgags@gmail.com",
		"activated_on": "2017-04-30T05:50:59.221963Z"
	}, {
		"status": "ONLINE",
		"same_location": "-1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T14:59:27.200000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 835,
		"country_code": "91",
		"id": "c5520997-5280-4f9e-9c41-427a126e19e0",
		"total_tasks": 1,
		"employee_id": "1",
		"last_activity_at": "2017-05-12T08:25:31.000000Z",
		"name": "Lakshmi Narasimham",
		"mobile": "9902945719",
		"location": [12.9963826, 77.7294966],
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/09488bfb-75bb-4ac7-b128-09058b73a713_profile_pic.jpg",
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "Engineering",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["admin", "manager"],
			"department_id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e"
		}, {
			"department": "Test Group",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "1a667a07-7bb2-42c1-967f-95fbd7608b1e"
		}],
		"pending_tasks": 0,
		"successful_tasks": 1,
		"email": "lakshmi@loktra.com",
		"activated_on": "2017-04-26T10:00:57.880094Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "1096f204-e111-4fbb-aad2-cdd4b28a4197",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Testing",
		"mobile": "9900890989",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "asasah@gmail.com",
		"activated_on": "2017-04-30T05:50:59.221963Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "7f88ad73-4ece-4aa7-bbff-721b993da427",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Test Manager",
		"mobile": "9123454566",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "26663257-a545-49d0-979c-cacd814608f5",
				"name": "Backend"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c5520997-5280-4f9e-9c41-427a126e19e0",
			"name": "Lakshmi Narasimham"
		},
		"user_roles": [{
			"department": "Backend",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["manager"],
			"department_id": "26663257-a545-49d0-979c-cacd814608f5"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "test1@oktra.com",
		"activated_on": "2017-04-30T05:50:59.221963Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "66280cb4-c379-4e7f-b082-fea3990397ca",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Caevwrv",
		"mobile": "9696969696",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
				"name": "Design"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "Design",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "b9439a5c-2b13-4acf-87d9-62c86368a286"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "adsks@loktra.com",
		"activated_on": "2017-04-30T05:50:59.221963Z"
	}, {
		"status": "ONLINE",
		"same_location": "1",
		"failed_tasks": 0,
		"last_recorded_timestamps": {
			"last_location_at": "2017-05-11T13:43:21.400000Z",
			"last_activity_at": null
		},
		"last_activity": null,
		"minutes_worked": 835,
		"country_code": "91",
		"id": "1937d09a-1a67-475c-b00c-755eb8e6c5a2",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": "2017-05-12T08:25:26.200000Z",
		"name": "Sneha Sontineni",
		"mobile": "9742834945",
		"location": [12.9956171, 77.7298729],
		"default_group": {
			"department_path": {
				"id": "52826cfa-f07f-4a77-bf35-aa8c85db15a2",
				"name": "Frontend"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/7cc3c518-f266-4fd9-a1df-745f3f0d2c7e_profile_pic.jpg",
		"manager_data": {
			"id": "c5520997-5280-4f9e-9c41-427a126e19e0",
			"name": "Lakshmi Narasimham"
		},
		"user_roles": [{
			"department": "Frontend",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "52826cfa-f07f-4a77-bf35-aa8c85db15a2"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "sneha@loktra.com",
		"activated_on": "2017-04-27T04:15:50.249543Z"
	}, {
		"status": "INACTIVE",
		"failed_tasks": 0,
		"last_activity": null,
		"minutes_worked": 0,
		"country_code": "91",
		"id": "cb67864d-5a35-4e60-9a3e-2efdfddd219b",
		"total_tasks": 0,
		"employee_id": "1",
		"last_activity_at": null,
		"name": "Activity Agent",
		"mobile": "9998976767",
		"last_recorded_timestamps": {
			"last_location_at": null,
			"last_activity_at": null
		},
		"default_group": {
			"department_path": {
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"name": "All"
			},
			"region_path": {
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"name": "PAN India"
			}
		},
		"avatar": null,
		"manager_data": {
			"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
			"name": "Akhil Bhiwal"
		},
		"user_roles": [{
			"department": "All",
			"region": "PAN India",
			"region_id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"roles": ["agent"],
			"department_id": "8b69b9e4-928f-4edb-b19c-3214f93a7586"
		}],
		"pending_tasks": 0,
		"successful_tasks": 0,
		"email": "act@gmail.com",
		"activated_on": null
	}],
	"navigation_details": {
		"root_region": {
			"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
			"name": "PAN India"
		},
		"root_department": {
			"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
			"name": "All"
		},
		"default_path": {
			"department_path": {
				"parent_id": null,
				"parent_name": "",
				"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
				"created_by": null,
				"name": "All"
			},
			"region_path": {
				"parent_id": null,
				"parent_name": "",
				"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
				"created_by": null,
				"name": "PAN India"
			}
		},
		"navigation": [{
			"departments_tree": [{
				"self": {
					"id": "0686cea4-028b-4c1f-8b72-9d12812f9348",
					"name": "Test 123"
				},
				"parent": {
					"id": "1a667a07-7bb2-42c1-967f-95fbd7608b1e",
					"name": "Test Group"
				}
			}, {
				"self": {
					"id": "beba7efc-7d4a-44a9-b7a7-50d57528b0f3",
					"name": "t11"
				},
				"parent": {
					"id": "92af16be-edd8-4e38-a8f4-aa9b8e96b0b5",
					"name": "dsdsd"
				}
			}, {
				"self": {
					"id": "dbc0f99b-4f85-429b-aec5-799a30e33cb7",
					"name": "test"
				},
				"parent": {
					"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
					"name": "Design"
				}
			}, {
				"self": {
					"id": "92af16be-edd8-4e38-a8f4-aa9b8e96b0b5",
					"name": "dsdsd"
				},
				"parent": {
					"id": "1a667a07-7bb2-42c1-967f-95fbd7608b1e",
					"name": "Test Group"
				}
			}, {
				"self": {
					"id": "a46173e4-dbdf-431d-a762-95962ad99aee",
					"name": "new"
				},
				"parent": {
					"id": "92af16be-edd8-4e38-a8f4-aa9b8e96b0b5",
					"name": "dsdsd"
				}
			}, {
				"self": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				},
				"parent": {
					"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
					"name": "All"
				}
			}, {
				"self": {
					"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
					"name": "Design"
				},
				"parent": {
					"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
					"name": "All"
				}
			}, {
				"self": {
					"id": "475bb6e0-d066-4304-bdfd-9b9a40831732",
					"name": "test3"
				},
				"parent": {
					"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
					"name": "Design"
				}
			}, {
				"self": {
					"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
					"name": "All"
				},
				"parent": null
			}, {
				"self": {
					"id": "9b2dc197-8fb9-4725-bdff-bb05238972b2",
					"name": "test2"
				},
				"parent": {
					"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
					"name": "Design"
				}
			}, {
				"self": {
					"id": "26663257-a545-49d0-979c-cacd814608f5",
					"name": "Backend"
				},
				"parent": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				}
			}, {
				"self": {
					"id": "1a667a07-7bb2-42c1-967f-95fbd7608b1e",
					"name": "Test Group"
				},
				"parent": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				}
			}, {
				"self": {
					"id": "16386e5d-37bf-4591-8517-52dccb0fda7c",
					"name": "Android"
				},
				"parent": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				}
			}, {
				"self": {
					"id": "52826cfa-f07f-4a77-bf35-aa8c85db15a2",
					"name": "Frontend"
				},
				"parent": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				}
			}, {
				"self": {
					"id": "7175bade-f21f-4e67-a335-52c1a321f5f9",
					"name": "Design - Engg"
				},
				"parent": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				}
			}],
			"regions_tree": [{
				"self": {
					"id": "43bcf8e3-bcaa-4df3-af7b-bdab6bdb525b",
					"name": "Gujarat"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				},
				"parent": null
			}, {
				"self": {
					"id": "7b48c2a9-bab8-4649-a2a9-3d060623f3a8",
					"name": "Maharashtra"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "9639c59e-fc22-4cda-9762-125851680077",
					"name": "Delhi & NCR"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "a899f879-a847-42e4-8de7-47b47f3612ad",
					"name": "MP"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "617f60f5-91f6-4dd1-85b8-892560ba2142",
					"name": "Andhra Pradesh"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "0e986142-a22e-45ea-8012-1662eccf38be",
					"name": "rajasthan"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "8cb6d297-083f-4216-afb2-366a06668f72",
					"name": "Bengaluru"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}]
		}, {
			"departments_tree": [{
				"self": {
					"id": "0686cea4-028b-4c1f-8b72-9d12812f9348",
					"name": "Test 123"
				},
				"parent": {
					"id": "1a667a07-7bb2-42c1-967f-95fbd7608b1e",
					"name": "Test Group"
				}
			}, {
				"self": {
					"id": "beba7efc-7d4a-44a9-b7a7-50d57528b0f3",
					"name": "t11"
				},
				"parent": {
					"id": "92af16be-edd8-4e38-a8f4-aa9b8e96b0b5",
					"name": "dsdsd"
				}
			}, {
				"self": {
					"id": "dbc0f99b-4f85-429b-aec5-799a30e33cb7",
					"name": "test"
				},
				"parent": {
					"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
					"name": "Design"
				}
			}, {
				"self": {
					"id": "92af16be-edd8-4e38-a8f4-aa9b8e96b0b5",
					"name": "dsdsd"
				},
				"parent": {
					"id": "1a667a07-7bb2-42c1-967f-95fbd7608b1e",
					"name": "Test Group"
				}
			}, {
				"self": {
					"id": "a46173e4-dbdf-431d-a762-95962ad99aee",
					"name": "new"
				},
				"parent": {
					"id": "92af16be-edd8-4e38-a8f4-aa9b8e96b0b5",
					"name": "dsdsd"
				}
			}, {
				"self": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				},
				"parent": {
					"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
					"name": "All"
				}
			}, {
				"self": {
					"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
					"name": "Design"
				},
				"parent": {
					"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
					"name": "All"
				}
			}, {
				"self": {
					"id": "475bb6e0-d066-4304-bdfd-9b9a40831732",
					"name": "test3"
				},
				"parent": {
					"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
					"name": "Design"
				}
			}, {
				"self": {
					"id": "8b69b9e4-928f-4edb-b19c-3214f93a7586",
					"name": "All"
				},
				"parent": null
			}, {
				"self": {
					"id": "9b2dc197-8fb9-4725-bdff-bb05238972b2",
					"name": "test2"
				},
				"parent": {
					"id": "b9439a5c-2b13-4acf-87d9-62c86368a286",
					"name": "Design"
				}
			}, {
				"self": {
					"id": "26663257-a545-49d0-979c-cacd814608f5",
					"name": "Backend"
				},
				"parent": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				}
			}, {
				"self": {
					"id": "1a667a07-7bb2-42c1-967f-95fbd7608b1e",
					"name": "Test Group"
				},
				"parent": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				}
			}, {
				"self": {
					"id": "16386e5d-37bf-4591-8517-52dccb0fda7c",
					"name": "Android"
				},
				"parent": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				}
			}, {
				"self": {
					"id": "52826cfa-f07f-4a77-bf35-aa8c85db15a2",
					"name": "Frontend"
				},
				"parent": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				}
			}, {
				"self": {
					"id": "7175bade-f21f-4e67-a335-52c1a321f5f9",
					"name": "Design - Engg"
				},
				"parent": {
					"id": "8b3c4a18-62c3-4d31-9155-917b1fb66e9e",
					"name": "Engineering"
				}
			}],
			"regions_tree": [{
				"self": {
					"id": "43bcf8e3-bcaa-4df3-af7b-bdab6bdb525b",
					"name": "Gujarat"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				},
				"parent": null
			}, {
				"self": {
					"id": "7b48c2a9-bab8-4649-a2a9-3d060623f3a8",
					"name": "Maharashtra"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "9639c59e-fc22-4cda-9762-125851680077",
					"name": "Delhi & NCR"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "a899f879-a847-42e4-8de7-47b47f3612ad",
					"name": "MP"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "617f60f5-91f6-4dd1-85b8-892560ba2142",
					"name": "Andhra Pradesh"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "0e986142-a22e-45ea-8012-1662eccf38be",
					"name": "rajasthan"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}, {
				"self": {
					"id": "8cb6d297-083f-4216-afb2-366a06668f72",
					"name": "Bengaluru"
				},
				"parent": {
					"id": "b61ea708-b6cb-49dd-a280-b1513442a2a6",
					"name": "PAN India"
				}
			}]
		}],
		"roles": [{
			"role_name": "admin",
			"role_id": "6211d88c-d024-42ce-96a5-d6085ff4c7e5"
		}, {
			"role_name": "manager",
			"role_id": "3e5bfa05-b88c-41f1-9d75-ad4cff08d53e"
		}, {
			"role_name": "agent",
			"role_id": "d4452210-9067-41ab-aec4-a1160b12b1df"
		}]
	},
	"current_user": {
		"home_address": null,
		"id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
		"reporting_manager_id": "c9175998-a3ad-4f91-9f1e-2253c827d5af",
		"employee_id": "1",
		"name": "Akhil Bhiwal",
		"roles": ["admin", "manager"],
		"office_address": null,
		"mobile": "+919799719444",
		"avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/88b983ac-d312-4af9-bb05-0689b9a4f990_profile_pic.jpg",
		"email": "akhil@loktra.com",
		"activated_on": "2017-04-28T10:21:26.246886Z"
	},
	"help_details": {
		"phone": "+91 9090909090",
		"email": "hello@loktra.com"
	}
}
	console.log(main_data);
	Agentmap = new google.maps.Map(document.getElementById("MemberDetailsMap"), {
		zoom: 5,
		mapTypeId: google.maps.MapTypeId.DRIVING,
		mapTypeControl: false,
		streetViewControl: false,
		center: {lat: 20.5937, lng: 78.9629}
	});

	Mapstyles=[{featureType: "water",
				elementType: "all",
				stylers: [{color: "#B6B6B6"}]},
				{	featureType: "poi.park",
					elementType: "all",
					stylers: [{color: "#C8C8C8"}]//"featureType": "road",
				},{	featureType: "road.highway",
				    elementType: "geometry.fill",
				    stylers: [{ color: "#fff" }]
				},{
				  "featureType": "poi",
				  "elementType": "all",
				  "stylers": [{ "saturation": -100 }]
				 }];
	Agentmap.setOptions({styles: Mapstyles});
	google.maps.event.trigger(Agentmap, 'resize');
	$('#MemberDetailsMap').mousedown(function()
		{return false;
	});

	var over_map_btns=document.getElementById('over_map');
	$(over_map_btns).html('');

	var col_2=document.createElement('div');
	$(col_2).addClass('col-md-12 col-sm-12 col-lg-12');
	//$(col_2).css('font-family','Open Sans Semibold, Open Sans Regular, Open Sans');
	$(col_2).css('padding-right','0px');
	$(col_2).css('padding-left','0px');
	var dark_btn=document.createElement('button');
	$(dark_btn).addClass('btn-fault three_btns dark_view_show pull-right');
	$(dark_btn).attr('id','dark_view');
	$(dark_btn).css('padding-left','19px');
	$(dark_btn).css('padding-right','19px');
	$(dark_btn).css('outline','0px');
	$(dark_btn).html('<small>Dark View</small>');
			
	var traffic_btn=document.createElement('button');
	$(traffic_btn).addClass('btn-fault three_btns pull-right');
	$(traffic_btn).attr('id','trafficToggle');
	$(traffic_btn).css('outline','0px');
	$(traffic_btn).css('padding-left','19px');
	$(traffic_btn).css('padding-right','19px');
	$(traffic_btn).html('<small>Traffic</small>');

	/*var tasks_btn=document.createElement('button');
	$(tasks_btn).addClass('btn-fault three_btns pull-right deleteTasks');
	$(tasks_btn).attr('id','tasks_view');
	$(tasks_btn).css('outline','0px');
	$(tasks_btn).css('padding-left','19px');
	$(tasks_btn).css('padding-right','19px');
	if(main_data.member_details.task_details.length==0)
	{
		$(tasks_btn).html('<small>Tasks</small>');
	}
	else
	{
		$(tasks_btn).html('<small>Tasks ('+main_data.member_details.task_details.length+')</small>');
	}*/

	var drop_down=document.createElement('div');
	$(drop_down).addClass('dropdown_agent_map');
	$(drop_down).css('height','40px');	
	$(drop_down).css('width','111px');
    $(drop_down).css('float','right');	

	var raw_btn=document.createElement('button');
	$(raw_btn).addClass('btn-fault three_btns pull-right deleteRaw dropbtn_agent_map');
	$(raw_btn).attr('id','view_type');
	$(raw_btn).css('outline','0px');
	$(raw_btn).css('padding-left','19px');
	$(raw_btn).css('padding-right','19px');

	$(raw_btn).html('<small> View type <i class="fa fa-caret-up" aria-hidden="true"></i></small>');
	
	$(col_2).append(dark_btn);
	$(col_2).append(traffic_btn);
	//$(col_2).append(tasks_btn);

	$(over_map_btns).append(col_2);

	var drop_down_cont=document.createElement('div');
	$(drop_down_cont).addClass('dropdown-content_agent_map font_family');	

	var a1=document.createElement('a');
	$(a1).html('Directions');
	$(a1).attr('id','route');
	var a2=document.createElement('a');
	$(a2).html('Geometric');
	$(a2).attr('id','geometriclines');

	$(drop_down_cont).append(a1);
	$(drop_down_cont).append(a2);

	$(drop_down).append(raw_btn);
	$(drop_down).append(drop_down_cont);
	$(col_2).append(drop_down);
	//$(col_2).append(geometry_btn);
	//$(col_2).append(route_btn);
	google.maps.event.addDomListener(document.getElementById('trafficToggle'), 'click', toggleTraffic);
	
	$('#route').on('click',function(){
		$('#loading').css('display','block');
		$('#loading_row').css('display','block');
		$('#view_type').html('<small> Directions <i class="fa fa-caret-up" aria-hidden="true"></i></small>');
		
		removeLine();
		//pointrs_polylines.setMap(null);
		points_to_geometric_lines=[];	
		deleteMarkers();
		deleteTaskMarkers();
		//deleteRawMarkers();

		$('.tasks').html('');
		$('.tasks').removeClass('tasks');
		//agent_locator
		$('.agent_locator').html('');
		$('.agent_locator').removeClass('agent_locator');
		//stayPointMarker
		$('.stayPointMarker').html('');
		$('.stayPointMarker').removeClass('stayPointMarker');

		$('.stayPointMarker1').html('');
		$('.stayPointMarker1').removeClass('stayPointMarker1');

		$('.rotateMarker').html('');
		$('.rotateMarker').removeClass('stayPointMarker1');

		$('.one').html('');
		$('.one').removeClass('one');

		for(var j=0;j<keep_direction_services.length;j++)
		{
			var delete_route=keep_direction_services[j].dirren;
			delete_route.setMap(null);
		}
		keep_direction_sesrvices=[];//
		markers=[];// clear all default icons
		for (i=0; i<polylines_array.length; i++) 
		{                           
		  	polylines_array[i].setMap(null); //or line[i].setVisible(false);
		}
		polylines_array=[];

		all_latitudes=[];
		all_longitudes=[];
		lineCoordinates=[];
		waypoints_from_polylines=[];

		decodePolyline(encodedStr);
		markersPlotting();
	});
	$('#geometriclines').on('click',function(){

		$('#loading').css('display','block');
		$('#loading_row').css('display','block');
		$('#view_type').html('<small> Geometric <i class="fa fa-caret-up" aria-hidden="true"></i></small>');
		deleteMarkers();
		deleteTaskMarkers();
		//deleteRawMarkers();

		$('.tasks').html('');
		$('.tasks').removeClass('tasks');
		//agent_locator
		$('.agent_locator').html('');
		$('.agent_locator').removeClass('agent_locator');
		//stayPointMarker
		$('.stayPointMarker').html('');
		$('.stayPointMarker').removeClass('stayPointMarker');

		$('.stayPointMarker1').html('');
		$('.stayPointMarker1').removeClass('stayPointMarker1');

		$('.rotateMarker').html('');
		$('.rotateMarker').removeClass('stayPointMarker1');

		$('.one').html('');
		$('.one').removeClass('one');

		for(var j=0;j<keep_direction_services.length;j++)
		{
			var delete_route=keep_direction_services[j].dirren;
			delete_route.setMap(null);
		}
		keep_direction_sesrvices=[];//
		markers=[];// clear all default icons
		for (i=0; i<polylines_array.length; i++) 
		{                           
		  	polylines_array[i].setMap(null); //or line[i].setVisible(false);
		}
		polylines_array=[];

		all_latitudes=[];
		all_longitudes=[];
		lineCoordinates=[];
		waypoints_from_polylines=[];
		geometry();
		markersPlotting();

	});
	//dark view button activity
	var i=0;
	$('.dark_view_show').on('click',function(){
		var number=i++;
		dark_view_show_close(number);
	});	
	/*$('.deleteTasks').on('click',function(){
			
			if((tasks_find%2)==0)
			{
				//console.log('hide');
				TasksPlotting();
			}
			if((tasks_find%2)!=0)
			{
				//console.log('show');
				cleare_tasks();
			}
			tasks_find++;
	});*/

	var div=document.createElement('div');
	$(div).addClass('row');
	$(div).attr('id','loading_row');
	//$(div).css('height','700px');
      	var module_img = document.createElement('img');
      	$(module_img).css('height','220px');
      	$(module_img).css('margin-top','100px');
      	$(module_img).attr('id','loading')
      	$(module_img).attr('src', mem_det_image_common_path+'agentMap_loader.gif');
      	$(div).append(module_img);
    $('#over_map_calender').append(div);

    var div=document.createElement('div');
	$(div).addClass('row');
	$(div).css('display','none');
	$(div).attr('id','raw_loading_row');
	//$(div).css('height','700px');
      	var module_img = document.createElement('img');
      	$(module_img).css('height','220px');
      	$(module_img).css('margin-top','100px');
      	$(module_img).attr('id','raw_loading')
      	$(module_img).css('margin','auto');
		$(module_img).css('display','block');
      	$(module_img).attr('src', mem_det_image_common_path+'agentMap_loader.gif');
      	$(div).append(module_img);
   // $('#over_map_calender').append(div);


	encodedStr=main_data.member_details.location_polylines;//main_data._time_aware_polyline;//test.member_details.location_polylines;
	all_markers=main_data.member_details.marker_data;
	all_markers_for_tasks=main_data.member_details.task_details;

	raw_data=main_data.member_details.task_details;
	if(main_data.status!=200)
	{
		return false;
	}
	if(main_data==null)
	{
		return false;
	}
	if(main_data.member_details.location_polylines.length==0)
	{
		$('#loading').css('display','none');
		return false;
	}

	//statpoints_array=main_data.member_details.task_details
	decodeForGeometry(encodedStr);
	//decodePolyline(encodedStr);
	markersPlotting();

	
}//end place_all_things

function geometry()
{
	
	for(var j=0;j<points_to_geometric_lines.length;j++)
	{
		if(j!=points_to_geometric_lines.length-1)
		{
			var flightPlanCoordinates = [
		        {lat: points_to_geometric_lines[j].latitude, lng: points_to_geometric_lines[j].longitude},
	    	    {lat: points_to_geometric_lines[j+1].latitude, lng: points_to_geometric_lines[j+1].longitude}
		        ];
		    var index=j+1;
		    pointrs_polylines = new google.maps.Polyline({
		        	path: flightPlanCoordinates,
		          	geodesic: true,
		          	strokeColor: '#82B4FF',
		          	strokeOpacity: 1.0,
		          	strokeWeight: 5
		     });
				
		    pointrs_polylines.setMap(Agentmap);
		    polyline.push(pointrs_polylines);
		}
	}
	$('#loading').css('display','none');
	$('#loading_row').css('display','none');
}


function removeLine() {
    for (i=0; i<polyline.length; i++) 
	{                           
		polyline[i].setMap(null); //or line[i].setVisible(false);
	}
}

function cleare_tasks()
{
	deleteTaskMarkers();
}

function setMapOnAllTask(Agentmap) 
{
	if(taskMarkers.length>=1)
	{
		for (var i = 0; i < taskMarkers.length; i++) 
		{
			taskMarkers[i].setMap(Agentmap);
		}
	}	
}

function clearTaskMarkers() {
    setMapOnAllTask(null);
}
 // Deletes all markers in the array by removing references to them.
function deleteTaskMarkers() {
    clearTaskMarkers();
    taskMarkers = [];
}




function decodeForGeometry(encodedStr)
{	
	for(var cords=0;cords<encodedStr.length;cords++)
	{

		points=[ ]
		var index = 0, len = encodedStr[cords].length;
		var lat = 0, lng = 0;
		while (index < len) 
		{
			var b, shift = 0, result = 0;
			do 
			{
				b = encodedStr[cords].charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);

			var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
			lat += dlat;
			shift = 0;
			result = 0;
			do 
			{
				b = encodedStr[cords].charAt(index++).charCodeAt(0) - 63;
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);
			var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
			lng += dlng;
	 
			points.push({latitude:( lat / 1E5),longitude:( lng / 1E5)}) ;

			points_to_geometric_lines.push({latitude:( lat / 1E5),longitude:( lng / 1E5)});

		}
	}
	for(var way=0;way<points.length;way++)
		{		
			waypoints_from_polylines.push({lat:points[way].latitude,lan:points[way].longitude});
			all_latitudes.push(points[way].latitude);
			all_longitudes.push(points[way].longitude);
		}
	geometry();
	overMapButtons();
}	


window.onload=memberDetails_place_all_things();
	