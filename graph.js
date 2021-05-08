

var x = [],y = [],v = [],t = 0.0;
var dh = 0.01;

var myLineChart;

//create new Graph
//class graph : graphName,  array:x_labels array:y_labels string: label_name

function createGraph(graphName,x_lavels,y_labels,label_name){
  myLineChart = new Chart(graphName, {
    type: 'line',
    data: {
      labels: x_lavels,
      datasets: [{
        label: label_name,
        data: y_labels,
        backgroundColor: 'rgba(83, 141, 217, 0.69)',
        borderColor: 'rgba(83, 141, 217, 0.69)',
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
        scales: {
          xAxes: [{
            position: 'bottom',
            scaleLabel: {
                display: true,
                labelString: 't[s]'
            },
            ticks: {
              minRotation: 0,
              maxRotation: 7
            }
          }],
          yAxes: [{scaleLabel: {
              display: true,
              labelString: 'x[m]'
          },
            ticks: {
              min: -1.2,
              max: 1.2,
            stepSize: 0.2
            }
          }]
       }
     }
   });
}

var omega = document.getElementById('output1').value;
var theta = document.getElementById('output2').value;

var k1,k2,k3,k4;


function diff_equ1(x0,y0,v0,duration){
    
    x = [x0],y = [y0],v = [v0];
    dh = 0.001;

    for(var i = 1; i < duration; i++){
        
        k1 = -2.0*omega*theta*v[i-1] - omega*omega*y[i-1];
        k2 = -2.0*omega*theta*v[i-1] - omega*omega*(y[i-1] + dh*k1/2.0);
        k3 = -2.0*omega*theta*v[i-1] - omega*omega*(y[i-1] + dh*k2/2.0);
        k4 = -2.0*omega*theta*v[i-1] - omega*omega*(y[i-1] + dh*k3);
        
        v.push(v[i-1] + dh*(k1 + 2.0*k2 + 2.0*k3 + k4)/6.0);
        y.push(y[i-1] + dh*v[i]);
        
        x.push(x[i-1]+dh);
    }
               
}


var gra1 = document.getElementById("line-chart1");

diff_equ1(0,1,0,6000);

createGraph(gra1,x,y,'damped free vibration');


function slider_change_func() {
    myLineChart.destroy();
    omega = document.getElementById('output1').value;
    theta = document.getElementById('output2').value;
    diff_equ1(0,1,0,6000);
    createGraph(gra1,x,y,'damped free vibration');

}

document.getElementById("omega_slider").onchange = slider_change_func;
document.getElementById("theta_slider").onchange = slider_change_func;
