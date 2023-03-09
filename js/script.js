// Global Variable
var mapbox_tileset_id = "mapbox://jamesrak.1txn2tdn"
var mapbox_tileset_layer = "uk_ghg_emission_2020"
var mapbox_style_url = "mapbox://styles/jamesrak/cleyvltrf001d01o3fmf32hlj"

// Mapbox Initialisation
mapboxgl.accessToken = 'pk.eyJ1IjoiamFtZXNyYWsiLCJhIjoiY2p6aHNsbGtkMHZ5czNlcGhmcWh6eTYxOSJ9.sfyNLBf4VsDjjClwB8H2MA';
var map = new mapboxgl.Map({
	container: 'map',
	style: mapbox_style_url, // 'mapbox://styles/mapbox/streets-v11'
	// style: 'mapbox://styles/mapbox/streets-v11',
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
// var csv = require('jquery-csv');

// function drawChart() {

// 	// grab the CSV
// 	$.get("data/top10_co2_emission.csv", function(csvString) {
// 		// transform the CSV string into a 2-dimensional array
// 		var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
  
// 		// this new DataTable object holds all the data
// 		var data = new google.visualization.arrayToDataTable(arrayData);
// 		// this view can select a subset of the data at a time
// 		var view = new google.visualization.DataView(data);
// 		view.setColumns([3,12]);
// 		console.log(view)
  
// 	// Set chart options
// 	var options = {'title':'Top 10 areas that produce the most CO2',
// 				   'width':350,
// 				   'height':300,
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
// 	var chart = new google.visualization.BarChart(document.getElementById('ghg_chart'));
// 	chart.draw(view, options);
// 	});
//   }


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
				   'width':350,
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

  function drawPieChart() {

	// grab the CSV
	$.get("data/ghg_emission_v2_2020.csv", function(csvString) {
		// transform the CSV string into a 2-dimensional array
		var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
  
		// this new DataTable object holds all the data
		var data = new google.visualization.arrayToDataTable(arrayData);
		// this view can select a subset of the data at a time
		var view = new google.visualization.DataView(data);
		view.setColumns([6,11]);
		console.log(view)
  
	// Set chart options
	var options = {'title':'CO2 Emission by Sector',
				   'width':150,
				   'height':150,
				   'legend': {textStyle: {color: 'white'}},
				   'titleTextStyle': {
					color: 'white'
				},
				hAxis: {
					textStyle:{color: '#FFF'}
				},
				vAxis: {
					textStyle:{color: '#FFF'}
				},
				   'backgroundColor': '#262626'};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('sector_donut_chart'));
	chart.draw(view, options);
	});
  }


// function drawChart() {

// 	// Create the data table.
// 	var data = new google.visualization.DataTable();
// 	data.addColumn('string', 'Topping');
// 	data.addColumn('number', 'Slices');
// 	data.addRows([
// 	  ['Mushrooms', 3],
// 	  ['Onions', 1],
// 	  ['Olives', 1],
// 	  ['Zucchini', 1],
// 	  ['Pepperoni', 2]
// 	]);

// 	// Set chart options
// 	var options = {'title':'How Much Pizza I Ate Last Night',
// 				   'width':300,
// 				   'height':300,
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
// 	var chart = new google.visualization.BarChart(document.getElementById('ghg_chart'));
// 	chart.draw(data, options);
//   }

let hoveredStateId = null;


map.on('load', function () {

	// function filterData(year) {

	// 	var layers = ['kiva-poverty-satellite-us', 'kiva-poverty-satellite-us-glow2', 'kiva-poverty-satellite-us-glow3'];
	// 	for (var i = 0; i < layers.length; i++) {
	// 		document.getElementById('year').textContent = year.toString();
	// 		filterCondition = ['==', ['get', 'year'], year];
	// 		map.setFilter(layers[i], ['all', filterCondition])
	// 		// var pp = map.getPaintProperty(layers[i], 'circle-radius');
	// 		// pp.property = year.toString();
	// 		// map.setPaintProperty(layers[i], 'circle-radius', pp);
	// 	}
	// }

	// document.getElementById('year_slider').addEventListener('input', function (e) {
	// 	var year = parseInt(e.target.value);
	// 	filterData(year);
	// });

	// Create a popup, but don't add it to the map yet.
	var popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false
	});

	// map.addSource(
	// 	id : 'kiva-poverty-satellite-data',
	// 	source : {
	// 		type: 'vector',
	// 		url: mapbox_tileset_id,
	// 	},
	// 	'source-layer': mapbox_tileset_layer
	// 	);

	// // Add a layer showing the places.
	// map.addLayer({
	// 	id : 'kiva-poverty-satellite-data',
	// 	type: 'circle',
	// 	'source' : {
	// 		type: 'vector',
	// 		url: mapbox_tileset_id,
	// 	},
	// 	'source-layer': mapbox_tileset_layer,
	// 	'layout':{
	// 		'visibility': 'visible'
	// 	},
	// 	});

	// map.addSource('uk-ghg-emission-2020-data', {
	// 	'type': 'vector',
	// 	'data': mapbox_tileset_id
	// 	});
		 

	// // The feature-state dependent fill-opacity expression will render the hover effect
	// // when a feature's hover state is set to true.
	// map.addLayer({
	// 	'id': 'local-area-layer',
	// 	'type': 'fill',
	// 	'source': 'uk-ghg-emission-2020-data',
	// 	'source-layer': mapbox_tileset_layer,
	// 	'layout': {},
	// 	'paint': {
	// 		'fill-opacity': [
	// 			'case',
	// 			['boolean', ['feature-state', 'hover'], false],
	// 			1,
	// 			0.5
	// 		]
	// 	}
	// });

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
			  </tr>\
			</thead>\
			<tbody>\
			  <tr>\
				<th scope="row">1</th>\
				<td>Transport</td>\
				<td>'+e.features[0].properties['Transport']+'</td>\
			  </tr>\
			  <tr>\
				<th scope="row">2</th>\
				<td>Domestic</td>\
				<td>'+e.features[0].properties['Domestic']+'</td>\
			  </tr>\
			  <tr>\
			  <th scope="row">3</th>\
			  <td>Industry</td>\
			  <td>'+e.features[0].properties['Industry']+'</td>\
			</tr>\
			  <tr>\
				<th scope="row">4</th>\
				<td>Commercial</td>\
				<td>'+e.features[0].properties['Commercial']+'</td>\
			  </tr>\
			<tr>\
			<th scope="row">5</th>\
			<td>Agriculture</td>\
			<td>'+e.features[0].properties['Agriculture']+'</td>\
		  </tr>\
		  <tr>\
		  <th scope="row">6</th>\
		  <td>Public Sector</td>\
		  <td>'+e.features[0].properties['Public Sector']+'</td>\
		</tr>\
			</tbody>\
		  </table>'

		  description = description.concat(tablehtml)

			popup
				.setLngLat(e.lngLat)
				.setHTML(description)
				.addTo(map);

			google.charts.load("current", {packages:["corechart"], callback : function () {
				var data = google.visualization.arrayToDataTable([
					['Sector', 'CO2 Emission'],
					['Transport',  15],
					['Domestic',   30],
				//   ['Industry',  2],
				//   ['Commercial', 2],
				//   ['Agriculture',    7],
				//   ['Public Sector',    7]
				]);
	
				var options = {
					title: 'CO2 Emission by Sector',
					pieHole: 0.4,
					};
	
				var chart = new google.visualization.PieChart(document.getElementById('sector_donut_chart'));
				chart.draw(data, options);
			}});
		});


	map.on('mouseleave', 'uk-ghg-emission-2020-v2', function() {
		// print("leave")
		map.getCanvas().style.cursor = '';
		popup.remove();
	}); 

	// // When the user moves their mouse over the state-fill layer, we'll update the
	// // feature state for the feature under the mouse.
	// map.on('mousemove', 'local-area-layer', (e) => {
	// 	if (e.features.length > 0) {
	// 		if (hoveredStateId !== null) {
	// 			map.setFeatureState(
	// 				{ source: 'uk-ghg-emission-2020', id: hoveredStateId },
	// 				{ hover: false }
	// 			);
	// 		}
	// 		hoveredStateId = e.features[0].id;
	// 		map.setFeatureState(
	// 			{ source: 'uk-ghg-emission-2020', id: hoveredStateId },
	// 			{ hover: true }
	// 		);
	// 	}
	// });

	// // When the mouse leaves the state-fill layer, update the feature state of the
	// // previously hovered feature.
	// map.on('mouseleave', 'local-area-layer', () => {
	// 	if (hoveredStateId !== null) {
	// 		map.setFeatureState(
	// 			{ source: 'uk-ghg-emission-2020', id: hoveredStateId },
	// 			{ hover: false }
	// 		);
	// 	}
	// 	hoveredStateId = null;
	// });

	//////// Function for showing map filtered by the top sector
	// function onClickTransport() {
	// // Add a layer showing the places.
	// 	map.addLayer({
	// 		id : 'uk-ghg-emission-2020-transport',
	// 		type: 'fill',
	// 		'source' : {
	// 			type: 'vector',
	// 			url: 'jamesrak.d667g09a',
	// 		},
	// 		'source-layer': 'uk-ghg-emission-2020-transport',
	// 		'layout':{
	// 			'visibility': 'visible'
	// 		},
	// 		});
  	// }

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
		// for(var i = 0; i < button_list.length; i++){
		// 	if(transportBtn != button_list[i]){
		// 		button_list[i].
		// 	}
		// }
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

	// $("button-transport").click(function() {
	// 	$(this).toggleClass('button.toggle');
	//   });

});