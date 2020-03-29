var btnSubmit = document.querySelector('#btnSubmit');

btnSubmit.addEventListener('click', function() {
    mainBrain(); 
});

mainBrain(); 


function mainBrain(){
    let data = collectDataForm();
    console.log(data);

    let R0 = data.nombre_contacts*data.proba_contagion*data.infection_duration; 
    console.log(R0);

    let balise_p_R0 = document.querySelector("#R0"); 
    balise_p_R0.innerHTML = R0; 
    
    var remis_FirstDay = 2000;  
    var deleteHuman_FirstDay = 50;

    var dailyData = [];
    
    for( i=0; i<180; i++){
        calclDailyData(data, remis_FirstDay, deleteHuman_FirstDay, dailyData);
    }
    
    console.log(dailyData);

    let balise_nombre_mort = document.querySelector("#total_death"); 
    balise_nombre_mort.innerHTML = 'zeefzefzefezfzefzefzf';

    let dataGraph = {
        label: [], 
        data: []
    }; 
    for( let indexDaily in dailyData ){
        dataGraph.label.push( indexDaily*1),
        dataGraph.data.push(dailyData[indexDaily].deleteHumanDay)
    }

    console.log(dataGraph)
         
    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataGraph.label,
            datasets: [{ 
                data: dataGraph.data,
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false
            }
            //, { 
            //     data: [282,350,411,502,635,809,947,1402,3700,5267],
            //     label: "Asia",
            //     borderColor: "#8e5ea2",
            //     fill: false
            // }, { 
            //     data: [168,170,178,190,203,276,408,547,675,734],
            //     label: "Europe",
            //     borderColor: "#3cba9f",
            //     fill: false
            // }, { 
            //     data: [40,20,10,16,24,38,74,167,508,784],
            //     label: "Latin America",
            //     borderColor: "#e8c3b9",
            //     fill: false
            // }, { 
            //     data: [6,3,2,2,7,26,82,172,312,433],
            //     label: "North America",
            //     borderColor: "#c45850",
            //     fill: false
            // }
            ]
        },
        options: {
            title: {
            display: true,
            text: 'World population per region (in millions)'
            }
        }
    });
}


function calclDailyData(data, remis_FirstDay, deleteHuman_FirstDay, dailyData ) {
    let dataDay = {};
    let previusDay = dailyData[dailyData.length - 1];

    // condition jour 0 or not
    if(dailyData.length === 0) {
        dataDay.sains = Math.round(data.popTotal - deleteHuman_FirstDay - remis_FirstDay - data.initial_infected);
        dataDay.malades = Math.round(data.initial_infected);
        dataDay.remis = Math.round(remis_FirstDay);
        dataDay.deleteHuman = Math.round(deleteHuman_FirstDay);
        dataDay.deleteHumanDay = 0;
        
        dailyData.push(dataDay);
    }else{
        dataDay.sains = Math.round(data.popTotal - previusDay.deleteHuman - previusDay.remis - previusDay.malades); 
        dataDay.malades = Math.round(previusDay.malades + ( previusDay.malades * data.nombre_contacts * data.proba_contagion * ( previusDay.sains / data.popTotal )) - (( 1 / data.infection_duration ) * previusDay.malades ) - ((data.death_rate / data.infection_duration ) * previusDay.malades ));
        dataDay.remis = Math.round(previusDay.remis + 1 / data.infection_duration * previusDay.malades);
        dataDay.deleteHuman = Math.round(previusDay.deleteHuman + (( data.death_rate / data.infection_duration ) * previusDay.malades )); 
        dataDay.deleteHumanDay = dataDay.deleteHuman - previusDay.deleteHuman;

        dailyData.push(dataDay);
    }
}

function collectDataForm () {

    let data = {
        popTotal : document.querySelector("#population_totale").value*1,
        initial_infected : document.querySelector("#initial_infected").value*1,
        nombre_contacts : document.querySelector("#nombre_contacts").value*1,
        proba_contagion : document.querySelector("#proba_contagion").value*1,
        infection_duration : document.querySelector("#infection_duration").value*1,
        death_rate : document.querySelector("#death_rate").value*1
    }

    return data
    //console.log('poptotal',popTotal); 
}