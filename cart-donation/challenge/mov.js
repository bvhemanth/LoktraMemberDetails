var movies=[];

$(document).ready(function(){
    $('#Library').hide();       
	$('#search').on('click',function(){
        $('#search').prop("disabled",true);
		$('#searched_movie').show();
		$('#Library').hide();
		var movie_name=$('#mov_ip').val();
		$('#searched_movie').addClass('opacity_lib');
		get_data(movie_name);
	});
	$('#mov_btn').on('click',function(){
		$('#searched_movie').show();
		$('#Library').hide();
	});
	$('#lib_btn').on('click',function(){
		$('#searched_movie').hide();
		$('#Library').show();
	});
});
     var library = [];
        $(function () {
            if (localStorage.library)
            {
                library = JSON.parse(localStorage.library);
                showLibrary();
            }
        });
        window.addEventListener('storage', function(event){
             library = JSON.parse(localStorage.library);
             saveLibrary()
             showLibrary();
            
            if (event.key == 'library_1') {
                    $(function () {
                        if (localStorage.library)
                        {
                            library = JSON.parse(localStorage.library);
                            showLibrary();
                        }
                    });
            }
        }, false);
		
        function addToLibrary() {
            var id = $(this).data('id');
            var name = $(this).data('movie');
            var img = $(this).data('movie_pic');
            // update qty if product is already present
            for (var i in library) {
                if(library[i].id == id)
                {	
					alert('already in library...check in you personnel library');
                    showLibrary();
                    saveLibrary();
                    return;
                }
            }
            // create JavaScript Object
            var item = { m_n: name,id: id, pic:img }; 
            library.push(item);
            saveLibrary();
            showLibrary();
			localStorage.setItem('library_1', 'update' + Math.random());
			alert('Click library to see your favourite movies');
        }

        function deleteItem(index){
            library.splice(index,1); // delete item at index
            showLibrary();
            saveLibrary();
        }

        function saveLibrary() {
            if ( window.localStorage)
            {
                localStorage.library = JSON.stringify(library);
            }
        }

        function showLibrary() {
            if (library.length == 0) {
                $("#fav_library").text("Your library is empty...");
                return;
            }

            $("#fav_library").css("visibility", "visible");
            $("#fav_library").empty();
			var title=document.createElement('div');
			$(title).addClass('row fav_title');
			$(title).html('Favourites');
			$('#fav_library').append(title);
            for (var i in library) {
                var item = library[i];
				var S_n=parseInt(i)+1;
                var row = "<div class='row each_fav' style='margin-bottom:10px;'><div class='col-md-2 col-sm-2 col-lg-2'>"+S_n+".</div><div class='col-md-4 col-sm-4 col-lg-4'> <img src="+item.pic+" height='100' width='100' class='img-rounded'/></div> <div class='col-md-6 col-lg-6 col-sm-6'> " + item.m_n +" "+ " <i class='fa fa-times-circle-o pull-right fa-lg' onclick='deleteItem(" + i + ")' aria-hidden='true'></i></div></div>";	
				$("#fav_library").append(row);
				//<img src="+item.pic+" class='img-rounded' height='100' width='100px'/>
            }
        }
	
function get_data(movie_name)
{	
	movies=[];
	var dataString={'t':movie_name,'y':'','plot':'short','r':'json'}; 
	$.ajax({
		type:"get",
		url:"http://www.omdbapi.com/",
		data:dataString,
		success:function(data)
		{	
			if(!data.Error)
			{
                $('#search').prop("disabled",false);               
				$('#searched_movie').removeClass('opacity_lib');
				var movie_details=document.getElementById('searched_movie');
				$(movie_details).html('');
				movies.push(data);
				update_library();
			}
			if(data.Error)
			{
				alert(data.Error);
                $('#search').prop("disabled",false);
                $('#searched_movie').removeClass('opacity_lib');
                return false;
			}		
		},
		error: function(xhr, status, error) {
		  var err = eval("(" + xhr.responseText + ")");
		  $('#search').prop("disabled",false);
		  $('#searched_movie').removeClass('opacity_lib');
		  alert(err);
		  return false;
		}
	})
}

function update_library()
{	
    $('#search').css('disabled','false');    
	var movie_details=document.getElementById('searched_movie');
	var top_title=document.createElement('div');
	$(top_title).addClass('row results_title');
	var ip_val=$('#mov_ip').val();
	$(top_title).html('<b>Results for '+ip_val+"..........</b>");
	$(movie_details).append(top_title);
	for(var i=0;i<movies.length;i++)
	{
			var each_row=document.createElement('div');
			$(each_row).addClass('row');	
			$(each_row).css('padding','10px 10px 10px 10px');
				var mov_img_act=document.createElement('div');
				$(mov_img_act).addClass('col-md-4 col-sm-4 col-lg-4 col_l_r0');
					
					
					var img_row=document.createElement('div');
					$(img_row).addClass('');
					var btn=document.createElement('button');
					$(btn).addClass('btn btn-success btn-sm pull-lefts');
					$(btn).html('<i class="fa fa-plus-circle" aria-hidden="true"></i> library');
					$(btn).on('click',addToLibrary);
					$(btn).attr('data-id',movies[i].imdbID);
					$(btn).attr('data-movie',movies[i].Title);
					$(btn).attr('data-movie_pic',movies[i].Poster);
					$(img_row).append(btn);
					var img=document.createElement('img');
					if(movies[i].Poster!='N/A')
					{		
						$(img).attr('src',movies[i].Poster);
					}
					else
					{
						$(img).attr('src','img/image5.jpg');
					}
					$(img).addClass('img-rounded');
					$(img).attr('height','200');
					//$(movi_pic_row).append(img);
					$(img_row).append(img);
				 
					$(mov_img_act).append(img_row);
					
					var rating=document.createElement('div');
					$(rating).addClass('');
					$(rating).css('text-align','center');
					$(rating).html("Rating: "+movies[i].Rated);
					$(mov_img_act).append(rating);
					
					var imdb=document.createElement('div');
					$(imdb).addClass('');
					var left=document.createElement('div');
					$(left).addClass('col-md-6 col-sm-6 col-lg-6 col_l_r0');
					$(left).css('text-align','center');
					$(left).html('<i class="fa fa-star-o" aria-hidden="true"></i> '+movies[i].imdbRating);
					$(imdb).append(left);
					var right=document.createElement('div');
					$(right).addClass('col-md-6 col-sm-6 col-lg-6 col_l_r0');
					$(right).css('text-align','center');
					$(right).html('<i class="fa fa-thumbs-up" aria-hidden="true"></i> '+movies[i].imdbVotes);
					$(imdb).append(right);
				$(mov_img_act).append(imdb);
				var rating_div=document.createElement('div');
				$(rating_div).addClass('row col-md-12 col-sm-12 col-lg-12 rating t_a_c');
				$(rating_div).css('width','100%');
					var ip_1=document.createElement('input');
					$(ip_1).attr('type','radio');
					$(ip_1).attr('id','star5');
					$(ip_1).attr('name','rating');
					$(ip_1).attr('value','5');
					$(rating_div).append(ip_1);
					
					var label_1=document.createElement('label');
					$(label_1).addClass('full');
					$(label_1).attr('for','star5');
					$(label_1).attr('title','5');
					$(rating_div).append(label_1);
					
					var ip_2=document.createElement('input');
					$(ip_2).attr('type','radio');
					$(ip_2).attr('id','star4half');
					$(ip_2).attr('name','rating');
					$(ip_2).attr('value','4.5');
					$(rating_div).append(ip_2);
					
					var label_2=document.createElement('label');
					$(label_2).addClass('half');
					$(label_2).attr('for','star4half');
					$(label_2).attr('title','4.5');
					$(rating_div).append(label_2);
					var ip_3=document.createElement('input');
					$(ip_3).attr('type','radio');
					$(ip_3).attr('id','star4');
					$(ip_3).attr('name','rating');
					$(ip_3).attr('value','4');
					$(rating_div).append(ip_3);
	
					var label_3=document.createElement('label');
					$(label_3).addClass('full');
					$(label_3).attr('for','star4');
					$(label_3).attr('title','4');
					$(rating_div).append(label_3);
					
					var ip_4=document.createElement('input');
					$(ip_4).attr('type','radio');
					$(ip_4).attr('id','star3half');
					$(ip_4).attr('name','rating');
					$(ip_4).attr('value','3.5');
					$(rating_div).append(ip_4);
					
					var label_4=document.createElement('label');
					$(label_4).addClass('half');
					$(label_4).attr('for','star3half');
					$(label_4).attr('title','3.5');
					$(rating_div).append(label_4);

	
					var ip_5=document.createElement('input');
					$(ip_5).attr('type','radio');
					$(ip_5).attr('id','star3');
					$(ip_5).attr('name','rating');
					$(ip_5).attr('value','3');
					$(rating_div).append(ip_5);
					
					var label_5=document.createElement('label');
					$(label_5).addClass('full');
					$(label_5).attr('for','star3');
					$(label_5).attr('title','3');
					$(rating_div).append(label_5);
					
					var ip_6=document.createElement('input');
					$(ip_6).attr('type','radio');
					$(ip_6).attr('id','star2half');
					$(ip_6).attr('name','rating');
					$(ip_6).attr('value','2.5');
					$(rating_div).append(ip_6);
					
					var label_6=document.createElement('label');
					$(label_6).addClass('half');
					$(label_6).attr('for','star2half');
					$(label_6).attr('title','2.5');
					$(rating_div).append(label_6);
					
					var ip_7=document.createElement('input');
					$(ip_7).attr('type','radio');
					$(ip_7).attr('id','star2');
					$(ip_7).attr('name','rating');
					$(ip_7).attr('value','2');
					$(rating_div).append(ip_7);
					
					var label_7=document.createElement('label');
					$(label_7).addClass('full');
					$(label_7).attr('for','star2');
					$(label_7).attr('title','2');
					$(rating_div).append(label_7);
					
					var ip_8=document.createElement('input');
					$(ip_8).attr('type','radio');
					$(ip_8).attr('id','star1half');
					$(ip_8).attr('name','rating');
					$(ip_8).attr('value','1.5');
					$(rating_div).append(ip_8);
					
					var label_8=document.createElement('label');
					$(label_8).addClass('half');
					$(label_8).attr('for','star1half');
					$(label_8).attr('title','1.5');
					$(rating_div).append(label_8);
					
					var ip_9=document.createElement('input');
					$(ip_9).attr('type','radio');
					$(ip_9).attr('id','star1');
					$(ip_9).attr('name','rating');
					$(ip_9).attr('value','1');
					$(rating_div).append(ip_9);
					
					var label_9=document.createElement('label');
					$(label_9).addClass('full');
					$(label_9).attr('for','star1');
					$(label_9).attr('title','1');
					$(rating_div).append(label_9);
					
					var ip_10=document.createElement('input');
					$(ip_10).attr('type','radio');
					$(ip_10).attr('id','starhalf');
					$(ip_10).attr('name','rating');
					$(ip_10).attr('value','.5');
					$(rating_div).append(ip_10);
					
					var label_10=document.createElement('label');
					$(label_10).addClass('half');
					$(label_10).attr('for','starhalf');
					$(label_10).attr('title','.5');
					$(rating_div).append(label_10);					
					  
				$(mov_img_act).append(rating_div);
				
				$(each_row).append(mov_img_act);
				
				
				
				var empty_1=document.createElement('div');
				$(empty_1).addClass('col-md-4 col-sm-4 col-lg-4 col_l_r0');
					
					var title=document.createElement('div');
					$(title).addClass('row');
					$(title).html("<label><b>Movie Title:</b></label> "+movies[i].Title);
					$(empty_1).append(title);
					
					var actors=document.createElement('div');
					$(actors).addClass('row');
					$(actors).html("<label><b>Actors:</b></label> "+movies[i].Actors);
					$(empty_1).append(actors);
					
					var direct=document.createElement('div');
					$(direct).addClass('row');
					$(direct).html("<label><b>Director:</b></label> "+movies[i].Director);
					$(empty_1).append(direct);
					
					var country=document.createElement('div');
					$(country).addClass('row');
					$(country).html("<label><b>Country:</b></label> "+movies[i].Country);
					$(empty_1).append(country);
					
					var language=document.createElement('div');
					$(language).addClass('row');
					$(language).html("<label><b>Language:</b></label> "+movies[i].Language);
					$(empty_1).append(language);
					
					var awards=document.createElement('div');
					$(awards).addClass('row');
					$(awards).html("<label><b>Awards:</b></label> "+movies[i].Awards);
					$(empty_1).append(awards);
					
					var released=document.createElement('div');
					$(released).addClass('row');
					$(released).html("<label><b>Released Date:</b></label> "+movies[i].Released);
					$(empty_1).append(released);
					
					var genre=document.createElement('div');
					$(genre).addClass('row');
					$(genre).html("<label><b>Genre:</b></label> "+movies[i].Genre);
					$(empty_1).append(genre);
					//Response Runtime
					
					var resp=document.createElement('div');
					$(resp).addClass('row');
					$(resp).html("<label><b>Response:</b></label> "+movies[i].Response);
					$(empty_1).append(resp);
					
					var run=document.createElement('div');
					$(run).addClass('row');
					$(run).html("<label><b>Duration:</b></label> "+movies[i].Runtime);
					$(empty_1).append(run);
				$(each_row).append(empty_1);	
				var empty_2=document.createElement('div');
				$(empty_2).addClass('col-md-4 col-sm-4 col-lg-4 col_l_r0');	
					
					var Plot=document.createElement('div');
					$(Plot).addClass('row');
					$(Plot).html("<label><b>Plot: </b></label>"+movies[i].Plot);
					$(empty_2).append(Plot);
					
					var meta=document.createElement('div');
					$(meta).addClass('row');
					$(meta).html("<label><b>Metascore:</b></label> "+movies[i].Metascore);
					$(empty_2).append(meta);
					//Writer
					
					var writer=document.createElement('div');
					$(writer).addClass('row');
					$(writer).html("<label><b>Writers: </b></label>"+movies[i].Writer);
					$(empty_2).append(writer);
			$(each_row).append(empty_2);
			$(movie_details).append(each_row);	
			var review=document.createElement('div');
			$(review).addClass('row');
		        var wrt_rev=document.createElement('label');
                        $(wrt_rev).html('Write review');
                        $(review).append(wrt_rev); 
				var review_tex=document.createElement('textarea');
				$(review_tex).css('width','100%');
				$(review_tex).addClass('form-control');
				$(review_tex).attr('placeholder','add review ...');
			$(review).append(review_tex);
                         var btn_row=document.createElement('div');
                        $(btn_row).addClass('row'); 
                                var r_btn=document.createElement('button');
                                $(r_btn).addClass('btn btn-success btn-block');
                                $(r_btn).html('Add Review'); 
                        $(btn_row).append(r_btn);
                         $(review).append(btn_row);   
               $(movie_details).append(review);                
	
	}
	
}
