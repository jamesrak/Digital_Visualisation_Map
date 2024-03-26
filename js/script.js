// Global Variable
var mapbox_tileset_id = "mapbox://jamesrak.1txn2tdn"
var mapbox_tileset_layer = "uk_ghg_emission_2020"
var mapbox_style_url = "mapbox://styles/jamesrak/cleyvltrf001d01o3fmf32hlj"

// Mapbox Initialisation
mapboxgl.accessToken = 'pk.eyJ1IjoiamFtZXNyYWsiLCJhIjoiY2p6aHNsbGtkMHZ5czNlcGhmcWh6eTYxOSJ9.sfyNLBf4VsDjjClwB8H2MA';
var map = new mapboxgl.Map({
	container: 'map',
	style: mapbox_style_url,
	center: [-1.755, 52.544],
	zoom: 6,
	transition: {
		'duration': 1000,
		'delay': 0
	}
});

// Google Chart Initialisation
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart)

// Draw stacked bar chart
  function drawChart() {

	// grab the CSV
	$.get("data/top10_co2_emission.csv", function(csvString) {
		// transform the CSV string into a 2-dimensional array
		var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
  
		// this new DataTable object holds all the data
		var data = new google.visualization.arrayToDataTable(arrayData);
		// this view can select a subset of the data at a time
		var view = new google.visualization.DataView(data);
		view.setColumns([3,6,9,11,7,8,10]);
		console.log(view)
  
	// Set chart options
	var options = {'title':'Top 10 areas that produce the most CO2',
				   'width':450,
				   'height':300,
				   chartArea: {width: '35%'},
				   'legend': {textStyle: {color: 'white'}, position: 'right', alignment: 'start'},
				   'titleTextStyle': {
					color: 'white'
				},
				hAxis: {
					textStyle:{color: '#FFF'},
					viewWindow: {
						min: 0,
						max: 7000
					},
				},
				vAxis: {
					textStyle:{color: '#FFF'}
				},
				   'backgroundColor': '#262626',
				   isStacked: 'true'
				};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.BarChart(document.getElementById('ghg_chart'));
	chart.draw(view, options);
	});
  }

//   function drawPieChart() {

// 	// grab the CSV
// 	$.get("data/ghg_emission_v2_2020.csv", function(csvString) {
// 		// transform the CSV string into a 2-dimensional array
// 		var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
  
// 		// this new DataTable object holds all the data
// 		var data = new google.visualization.arrayToDataTable(arrayData);
// 		// this view can select a subset of the data at a time
// 		var view = new google.visualization.DataView(data);
// 		view.setColumns([6,11]);
// 		console.log(view)
  
// 	// Set chart options
// 	var options = {'title':'CO2 Emission by Sector',
// 				   'width':150,
// 				   'height':150,
// 				   'legend': {textStyle: {color: 'white'}},
// 				   'titleTextStyle': {
// 					color: 'white'
// 				},
// 				hAxis: {
// 					textStyle:{color: '#FFF'}
// 				},
// 				vAxis: {
// 					textStyle:{color: '#FFF'}
// 				},
// 				   'backgroundColor': '#262626'};

// 	// Instantiate and draw our chart, passing in some options.
// 	var chart = new google.visualization.PieChart(document.getElementById('sector_donut_chart'));
// 	chart.draw(view, options);
// 	});
//   }

// Load mapbox
map.on('load', function () {

	// Create a popup, but don't add it to the map yet.
	var popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false
	});
	// style and handle popup
	map.on('click', 'uk-ghg-emission-2020-v2', function(e) {
			// console.log("hello")
			// Change the cursor style as a UI indicator.
			map.getCanvas().style.cursor = 'pointer';
			var description = '<p class = "tooltip-header-2"> ' + e.features[0].properties['Local Authority'] + " </p>\
			<p class = 'tooltip-2'><br>Region: " + e.features[0].properties.Region + "</p>\
			<p class = 'tooltip-2'>CO2 Emission (kt CO2e): " + e.features[0].properties['Grand Total']+"<\p>\
			<p class = 'tooltip-2'>-----------------------------------<\p>\
			<p class = 'tooltip-2 font-weight-bold'> CO2 Emission by Sector (kt CO2e)<\p>\
			<div id=\"sector_donut_chart\"></div>"
			// console.log(description)

			var tablehtml = '<table class="table table-dark">\
			<thead>\
			  <tr>\
				<th scope="col">#</th>\
				<th scope="col">Sector</th>\
				<th scope="col">Value</th>\
				<th scope="col">%</th>\
			  </tr>\
			</thead>\
			<tbody>\
			  <tr>\
				<th scope="row">1</th>\
				<td>Transport</td>\
				<td>'+e.features[0].properties['Transport']+'</td>\
				<td>'+Math.round(e.features[0].properties['Transport']/e.features[0].properties['Grand Total']*100)+'</td>\
			  </tr>\
			  <tr>\
				<th scope="row">2</th>\
				<td>Domestic</td>\
				<td>'+e.features[0].properties['Domestic']+'</td>\
				<td>'+Math.round(e.features[0].properties['Domestic']/e.features[0].properties['Grand Total']*100)+'</td>\
			  </tr>\
			  <tr>\
			  <th scope="row">3</th>\
			  <td>Industry</td>\
			  <td>'+e.features[0].properties['Industry']+'</td>\
			  <td>'+Math.round(e.features[0].properties['Industry']/e.features[0].properties['Grand Total']*100)+'</td>\
			</tr>\
			  <tr>\
				<th scope="row">4</th>\
				<td>Commercial</td>\
				<td>'+e.features[0].properties['Commercial']+'</td>\
				<td>'+Math.round(e.features[0].properties['Commercial']/e.features[0].properties['Grand Total']*100)+'</td>\
			  </tr>\
			<tr>\
			<th scope="row">5</th>\
			<td>Agriculture</td>\
			<td>'+e.features[0].properties['Agriculture']+'</td>\
			<td>'+Math.round(e.features[0].properties['Agriculture']/e.features[0].properties['Grand Total']*100)+'</td>\
		  </tr>\
		  <tr>\
		  <th scope="row">6</th>\
		  <td>Public Sector</td>\
		  <td>'+e.features[0].properties['Public Sector']+'</td>\
		  <td>'+Math.round(e.features[0].properties['Public Sector']/e.features[0].properties['Grand Total']*100)+'</td>\
		</tr>\
			</tbody>\
		  </table>'

		  description = description.concat(tablehtml)

			popup
				.setLngLat(e.lngLat)
				.setHTML(description)
				.addTo(map);

		});


	map.on('mouseleave', 'uk-ghg-emission-2020-v2', function() {
		// print("leave")
		map.getCanvas().style.cursor = '';
		popup.remove();
	}); 

	///////// Handle buttons events
	const transportBtn = document.getElementById('button-transport')
	const domesticBtn = document.getElementById('button-domestic')
	const industryBtn = document.getElementById('button-industry')
	const commercialBtn = document.getElementById('button-commercial')
	const agricultureBtn = document.getElementById('button-agriculture')
	const publicsectorBtn = document.getElementById('button-publicsector')

	layer_sector_list = ['uk-ghg-emission-2020-transport','uk-ghg-emission-2020-domestic','uk-ghg-emission-2020-industry','uk-ghg-emission-2020-commercial','uk-ghg-emission-2020-agriculture','uk-ghg-emission-2020-publicsector']
	button_list = [transportBtn,domesticBtn,industryBtn,commercialBtn,agricultureBtn,publicsectorBtn]

	// $("button").click(function() {
	// 	$(this).toggleClass('btn-primary btn-info');
	//   });

	transportBtn.onclick = () => {
		for (var i = 0; i < layer_sector_list.length; i++) {
			if(layer_sector_list[i] != 'uk-ghg-emission-2020-transport'){
				map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
				map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
			}
		}
		map.setLayoutProperty('uk-ghg-emission-2020-transport', 'visibility', 'visible');
		map.setLayoutProperty('uk-ghg-emission-2020-transport-line', 'visibility', 'visible');

		if(transportBtn.value=="ON"){
			for (var i = 0; i < layer_sector_list.length; i++) {
				if(layer_sector_list[i] != 'uk-ghg-emission-2020-v2'){
					map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
					map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
				}
			}
			map.setLayoutProperty('uk-ghg-emission-2020-v2', 'visibility', 'visible');
			// $('#button-transport').addClass("btn-info").remove("btn-primary");
			transportBtn.value="OFF";
		}
	  	else if(transportBtn.value=="OFF"){
			// $('#button-transport').addClass("btn-primary").remove("btn-info");
			// $('#button-domestic').css('btn-primary');
			// $('#button-industry').css('btn-primary');
			transportBtn.value="ON";
		}
	}

	domesticBtn.onclick = () => {
		for (var i = 0; i < layer_sector_list.length; i++) {
			if(layer_sector_list[i] != 'uk-ghg-emission-2020-domestic'){
				map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
				map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
			}
		}
		map.setLayoutProperty('uk-ghg-emission-2020-domestic', 'visibility', 'visible');
		map.setLayoutProperty('uk-ghg-emission-2020-domestic-line', 'visibility', 'visible');
		if(domesticBtn.value=="ON"){
			for (var i = 0; i < layer_sector_list.length; i++) {
				if(layer_sector_list[i] != 'uk-ghg-emission-2020-v2'){
					map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
					map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
				}
			}
			map.setLayoutProperty('uk-ghg-emission-2020-v2', 'visibility', 'visible');
			domesticBtn.value="OFF";
		}
	  	else if(domesticBtn.value=="OFF"){
			domesticBtn.value="ON";
		}
	}
	

	industryBtn.onclick = () => {
		for (var i = 0; i < layer_sector_list.length; i++) {
			if(layer_sector_list[i] != 'uk-ghg-emission-2020-industry'){
				map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
				map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
			}
		}
		map.setLayoutProperty('uk-ghg-emission-2020-industry', 'visibility', 'visible');
		map.setLayoutProperty('uk-ghg-emission-2020-industry-line', 'visibility', 'visible');
		if(industryBtn.value=="ON"){
			for (var i = 0; i < layer_sector_list.length; i++) {
				if(layer_sector_list[i] != 'uk-ghg-emission-2020-v2'){
					map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
					map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
				}
			}
			map.setLayoutProperty('uk-ghg-emission-2020-v2', 'visibility', 'visible');
			industryBtn.value="OFF";
		}
	  	else if(industryBtn.value=="OFF"){
			industryBtn.value="ON";
		}
	}

	commercialBtn.onclick = () => {
		for (var i = 0; i < layer_sector_list.length; i++) {
			if(layer_sector_list[i] != 'uk-ghg-emission-2020-commercial'){
				map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
				map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
			}
		}
		map.setLayoutProperty('uk-ghg-emission-2020-commercial', 'visibility', 'visible');
		map.setLayoutProperty('uk-ghg-emission-2020-commercial-line', 'visibility', 'visible');
		if(commercialBtn.value=="ON"){
			for (var i = 0; i < layer_sector_list.length; i++) {
				if(layer_sector_list[i] != 'uk-ghg-emission-2020-v2'){
					map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
					map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
				}
			}
			map.setLayoutProperty('uk-ghg-emission-2020-v2', 'visibility', 'visible');
			commercialBtn.value="OFF";
		}
	  	else if(commercialBtn.value=="OFF"){
			commercialBtn.value="ON";
		}
	}

	agricultureBtn.onclick = () => {
		for (var i = 0; i < layer_sector_list.length; i++) {
			if(layer_sector_list[i] != 'uk-ghg-emission-2020-agriculture'){
				map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
				map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
			}
		}
		map.setLayoutProperty('uk-ghg-emission-2020-agriculture', 'visibility', 'visible');
		map.setLayoutProperty('uk-ghg-emission-2020-agriculture-line', 'visibility', 'visible');
		if(agricultureBtn.value=="ON"){
			for (var i = 0; i < layer_sector_list.length; i++) {
				if(layer_sector_list[i] != 'uk-ghg-emission-2020-v2'){
					map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
					map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
				}
			}
			map.setLayoutProperty('uk-ghg-emission-2020-v2', 'visibility', 'visible');
			agricultureBtn.value="OFF";
		}
	  	else if(agricultureBtn.value=="OFF"){
			agricultureBtn.value="ON";
		}
	}

	publicsectorBtn.onclick = () => {
		for (var i = 0; i < layer_sector_list.length; i++) {
			if(layer_sector_list[i] != 'uk-ghg-emission-2020-publicsector'){
				map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
				map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
			}
		}
		map.setLayoutProperty('uk-ghg-emission-2020-publicsector', 'visibility', 'visible');
		map.setLayoutProperty('uk-ghg-emission-2020-publicsector-line', 'visibility', 'visible');
		publicsectorBtn.onclick = () => {
			map.setLayoutProperty('uk-ghg-emission-2020-publicsector', 'visibility', 'visible');
			map.setLayoutProperty('uk-ghg-emission-2020-publicsector-line', 'visibility', 'visible');
			for (var i = 0; i < layer_sector_list.length; i++) {
				if(layer_sector_list[i] != 'uk-ghg-emission-2020-publicsector'){
					map.setLayoutProperty(layer_sector_list[i], 'visibility', 'none');
					map.setLayoutProperty(layer_sector_list[i]+'-line', 'visibility', 'none');
				}
			}
		}
	}

	// Make Legend
	const layers = [
		'0-399',
		'400-799',
		'800-1199',
		'1200-1599',
		'>1600'
	  ];
	  const colors = [
		'rgb(82, 177, 95)',
		'rgb(131, 221, 143)',
		'rgb(244, 232, 75)',
		'rgb(200, 147, 59)',
		'rgb(169, 88, 46)'
	  ];
	// create legend
	const legend = document.getElementById('legend');

	layers.forEach((layer, i) => {
	const color = colors[i];
	const item = document.createElement('div');
	const key = document.createElement('span');
	key.className = 'legend-key';
	key.style.backgroundColor = color;

	const value = document.createElement('span');
	value.innerHTML = `${layer}`;
	item.appendChild(key);
	item.appendChild(value);
	legend.appendChild(item);
	});

});