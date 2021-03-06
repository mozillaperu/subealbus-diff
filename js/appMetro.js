// Obtener posicion
function miPosicion(callback) {
			
	if (!navigator.geolocation){
		console.log("Geolocation is not supported by your browser");
		return false;
	}
 
	function success(position) {
		var latitude  = position.coords.latitude;
		var longitude = position.coords.longitude;
		callback(latitude,longitude);			
	}
 
	function error() {
		console.log("Unable to retrieve your location");
	}	

	navigator.geolocation.getCurrentPosition(success, error);			
}

function distaciaMenor(miLatitud, miLongitud, estacionLatitud, estacionLongitud, estacion){

	var R = 6371; // km
	var dLat = (estacionLatitud-miLatitud).toRad();
	var dLon = (estacionLongitud-miLongitud).toRad();
	var lat1 = miLatitud.toRad();
	var lat2 = estacionLatitud.toRad();

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;

	return [d,estacion];

}

function btnEvents(btnName){
	$('#btn-' + btnName).click(function (){
		//$('#settings-view').removeClass('bajar');
		//$('.active').removeClass('active');		
		$('#titulo').html($('#' + btnName).attr('alt'));		
	});
}

// NEW
function makeLink(text) // this REGEX converts http(s) links that are embedded in the tweet text into real hyperlinks.
{  
var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;  
return text.replace(exp,"<a href='$1' target='_blank'>$1</a>");
} 

Number.prototype.pad = function (len) {
    return (new Array(len+1).join("0") + this).slice(-len);
}

function getTweets(){
	var twitterTimeLine = "http://subealmetro.willyaguirre.me/lineauno.php";

    $.getJSON(twitterTimeLine, function(text){
        $.each(text, function(key, value){
          $('#tweet').append(
              '<li style="height:auto;padding-bottom:1.5rem;">'
            +   	'<div class="imgLeft">'
            +			'<img src="'+value.user.profile_image_url+'"/>'
            +		'</div>'
            +		'<h1 class="titleTwitter">'+value.user.name+'<span class="usertwitter"> @' + value.user.screen_name +'</span></h1>' 
            +		'<p style="padding:0px;line-height:1.6rem;font-size:1.2rem;white-space:normal;">'+makeLink(value.text)+'</p>'  				
            +	'</li>'
            );  			
      	});
    });	
}

$(document).ready(function(){

	$.getJSON('js/estaciones.json', function(response){
		$.each(response.estaciones, function(index, result){
			$('.estaciones').append('<li id="IdEstacion" data-estacion="'+result.estacion+'"><aside class="pack-end"><img id="gethora" alt="placeholder" src="images/hora.png"></aside><p class="nombreEstacion">Estación <b>'+result.estacion+'</b></p></li>');
			//distancia = distaciaMenor(miLatitud, miLongitud, result.latitud, result.longitud, result.estacion)
			//resultados.push(distancia);
		});
	});

	// Acceso a internet
	var xhr = new XMLHttpRequest({
	    mozSystem: true
	});

	//$('.active').addClass('active');	

  	var buttons = ['estacion', 'mapa', 'twitter', 'info'];
	$.map(buttons, function(button){
		btnEvents(button);
	});

	var miLatitud;
	var miLongitud;
	var result;
	var estacionCercana;

	

	/*miPosicion(function(latitude,longitude,result){

		miLatitud = latitude;
		miLongitud = longitude;		

		var resultados = [];
		var distancia;

		$.ajax({ //zeptojs
		async: true
		});

		$.getJSON('js/estaciones.json', function(response){
			$.each(response.estaciones, function(index, result){
				//$.each(item, function(index, result){											
					//$('.estaciones').append('<li id="IdEstacion" data-estacion="'+result.estacion+'"><aside class="pack-end"><img id="gethora" alt="placeholder" src="images/hora.png"></aside><p class="nombreEstacion">Estación <b>'+result.estacion+'</b></p></li>');
					distancia = distaciaMenor(miLatitud, miLongitud, result.latitud, result.longitud, result.estacion)
					resultados.push(distancia);
					//console.log(distancia);					
				//});
			}, function(){
				console.log('some wrong');
			});
		});

		$.ajax({
		async: false
		});

		var distaciaMinimo = Math.min.apply(Math, resultados.map(function(i) {
		    return i[0];
		}));

		estacionCercana = $.grep(resultados, function(v,i) {
		    return v[0] === distaciaMinimo;
		});

		result = estacionCercana[0][1]

		verificar(result);		

	});*/
	
	/*$.ajax({
		async: false
	});*/

	// Estaciones
	/*$.getJSON('js/estaciones.json', function(response){
		$.each(response, function(index, item){
			$.each(item, function(index, result){
				$('.estaciones').append('<li id="IdEstacion" data-estacion="'+result.estacion+'"><aside class="pack-end"><img id="gethora" alt="placeholder" src="images/hora.png"></aside><p class="nombreEstacion">Estación <b>'+result.estacion+'</b></p></li>');
			});			  
		});
	});*/

	/*$.ajax({
		async: true
	});*/

	function verificar(result){
		var notification = navigator.mozNotification.createNotification(
                "La estación mas cercana es: ",
                "Estación "+result+""
            );
		//var resultados = [];
		$("li #IdEstacion").each(function( index ) {

			if($(this).text() == 'Estación '+ result){
				notification.show();
				$(this).addClass('estacionActiva');
				//console.log('si')
			}else {
				//console.log('si')
			}

		});
		
		return result;
	}

	function verificarHora(result){		
		//var resultados = [];
		$("li #horaSalida").each(function( index ) {
		var algo = "16:41"								
			if(algo == result){	
				//alert('ok')			
				//s$(this).addClass('horaRumboGrauActual')
				//console.log('si')
			}else {
				//console.log('si')
			}
		});
		
		return result;
	}

	$(document).on("click", "#IdEstacion", function(){

		var algo = "16:41";

		verificarHora(algo)

		var fechaActual = new Date();

		var hora = fechaActual.getHours() + ":"  
                 + fechaActual.getMinutes();

		var estacion = $(this).data("estacion")
		$('#tituloNombreEstacion').html(estacion);
		
		$.getJSON('js/horarios.json', function(text){

			$.each(text, function(key, value){

				$.each(value, function(index, result){
					var validar = false					
					if(result.nombre == estacion){
						validar = true
						$("#listHorarios").html('')	
					}
					if(validar){
						for(i=0;i<result.GRAU.length;i++){

							$("#listHorarios").append("<li id='contieneHoraSalida'><p id='horaSalida'>"+result.GRAU[i]+"</p><p id='horaRegreso'>"+result.VES[i]+"</p></li>");
							var rumboAGrau = new Date('1988','01','01',''+result.GRAU[i].substr(0,2)+'',''+result.GRAU[i].substr(3,5)+'')
							var rumboAGrauHora = rumboAGrau.getHours().pad(2) + ":"  
                 								+ rumboAGrau.getMinutes().pad(2);
                 			               			

						}

					}					

				});

			});	
  			
		});	
		

		$("#settings-view").removeClass("bajar");		
		$("#settings-view").addClass("subir");
	});

	$(document).on('click', '#settings-btn', function(){		
		$('#settings-view').removeClass('subir');
		$('#settings-view').addClass('bajar');
	});
	
	$(document).on('click', '#btn-twitter', function(){
			getTweets();
	});
	
});

function agregarUbicacion(longitud, latitud, icon, w, h){
	var coor_from = new OpenLayers.Projection("EPSG:4326");
	var coor_to   = new OpenLayers.Projection("EPSG:900913");
	var size = new OpenLayers.Size(w,h);
	var offset = new OpenLayers.Pixel(-(size.w), -size.h);
	var icon = new OpenLayers.Icon(icon,size,offset);
	var mark = new OpenLayers.LonLat(longitud,latitud);
	return markers.addMarker(new OpenLayers.Marker(mark.transform(coor_from, coor_to),icon));
}
	
		var coor_from = new OpenLayers.Projection("EPSG:4326");
		var coor_to   = new OpenLayers.Projection("EPSG:900913");

		map = new OpenLayers.Map("info-mapa");

		map.addLayer(new OpenLayers.Layer.OSM());
		map.zoomToMaxExtent();
		var center    = new OpenLayers.LonLat(-77.0071244, -12.1160213);
		center.transform(coor_from, coor_to);
		map.addLayer(new OpenLayers.Layer.OSM());
		map.setCenter(center, 12);

		var markers = new OpenLayers.Layer.Markers( "Markers" );
		map.addLayer(markers);

		$.getJSON('js/estaciones.json', function(response){
			$.each(response.estaciones, function(index, result){
				//$.each(item, function(index, result){
					agregarUbicacion(result.longitud, result.latitud, result.icon, result.w, result.h)
				//});
			});
		});
