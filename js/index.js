	var main_data={
		"_time_aware_polyline": [
			"owymA{twxMdqJssFlkFccD|_F{tA",
			"koanAe_gyMsMhyEemCxnC",
			"uinnAgylxM{xAowA}_@xhC{d@qbA}HloA"
		],
		"_marker_data": [
			{
			"_location_timestamp": "2016-11-23T23:49:48.23123Z",
			"_location_coordinates": [12.9175,77.6242],
			"_marker_type": "SHIFT ON"
		},
		{
			"_location_timestamp": "2016-11-23T23:49:48.23123Z",
			"_location_coordinates": [12.9394,77.6952],
			"_marker_type": "STAY TIME"
		},
		{
			"_location_timestamp": "2016-11-23T23:49:48.23123Z",
			"_location_coordinates": [12.9275,77.6810],
			"_marker_type": "NORMAL"
		},
		{
			"_location_timestamp": "2016-11-23T23:49:48.23123Z",
			"_location_coordinates": [12.9610,77.6387],
			"_marker_type": "GPS OFF"
		},
		{
			"_location_timestamp": "2016-11-23T23:49:48.23123Z",
			"_location_coordinates": [12.9783,77.6379],
			"_marker_type": "GPS ON"
		},
		{
			"_location_timestamp": "2016-11-23T23:49:48.23123Z",
			"_location_coordinates": [12.9726,77.6253],
			"_marker_type": "PHONE OFF"
		},
		{
			"_location_timestamp": "2016-11-23T23:49:48.23123Z",
			"_location_coordinates": [12.9402,77.5017],
			"_marker_type": "STAY TIME"
		},
		{
			"_location_timestamp": "2016-11-23T23:49:48.23123Z",
			"_location_coordinates": [12.9736, 77.6111],
			"_marker_type": "NORMAL"
		}
	],
	"_agent_profile": {
        "_avatar": "https://s3-ap-southeast-1.amazonaws.com/com.loktra.avatars/u_bony@loktra.com",
        "_email": "bony@loktra.com",
        "_employee_id": "E103",
        "_id": "b5b7b5e1-9101-4526-995f-b93fe2142b60",
        "_joined_since": "2016-12-26T13:34:34.784013Z",
        "_joined_since_date": "Dec 26 2016",
        "_name": "Bony Roopchandani",
        "_phone": "+918233085557",
        "_user_roles": [
          "manager",
          "agent"
        ],
        "_status": {
        	"_last_activity": "2016-11-23T23:49:48.23123Z",
        	"_shift": "ON",
        	"_gps": "ON",
        	"_battery": "50"
        }
    },
    "_tasks": [
    	{
    		"_id": "118e2390-6efb-4ca5-960c-736408738378",
    		"_name": "Collect the assets from customer",
    		"_status": "SUCCESS",
    		"_last_modified": "2016-11-23T23:49:48.23123Z",
    		"_customer_address": "3rd Block, Koramangala, Bengaluru, 560075",
    		"_customer_coordinates": [12.9567083, 77.709295]
    	},
    	{
    		"_id": "118e2390-6efb-4ca5-960c-736408738378",
    		"_name": "Visit customer for sales",
    		"_status": "FAILED",
    		"_last_modified": "2016-11-23T23:49:48.23123Z",
    		"_customer_address": null,
    		"_customer_coordinates": null
    	},
		{
    		"_id": "118e2390-6efb-4ca5-960c-736408738378",
    		"_name": "Visit customer for sales",
    		"_status": "LATEST",
    		"_last_modified": "2016-11-23T23:49:48.23123Z",
    		"_customer_address": "3rd Block, Koramangala, Bengaluru, 560075",
    		"_customer_coordinates": [12.9634, 77.6035]
    	},
		{
    		"_id": "118e2390-6efb-4ca5-960c-736408738378",
    		"_name": "doesnt Collect the assets from customer",
    		"_status": "FAILED",
    		"_last_modified": "2016-11-23T23:49:48.23123Z",
    		"_customer_address": "Hoodi",
    		"_customer_coordinates": [12.9922, 77.7159]
    	},
    ]
	}
	
	var data = main_data._tasks;//_marker_data;
	var infowindow;	//to close other marker if click on particular marker
	
	var	all_markers=main_data._marker_data;//waypoint markers
	all_markers_for_tasks=data;//task markers
	
	var tasks_markers;	
	var class_name;	//to change the class
	var marker_type;
	
	var changing_map_color=0;
	
	var Agentmap;
	var styles;
	var lineCoordinates=[];
	var marker;
	var infowindow;
		
	var waypoints_from_polylines=[];	
	var direction_services_array=[];
	var keep_direction_services=[];
	var waypts_20=[];//to call each 20 for built drection
	var markers = [];
	var greater_value=40;
	var lesser_value=20;
	var polylines_array=[];
	
	var lat_min = '';
	var lat_max = '';
	var lng_min = '';
	var lng_max = '';

	var newVariable = 0;//dynamic variable;
	var newVariable_1=0;
	var create_way_value=0;
	
	var all_latitudes=[];
	var all_longitudes=[];
	//start agentlocationMarker 
	function agentlocationMarker(latlng, Agentmap, imageSrc,type) {
		this.latlng_ = latlng;
		this.imageSrc = imageSrc;
		this.setMap(Agentmap);
		marker_type=type;
		//console.log(marker_type);
	}

	agentlocationMarker.prototype = new google.maps.OverlayView();

	agentlocationMarker.prototype.draw = function () {
		// Check if the div has been created.	
		var div = this.div_;
		if (!div) {
			//console.log(marker_type);
			// Create a overlay text DIV
			div = this.div_ = document.createElement('div');
			// Create the DIV representing our CustomMarker
			div.className = "one";
			var img = document.createElement("img");
			img.src = this.imageSrc;
			div.appendChild(img);
			var div_1=document.createElement('div');
			$(div_1).css('position','relative');
			$(div_1).addClass('agent_locator');
			$(div_1).css('width','130px');
			$(div_1).hide();
			$(div_1).css('padding-left','5px');
			$(div_1).css('padding-right','5px');
			$(div_1).css('-webkit-transform','rotate(45deg)');
			$(div_1).css('-moz-transform','rotate(-45deg)');
			$(div_1).css('-o-transform','rotate(-45deg)');
			$(div_1).css('transform','rotate(-45deg)');
			$(div_1).css('padding-top','5px');
			$(div_1).css('background-color','#424242');
			$(div_1).css('height','60px');
			$(div_1).css('bottom','130px');
			$(div_1).css('top','-100px');
			$(div_1).css('right','-170px');
			$(div_1).css('left','-80px');
			$(div_1).html('<span style="color:green"><b>Latest '+marker_type+'</b></span> <br/><small style="color:white;">Bangalore Central mall, Bangalore, KA</small><br/><small style="color:white;"><b>12:02AM|FEB 27,2016</b></small>');
			$(div).append(div_1);
			$(div).on('click',function(){
				$(div_1).toggle();
			});					
			var panes = this.getPanes();
			panes.overlayImage.appendChild(div);
		}

		var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
			if (point) {
				div.style.left = point.x + 'px';
				div.style.top = point.y + 'px';	
			}
	};

	agentlocationMarker.prototype.getPosition = function () {
		return this.latlng_;
	};
	//end agentlocationMarker
	
	// start unSuccessMarker
	function unSuccessMarker(latlng, Agentmap, imageSrc,type) {
		this.latlng_ = latlng;
		this.imageSrc = imageSrc;
		this.setMap(Agentmap);
		//marker_type=type;
	}

	unSuccessMarker.prototype = new google.maps.OverlayView();

	unSuccessMarker.prototype.draw = function () {
			var div = this.div_;
			if (!div) {
				div = this.div_ = document.createElement('div');

				div.className = "tasks";
				$(div).hide();
				var img = document.createElement("img");
				img.src = this.imageSrc;
				div.appendChild(img);
				
				var panes = this.getPanes();
				panes.overlayImage.appendChild(div);
				$('#tasks_view').on('click',function(){
					$(div).toggle();
				});	
		}

		// Position the overlay 
		var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
		if (point) {
			div.style.left = point.x + 'px';
			div.style.top = point.y + 'px';	
		}
	};

	unSuccessMarker.prototype.getPosition = function () {
		return this.latlng_;
	};
	//end unSuccessMarker
	
	//start stayPointMarker
	function stayPointMarker(latlng, Agentmap, imageSrc,type) {
		this.latlng_ = latlng;
		this.imageSrc = imageSrc;
		this.setMap(Agentmap);
		marker_type=type;
	}

	stayPointMarker.prototype = new google.maps.OverlayView();

	stayPointMarker.prototype.draw = function () {
		var div = this.div_;
		if (!div) {
			div = this.div_ = document.createElement('div');
			div.className = "stayPointMarker";
			//$(div).html();
			var img = document.createElement("div");
			$(img).html('<div style="width:50px;"><img src="img/location.png" style="float:left;"/> 2h 2m</div>');
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
	
	//map declaration
	Agentmap = new google.maps.Map(document.getElementById("map"), {
		zoom: 13,
		//center: new google.maps.LatLng(12.9716, 77.5946),
		mapTypeId: google.maps.MapTypeId.DRIVING,
		mapTypeControl: false,
		streetViewControl: false
	});
	
	styles =[{	featureType: "water",
					elementType: "all",
					stylers: [{color: "#c9c9c9"}]},
					{	featureType: "poi.park",
						elementType: "all",
						stylers: [{color: "black"}]
					}]
	Agentmap.setOptions({styles: styles});
				
	for(var i=0;i<all_markers_for_tasks.length;i++)
	{	
		if(all_markers_for_tasks[i]._customer_coordinates!=null)
		{	
			if(all_markers_for_tasks[i]._status=='FAILED')
			{
				new unSuccessMarker(new google.maps.LatLng(all_markers_for_tasks[i]._customer_coordinates[0],all_markers_for_tasks[i]._customer_coordinates[1]), Agentmap,  "img/work_unsuccess.png",all_markers_for_tasks[i]._status);
			}
			if(all_markers_for_tasks[i]._status=='SUCCESS')
			{
				new unSuccessMarker(new google.maps.LatLng(all_markers_for_tasks[i]._customer_coordinates[0],all_markers_for_tasks[i]._customer_coordinates[1]), Agentmap,  "img/work_success.png",all_markers_for_tasks[i]._status);
			}
			if(all_markers_for_tasks[i]._status=='LATEST')
			{
				//new unSuccessMarker(new google.maps.LatLng(all_markers_for_tasks[i]._customer_coordinates[0],all_markers_for_tasks[i]._customer_coordinates[1]), Agentmap,  "logo.jpg",all_markers_for_tasks[i]._status);
			}
		}			
	}
	
	var agent_location=[];
	for(var i=0;i<all_markers.length;i++)
	{	
		if(i== all_markers.length-1)
		{
			agent_location.push({time:all_markers[i]._location_timestamp,latlan:all_markers[i]._location_coordinates,type:'agent',profileImage: "img/gps_on.png"});	
		}
	}
	
	new agentlocationMarker(new google.maps.LatLng(agent_location[0].latlan[0],agent_location[0].latlan[1]), Agentmap,main_data._agent_profile._avatar,'agent');
	//new CustomMarker_1(new google.maps.LatLng(12.9402,77.5017), Agentmap,'img/work_unsuccess.png','');

	for(var i=0;i<data.length;i++)
	{
		//new CustomMarker(new google.maps.LatLng(data[i]._location_coordinates[0],data[i]._location_coordinates[1]), Agentmap,  data[i].profileImage);
		if(i==data.length-1)
		{
			calculateAndDisplayRoute();
		}
	}
	function calculateAndDisplayRoute()
	{
		var icon;
		all_markers.forEach(function(lat, i) 
		{
			if(all_markers[i]._marker_type=='SHIFT ON')
			{
				icon = {
					url: "img/shift_on.png",
					origin: new google.maps.Point(0,0),
					anchor: new google.maps.Point(10,10)
					};
					color='green';
			}	
			if((all_markers[i]._marker_type=='GPS OFF')||(all_markers[i]._marker_type=='PHONE OFF'))
			{	
				icon = {
					url: "img/gps_off.png",
					anchor: new google.maps.Point(10,10)
				};
				color='red';
			}	
			if((all_markers[i]._marker_type=='SHIFT OFF'))
			{	
				icon = {
					url: "img/shift_off.png",
					anchor: new google.maps.Point(10,10)
				};
				color='red';
			}
			if(all_markers[i]._marker_type=='NORMAL')
			{
				color='blue';
				icon = {
					url: "img/location.png",
					origin: new google.maps.Point(0,0),
					anchor: new google.maps.Point(10,10)
				};
			}
			if(all_markers[i]._marker_type=='STAY TIME')
			{
				color='blue';
				icon = {
					url: "img/stay_point.png",
					scaledSize: new google.maps.Size(50, 50), // scaled size
					origin: new google.maps.Point(0,0), // origin
					anchor: new google.maps.Point(30,32) // anchor
				};
				new stayPointMarker(new google.maps.LatLng(all_markers[i]._location_coordinates[0], all_markers[i]._location_coordinates[1]), Agentmap,'img/work_unsuccess.png','');
			}

			infowindow = new google.maps.InfoWindow();	

			marker = new google.maps.Marker({
				map: Agentmap,
				position: {lat: all_markers[i]._location_coordinates[0], lng: all_markers[i]._location_coordinates[1]},
				icon:icon
			});
			
			markers.push(marker);
			var content;

			var convertingTime=moment(all_markers[i]._location_timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");
			
			var convertingTimeSplit=convertingTime.split(",");
			console.log(convertingTimeSplit)

			content='<div id="content" class="content" style="color:white;padding:2px 5px;"><small>'
					+all_markers[i]._marker_type+'</small><br/><small>'
					+convertingTimeSplit[2]+'|'+convertingTimeSplit[1]+'</small></div>';

			google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infowindow.setContent(content);
						infowindow.open(Agentmap, marker);
					}
			}) (marker, i));
				
			google.maps.event.addListener(infowindow, 'domready', function() {
				/*var iwOuter = $('.gm-style-iw');
				var iwBackground = iwOuter.prev();
				iwBackground.children(':nth-child(2)').css({'display' : 'none'});
				iwBackground.children(':nth-child(4)').css({'display' : 'none'});
				
				iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 95px !important;'});
				iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px','background-color':'black'});
				//iwBackground.children(':nth-child(3)').find('div').children().css({});
				var iwCloseBtn = iwOuter.next();
				iwOuter.parent().parent().css({left: '5px !important'});
				iwCloseBtn.css({opacity: '1', right: '38px', top: '3px',display:'none', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});*/

				// Reference to the DIV that wraps the bottom of infowindow
			    var iwOuter = $('.gm-style-iw');
			    var iwBackground = iwOuter.prev();
			    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

			    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
			    iwOuter.parent().parent().css({left: '5px'});
			    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 95px !important;'});

			    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 95px !important;'});
			    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '99','background-color':'black'});
			    var iwCloseBtn = iwOuter.next();
			    iwCloseBtn.css({opacity: '1', right: '38px', display:'none',top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

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
			
			var waypts = [];
			for (var i = 0; i < all_markers.length; i++) {
				waypts.push({
				  location: new google.maps.LatLng(all_markers[i]._location_coordinates[0], all_markers[i]._location_coordinates[1]),
				  stopover: true
				});
			}
		
			
			var last = all_markers.length-1;
			
			var directionsService = new google.maps.DirectionsService;
			var directionsDisplay = new google.maps.DirectionsRenderer;
			var directionsService2 = new google.maps.DirectionsService;
			var directionsDisplay2 = new google.maps.DirectionsRenderer;
			var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });	
			directionsDisplay.setMap(Agentmap);
			directionsDisplay2.setMap(Agentmap);
			
			directionsService.route({
				origin:new google.maps.LatLng(all_markers[0]._location_coordinates[0],all_markers[0]._location_coordinates[1]),//(lat, lng),//places_to_serve[0],
				destination:new google.maps.LatLng(all_markers[last]._location_coordinates[0],all_markers[last]._location_coordinates[1]),
				waypoints: waypts,
				travelMode: 'DRIVING'
			}, function(response, status) {
				//console.log(response);
				if (status === 'OK') {
					directionsDisplay.setDirections(response);
					directionsDisplay.setOptions({
						 strokeColor: 'blue'
					});
					var route = response.routes[0];
				} else {
				}
			});	
			
			trafficLayer = new google.maps.TrafficLayer();
			/*google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
				this.setZoom(map.getZoom()-1);
				if (this.getZoom() > 15) {
					this.setZoom(15);
				}
			});*/
	}
	//end calculateAndDisplayRoute
	
	//start place_all_things
	function place_all_things()
	{
		var over_map_btns=document.getElementById('over_map');
			var col_1=document.createElement('div');
			$(col_1).addClass('col-md-7 colsm-7 col-lg-7');
			var col_2=document.createElement('div');
			$(col_2).addClass('col-md-5 colsm-5 col-lg-5');
			var dark_btn=document.createElement('button');
			$(dark_btn).addClass('btn btn-default three_btns dark_view_show');
			$(dark_btn).attr('id','dark_view');
			$(dark_btn).css('outline','0px');
			$(dark_btn).html('Dark View');
					
			var traffic_btn=document.createElement('button');
			$(traffic_btn).addClass('btn btn-default three_btns');
			$(traffic_btn).attr('id','trafficToggle');
			$(traffic_btn).css('outline','0px');
			$(traffic_btn).html('Traffic');
				
			var t=0;
				
			var tasks_btn=document.createElement('button');
			$(tasks_btn).addClass('btn btn-default three_btns');
			$(tasks_btn).attr('id','tasks_view');
			$(tasks_btn).css('outline','0px');
			$(tasks_btn).html('Task ('+all_markers_for_tasks.length+')');
	
			$('#tasks_view').on('click',function(){
				$('.tasks').toggle();
			});
			$(col_2).append(dark_btn);
			$(col_2).append(traffic_btn);
			$(col_2).append(tasks_btn);
			
			$(over_map_btns).append(col_1);
			$(over_map_btns).append(col_2);	
				
			var over_map_calender=document.getElementById('over_map_calender');
				var top_row=document.createElement('div');
				$(top_row).addClass('row');
				var coL=document.createElement('div');
				$(coL).addClass('col-md-4 col-sm-4 col-lg-4');
				var coM=document.createElement('div');
				$(coM).addClass('col-md-4 col-sm-4 col-lg-4');	
					
					var button_prev=document.createElement('button');
					$(button_prev).addClass('btn l_t_r_button');
					$(button_prev).css('padding','5px 10px');
					$(button_prev).css('background-color','#333333');
					$(button_prev).css('color','#fff');
					$(button_prev).attr('data-range-key','Yesterday');
					$(button_prev).html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
					$(button_prev).on('click',function(){
						var date_from_ip=$('#changeDate').val();
						var dateA=moment(date_from_ip).subtract(1,'days').format("YYYY-MM-DD");
						var dateB=$('#changeDate').html();
						
						var currentDay=moment().format('YYYY-MM-DD');
						if(currentDay<dateA)
						{
							return false;
						}
						if(currentDay>dateA)
						{
							$('#changeDate').val(dateA);
							$('#changeDate').html(dateA);
							$(button_next).attr('disabled',false);
						}
						if(currentDay==dateA)
						{
							$('#changeDate').val(currentDay);
							$('#changeDate').html('Today');
						}
						$("#changeDate").data('daterangepicker').setStartDate(moment(dateA).subtract(0, 'days'));
						$("#changeDate").data('daterangepicker').setEndDate(moment(dateA).subtract(0, 'days'));
					});
					$(button_prev).css('margin-right','10px');
					var button_current_date=document.createElement('button');
					$(button_current_date).addClass('btn l_t_r_button');
					$(button_current_date).attr('id','changeDate');
					$(button_current_date).css('padding-top','2px');
					$(button_current_date).css('padding-bottom','2px');
					$(button_current_date).css('text-align','center');
					var Present_day=moment().format("YYYY-MM-DD");
					$(button_current_date).html('Today');
					$(button_current_date).css('background-color','#333333');
					$(button_current_date).css('color','#fff');
					$(button_current_date).css('width','130px');

					$(button_current_date).val(Present_day);
					var button_next=document.createElement('button');
					$(button_next).addClass('btn l_t_r_button');
					$(button_next).html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');
					$(button_next).attr('disabled',true);
					$(button_next).on('click',function(){
						var date_from_ip=$('#changeDate').val();
						var dateA=moment(date_from_ip).add(1,'days').format("YYYY-MM-DD");
						var dateB=$('#changeDate').html();
						
						var currentDay=moment().format('YYYY-MM-DD');
						if(currentDay<dateA)
						{
							return false;
						}
						if(currentDay>dateA)
						{
							$('#changeDate').val(dateA);
							$('#changeDate').html(dateA);

						}
						if(currentDay==dateA)
						{
							$('#changeDate').val(currentDay);
							$('#changeDate').html('Today');
						}	
						$("#changeDate").data('daterangepicker').setStartDate(moment(dateA).subtract(0, 'days'));
						$("#changeDate").data('daterangepicker').setEndDate(moment(dateA).subtract(0, 'days'));
					});
					$(button_next).css('margin-left','10px');
					$(button_next).css('padding','5px 10px');
					$(button_next).css('background-color','#333333');
					$(button_next).css('color','#fff');
					
					$(coM).append(button_prev);
					$(coM).append(button_current_date);
					$(coM).append(button_next);
				var coR=document.createElement('div');
				$(coR).addClass('col-md-4 col-sm-4 col-lg-4');
					
			$(top_row).append(coL);
			$(top_row).append(coM);
			$(top_row).append(coR);
			
			$(over_map_calender).append(top_row);
			$('#changeDate').daterangepicker({
				"singleDatePicker": true,
				"timePickerSeconds": true,
				"direction": "ltr",
				"startDate": moment().subtract(0, 'days'),
				"endDate": "03/23/2017",
				 maxDate: new Date()
			}, function(start, end, label) {
				var pass=start;
				moment(pass);
			  	//console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
				//console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
				$('#changeDate').html(start.format('YYYY-MM-DD'));
				$('#changeDate').val(start.format('YYYY-MM-DD'));
				$(button_next).attr('disabled',false);
				console.log(markers);
			});
			//dark view button activity
			var i=0;
			$('.dark_view_show').on('click',function(){
				var number=i++;
				dark_view_show_close(number);
			});		
			google.maps.event.addDomListener(document.getElementById('trafficToggle'), 'click', toggleTraffic);
		}//end place_all_things
		
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
		
		
		var encodedStr = main_data._time_aware_polyline;

		function initialize() 
		{
			for(var cords=0;cords<encodedStr.length;cords++)
			{
				decode(encodedStr[cords]);
				
				if(cords==encodedStr.length-1)
				{
					drawPolyline();
					console.log(keep_direction_services);	
				}
			}
		}
		var var_name=0;	
		function decode(encoded)
		{
			// array that holds the points
			var points=[ ]
			var index = 0, len = encoded.length;
			var lat = 0, lng = 0;
			while (index < len) 
			{
				var b, shift = 0, result = 0;
				do 
				{
					b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
					result |= (b & 0x1f) << shift;
					shift += 5;
				} while (b >= 0x20);

				var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
				lat += dlat;
				shift = 0;
				result = 0;
				do 
				{
					b = encoded.charAt(index++).charCodeAt(0) - 63;
					result |= (b & 0x1f) << shift;
					shift += 5;
				} while (b >= 0x20);
				var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
				lng += dlng;
		 
				points.push({latitude:( lat / 1E5),longitude:( lng / 1E5)})  
			}
			//return points		
			for(var way=0;way<points.length;way++)
			{		
				waypoints_from_polylines.push({lat:points[way].latitude,lan:points[way].longitude});
				var position = new google.maps.LatLng(points[way].latitude, points[way].longitude);
				marker = new google.maps.Marker({
					map: Agentmap,
					position: position
					//icon:icon
				});
				markers.push(marker);
				all_latitudes.push(points[way].latitude);
				all_longitudes.push(points[way].longitude);
			}
			
			//each polyline start and end points
			lineCoordinates.push({lat:points[0].latitude,lan:points[0].longitude});
			lineCoordinates.push({lat:points[points.length-1].latitude,lan:points[points.length-1].longitude});
			var var_for_dir_service=var_name++;
			drawWay(waypoints_from_polylines,var_for_dir_service);
			//console.log(lineCoordinates);
		}	
		function drawPolyline()
		{
			var lineSymbol = {
					path: 'M 0,-1 0,1',
					strokeOpacity: 1,
					strokeWeight: 2,
					scale: 3
				};

				var color = ["#FF0000"];
				var icons = [
					[{
						icon: lineSymbol,
						offset: '50%',
						repeat: '15px'
					}]
				];
				for(var i = 1; i < lineCoordinates.length-1; i++) {
					//console.log(lineCoordinates[i].lat+","+lineCoordinates[i].lat+"--------- "+lineCoordinates[i+1].lat+" "+lineCoordinates[i+1].lan);	
					var line = new google.maps.Polyline({
						path: [
							new google.maps.LatLng(lineCoordinates[i].lat,lineCoordinates[i].lan), 
							new google.maps.LatLng(lineCoordinates[i+1].lat,lineCoordinates[i+1].lan)
						],
						strokeOpacity: 0,
						icons: icons[0],
						strokeColor: color[0],
						map: Agentmap
					});
					polylines_array.push(line);
					i=i+1;
				}
		}
		function drawWay(waypoints_from_polylines,var_for_dir_service)
		{	
			var waypts = [];
			for (var i = 0; i < waypoints_from_polylines.length; i++) {
				waypts.push({
					location: new google.maps.LatLng(waypoints_from_polylines[i].lat,waypoints_from_polylines[i].lan),
					stopover: true
				});
			}
			//console.log(waypoints_from_polylines);	
			var gpsdata_length=waypoints_from_polylines.length-1;
			var twenty_default=20;
			if(waypoints_from_polylines.length>=2)
			{	
				//console.log(waypts.length/20);
				var divis=waypts.length/20;
				//var split=divis.split('.');
				divis++;
				for(var i=0;i<=divis;i++)
				{		
					var DirectionsRenderer=newVariable++;
					newVariable_1++;
					var new_var=DirectionsRenderer+"dirrender";
					console.log(new_var);
					new_var=new google.maps.DirectionsRenderer({ suppressMarkers: true });
					
					
					var directionServices1=newVariable_1+"services";
					console.log(directionServices1)
					directionServices1=new google.maps.DirectionsService();
					direction_services_array.push({dis:directionServices1,dirren:new_var});
					keep_direction_services.push({dis:directionServices1,dirren:new_var});
				}
				var bounds = new google.maps.LatLngBounds();
				for(i=0;i<waypoints_from_polylines.length;i++)
				{	
					if(i<=20)
					{	
						if((i>0)&&(i<20)&&(i!=gpsdata_length))
						{	
							//console.log(i+"---i");
							waypts_20.push({
								location: new google.maps.LatLng(waypoints_from_polylines[i].lat,waypoints_from_polylines[i].lan),
								stopover: true
							});
							//latlong = directionList[i].split(","); //
							  lat = waypoints_from_polylines[i].lat; //
							  lng = waypoints_from_polylines[i].lan; //
							  bounds.extend(new google.maps.LatLng(lat, lng));
							
						}
						
						if((i==20)||(i==gpsdata_length))
						{	
							//console.log('firststart '+0+" end "+i+" waylength "+waypts_20.length);
							//for(var j=0;j<waypts_20.length;j++)
							//{	
								//console.log(waypoints_from_polylines[j].lat+" "+waypoints_from_polylines[j].lan);
							//}
							create_way(direction_services_array[create_way_value].dis,direction_services_array[create_way_value].dirren,waypoints_from_polylines[0].lat,waypoints_from_polylines[0].lan,waypoints_from_polylines[i].lat,waypoints_from_polylines[i].lan,waypts_20);
							waypts_20=[];
						}	
						if(i==gpsdata_length)
						{
							
							var bounds = new google.maps.LatLngBounds();
							//console.log(markers.length);
							for (var i = 0; i < markers.length; i++) {
								//console.log(markers.length);
								//bounds.extend(markers[i].getPosition());
								bounds.extend(markers[i].position);
								//console.log(markers[i])
							}
							Agentmap.fitBounds(bounds);
							//console.log(all_longitudes);	
							
							all_longitudes.sort(sortFloat);
							all_latitudes.sort(sortFloat);
							//console.log(all_longitudes);
							//console.log(all_latitudes);
							//console.log(all_latitudes[0]+"-----min lat long "+all_longitudes[0]);
							//console.log(all_latitudes[all_latitudes.length-1]+"-----min lat long "+all_longitudes[all_longitudes.length-1]);
							Agentmap.setCenter(new google.maps.LatLng(
							  ((all_latitudes[all_latitudes.length-1] + all_latitudes[0]) / 2.0),
							  ((all_longitudes[all_longitudes.length-1] + all_longitudes[0]) / 2.0)
							));
							var a=(all_latitudes[all_latitudes.length-1] + all_latitudes[0]) / 2.0;
							var b=(all_longitudes[all_longitudes.length-1] + all_longitudes[0]) / 2.0;
							//console.log(a+"----------"+b);
							Agentmap.fitBounds(new google.maps.LatLngBounds(
								//bottom left
								new google.maps.LatLng(all_latitudes[0], +all_longitudes[0]),
								//top right
								new google.maps.LatLng(all_latitudes[all_latitudes.length-1], all_longitudes[all_longitudes.length-1])
							));
						}
					}
					
					if((i<=greater_value)&&(i>lesser_value))
					{	
						
						if((i>lesser_value+1)&&(i<greater_value)&&(i!=gpsdata_length))
						{	
							//console.log(i+"---i");
							waypts_20.push({
								location: new google.maps.LatLng(true_entries[i].lat,true_entries[i].lan),
								stopover: true
							});
						}	
						if((i==greater_value)||(i==gpsdata_length))
						{	
							var a=lesser_value+1;
							//console.log('start '+a+" end "+i+" waylength "+waypts_20.length);
							create_way_value++;
							create_way(direction_services_array[create_way_value].dis,direction_services_array[create_way_value].dirren,true_entries[lesser_value+1].lat,true_entries[lesser_value+1].lan,true_entries[i].lat,true_entries[i].lan,waypts_20);
							greater_value=greater_value+20;
							lesser_value=lesser_value+20;
							waypts_20=[];
						}	
						
					}
				}
			}
		}
		function sortFloat(a,b) { return a - b; };
		function create_way(dir,disp,start_1,start_2,stop_1,stop_2)
		{
			//disp = new google.maps.DirectionsRenderer({ suppressMarkers: true });
			dir.route({
				origin:new google.maps.LatLng(start_1,start_2),//(lat, lng),//places_to_serve[0],
				destination:new google.maps.LatLng(stop_1,stop_2),
				waypoints: waypts_20,
				travelMode: 'DRIVING'
			}, function(response, status) {
				if (status === 'OK') {
					disp.setDirections(response);
					disp.setOptions({
						strokeColor: 'blue'
					});
					//var route = response.routes[0];
				} else {
				}
			});
			disp.setMap(Agentmap);
			waypts_20=[];
			waypoints_from_polylines=[];
			direction_services_array=[];
		}
		$(document).ready(function(){
			initialize();
			$('#clear').on('click',function(){

				console.log(markers.length);
			});
		});
		function remove()
		{
			
			deleteMarkers();
			
			$('.tasks').html('');
			$('.tasks').removeClass('tasks');
			//agent_locator
			$('.agent_locator').html('');
			$('.agent_locator').removeClass('agent_locator');
			//stayPointMarker
			$('.stayPointMarker').html('');
			$('.stayPointMarker').removeClass('stayPointMarker');

			console.log(keep_direction_services);	
			for(var j=0;j<keep_direction_services.length;j++)
			{
				var delete_route=keep_direction_services[j].dirren;
				delete_route.setMap(null);
			}
			keep_direction_sesrvices=[];//
			markers=[];// clear all default icons
			console.log(polylines_array);
			for (i=0; i<polylines_array.length; i++) 
			{                           
			  polylines_array[i].setMap(null); //or line[i].setVisible(false);
			}
		}
		function setMapOnAll(Agentmap) 
		{
			if(markers.length>=1)
			{
				for (var i = 0; i < markers.length; i++) {
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
		  		
		window.onload=place_all_things();