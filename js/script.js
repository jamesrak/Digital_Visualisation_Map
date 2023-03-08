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

	document.getElementById('year_slider').addEventListener('input', function (e) {
		var year = parseInt(e.target.value);
		filterData(year);
	});

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

	map.on('click', 'uk-ghg-emission-2020', function(e) {
			// console.log("hello")
			// Change the cursor style as a UI indicator.
			map.getCanvas().style.cursor = 'pointer';
			var description = '<h2 class = "tooltip-header">' + e.features[0].properties['Local Authority'] + "</h2>\
			<p class = 'tooltip'>Region: " + e.features[0].properties.Region + "</p>\
			<p class = 'tooltip'>CO2 Emission (kt CO2e): " + e.features[0].properties['CO2_Grand Total'].toFixed(0)+"<\p>"
			// console.log(description)
			popup
				.setLngLat(e.lngLat)
				.setHTML(description)
				.addTo(map);

		});


	map.on('mouseleave', 'uk-ghg-emission-2020', function() {
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
});