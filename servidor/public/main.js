//var socket = io.connect('http://192.168.26.216:5001', {'forceNew': true});


function render(data){

	var html = "Muestra: "+data;
	/*
	var html = data.map(function(elem, index){
		return(`<div>
		<strong>${elem.author}</strong>:
		<em>${elem.text}</em>
		</div>`);

	}).join(" ");
	*/

	document.getElementById('messages').innerHTML = html;
}




// Config
var port = 5001;
var host = "ws://127.0.0.1:"+port; // No need to change this if using localhost


//Declare Variables
var socket;
var explodedValues = [0]; //initial value for the plot = 0

function init() {
	try {
        socket = io.connect('http://localhost:5001', {'forceNew': true});

        socket.on('messages', function(data){
            //console.log(data);
            render(data);
            for(var i=0; i<explodedValues.length; i++) { explodedValues[i] = parseInt(data); } 
            //console.log(explodedValues);
            drawVisualization();
        });
	}
	catch(ex){ 
		console.log(ex); 
	}
	
}

function drawVisualization() {
    // Create and populate the data table from the values received via websocket
    var data = google.visualization.arrayToDataTable([
        ['Tracker', '1'],
        ['Amplitud', explodedValues[0]]
    ]);
    
    // use a DataView to 0-out all the values in the data set for the initial draw
    var view = new google.visualization.DataView(data);
    view.setColumns([0, {
        type: 'number',
        label: data.getColumnLabel(1),
        calc: function () {return 0;}
    }]);
    
    // Create and draw the plot
    var chart = new google.visualization.BarChart(document.getElementById('visualization'));
    
    var options = {
        title:"Valor de amplitud",
        width: 1200,
        height: 300,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
        animation: {
            duration: 0
        },
        hAxis: {
            // set these values to make the initial animation smoother
            minValue: 0,
            maxValue: 1023
        }
    };
    
    var runOnce = google.visualization.events.addListener(chart, 'ready', function () {
        google.visualization.events.removeListener(runOnce);
        chart.draw(data, options);
    });
    
    chart.draw(view, options);
    
    // you can handle the resizing here - no need to recreate your data and charts from scratch
    /*
    $(window).resize(function() {
        chart.draw(data, options);
    });
    */
}

google.load('visualization', '1', {packages: ['corechart'], callback: drawVisualization});




