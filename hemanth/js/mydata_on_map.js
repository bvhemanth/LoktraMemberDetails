/*server*/
var mem_det_image_common_path='img/';// common image path
/*end server*/

 /*local*/
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
		this.setZoom(zoomfactor+1);
	});
}
//end placing overMapButtons

//initially place_all_things
function memberDetails_place_all_things()
{	
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
	"member_details": {
		"agent_profile": {
			"status": {
				"status": "ONLINE",
				"battery": 13.0,
				"shift": "ON",
				"last_activity": "2017-06T18:17:33.452000Z",
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
		"location_polylines": ["gajsAqsp`NzgAq`@ngOdqJa}bCk_eFd}vCjfoC??j_~BreWqlBz`cHvn@nwBovAmuO"],
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
			"location_coordinates": [13.62162,79.29025],
			"location_timestamp": "2014-05-11T14:29:08.000000Z",
			"marker_type": "NORMAL"
		}, {
			"location_coordinates": [12.97158,79.15877],
			"location_timestamp": "2017-05-11T14:32:16.646000Z",
			"marker_type": "NORMAL"
		},
		{"location_coordinates": [12.98911,77.66343], "location_timestamp": "2016-04-03T13:35:21.600000Z", "marker_type": "STAY POINT", "stay_duration": {"shift_on_duration": "Aug 15", "start_time": "2015-07-03T08:33:38.700000Z", "end_time": "2016-04-03T13:35:21.600000Z", "shift_off_duration": "Apr 2016"}},
		{"location_coordinates": [12.98147,77.64415], "location_timestamp": "2017-03-03T13:35:21.600000Z", "marker_type": "STAY POINT", "stay_duration": {"shift_on_duration": "Jun 16", "start_time": "2016-07-03T08:33:38.700000Z", "end_time": "2017-03-03T13:35:21.600000Z", "shift_off_duration": "Mar 2017"}},
		{"location_coordinates": [12.99547,77.72966], "location_timestamp": "2017-03-03T13:35:21.600000Z", "marker_type": "STAY POINT", "stay_duration": {"shift_on_duration": "Mar 17", "start_time": "2017-03-03T08:33:38.700000Z", "end_time": "2017-04-03T13:35:21.600000Z", "shift_off_duration": "Present"}}]
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

	$(raw_btn).html('<small> Directions <i class="fa fa-caret-up" aria-hidden="true"></i></small>');
	
	$(col_2).append(dark_btn);
	$(col_2).append(traffic_btn);
	//$(col_2).append(tasks_btn);

	$(over_map_btns).append(col_2);

	//$(col_2).append(geometry_btn);
	//$(col_2).append(route_btn);
	google.maps.event.addDomListener(document.getElementById('trafficToggle'), 'click', toggleTraffic);

	//dark view button activity
	var i=0;
	$('.dark_view_show').on('click',function(){
		var number=i++;
		dark_view_show_close(number);
	});	

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
   	//$('#over_map_calender').append(div);
	encodedStr=main_data.member_details.location_polylines;//main_data._time_aware_polyline;//test.member_details.location_polylines;
	all_markers=main_data.member_details.marker_data;
	all_markers_for_tasks=main_data.member_details.task_details;

	raw_data=main_data.member_details.task_details;
	//statpoints_array=main_data.member_details.task_details
	//decodeForGeometry(encodedStr);
	decodePolyline(encodedStr);
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
	
