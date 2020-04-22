let allDayRule = {};
let firstSet = false;

var btnSubmit = document.querySelector('#btnSubmit');

btnSubmit.addEventListener('click', function() {
    mainBrain(); 
});
constructCalendar();


function mainBrain(){
    let data = collectDataForm();
    // console.log(data);



    
    // var remis_FirstDay = 2000;  
    // var deleteHuman_FirstDay = 50;

    var dailyData = [];
    
    for( i=0; i<365; i++){
        calclDailyData(data, allDayRule ,dailyData, i);
        console.log(dailyData);
    }
    
    // console.log(dailyData);

    // let balise_nombre_mort = document.querySelector("#total_death");
    // balise_nombre_mort.innerHTML = 'Construire un tableau ici';

    let dataGraphNbMortJour = {
        label: [],
        data: []
    };
    let dataGraphNbMalade = {
        label: [],
        data: []
    };

    console.log(dailyData);
    for( let indexDaily in dailyData ){
        dataGraphNbMortJour.label.push( indexDaily*1),
        dataGraphNbMortJour.data.push(dailyData[indexDaily].deleteHumanDay)
    }
    for( let indexDaily in dailyData ){
        dataGraphNbMalade.label.push( indexDaily*1),
        dataGraphNbMalade.data.push(dailyData[indexDaily].malades)
    }


    // console.log(dataGraph)
         
    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataGraphNbMortJour.label,
            datasets: [{ 
                data: dataGraphNbMortJour.data,
                label: "Nombre de morts / Jours",
                borderColor: "#3e95cd",
                fill: false
            },
            { 
                data: dataGraphNbMalade.data,
                label: "Nombre de malade total",
                borderColor: "#8e5ea2",
                fill: false
            }
            // , { 
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

function calclDailyData(data, allDayRule, dailyData ) {
    let dataDay = {};
    let previusDay = dailyData[dailyData.length - 1];
 


    
    if(i !== 0 && i !== 1){
        if(allDayRule[i].rules.rule1 !== allDayRule[i-1].rules.rule1){
            if(allDayRule[i].rules.rule1){
                data.nombre_contacts = data.nombre_contacts - 4
            }else{
                data.nombre_contacts = data.nombre_contacts + 4
            }
        }
        if(allDayRule[i].rules.rule2 !== allDayRule[i-1].rules.rule2){
            if(allDayRule[i].rules.rule2){
                data.nombre_contacts = data.nombre_contacts - 4
            }else{
                data.nombre_contacts = data.nombre_contacts + 4
            }
        }
        if(allDayRule[i].rules.rule3 !== allDayRule[i-1].rules.rule3){
            if(allDayRule[i].rules.rule3){
                data.nombre_contacts = data.nombre_contacts - 4
            }else{
                data.nombre_contacts = data.nombre_contacts + 4
            }
        }
        if(allDayRule[i].rules.rule4 !== allDayRule[i-1].rules.rule4){
            if(allDayRule[i].rules.rule4){
                data.proba_contagion = data.proba_contagion - 0.001
            }else{
                data.proba_contagion = data.proba_contagion + 0.001
            }
        }
        if(allDayRule[i].rules.rule5 !== allDayRule[i-1].rules.rule5){
            if(allDayRule[i].rules.rule5){
                data.proba_contagion = data.proba_contagion - 0.003
            }else{
                data.proba_contagion = data.proba_contagion + 0.003
            }
        }
        if(allDayRule[i].rules.rule6 !== allDayRule[i-1].rules.rule6){
            if(allDayRule[i].rules.rule6){
                data.proba_contagion = data.proba_contagion - 0.001
            }else{
                data.proba_contagion = data.proba_contagion + 0.001
            }
        }
    }
    console.log(dailyData.length); 
    console.log(allDayRule); 
    console.log(data); 

    let R0 = data.nombre_contacts*data.proba_contagion*data.infection_duration; 
    console.log(R0);

    let balise_p_R0 = document.querySelector("#R0"); 
    balise_p_R0.innerHTML = R0; 

    // if nombre de malade ayant besoin de soin > 7000 alors Death_Rate = 5%;

    // condition jour 0 or not
    if(dailyData.length === 0) {

        for(p=0; p<7; p++){
            dailyData.push(dataDay);
        }

        let deleteHuman_FirstDay = data.initial_infected * 0.02; 
        let remis_FirstDay = 0; 

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


function constructCalendar(){
    var tableCalendar = document.querySelector("#tableCalendar");
    tableCalendar.innerHTML = '';
    // console.log('start gen calendar allDayRule', allDayRule)
    for(let j = 1; j<365; j++){

        let CONFIG_DAY; 
        
        if(!firstSet){
            CONFIG_DAY = {
                rules : {
                    rule1 : false,
                    rule2 : false, 
                    rule3 : false, 
                    rule4 : false,
                    rule5 : false, 
                    rule6 : false,
                },
                name: {
                    rule1 : "la régle N°1",
                    rule2 : "la régle N°2",
                    rule3 : "la régle N°3",
                    rule4 : "la régle N°4",
                    rule5 : "la régle N°5",
                    rule6 : "la régle N°6",
                }, 
                checkHandleRules :{
                    rule1 : false,
                    rule2 : false,
                    rule3 : false,
                    rule4 : false,
                    rule5 : false,
                    rule6 : false,
                },
                setRuleDay : false
            }
        }else{
            // console.log('config deja set'); 
            CONFIG_DAY = {
                ...allDayRule[j]
            }
        }

        // console.log(allDayRule);
        
        var day_tabElem = document.createElement('div');
        day_tabElem.setAttribute("id", `${j}`);
        if(CONFIG_DAY.setRuleDay){
            day_tabElem.setAttribute("class", `div_tabElem daySet`);  
        }else{
            day_tabElem.setAttribute("class", `div_tabElem`);
        }

        var span_tabElem = document.createElement('span');
        span_tabElem.setAttribute("class", `span_tabElem`);
        span_tabElem.innerHTML = `J - ${j}`;
        day_tabElem.append(span_tabElem);

        day_tabElem.addEventListener( 'click', () => {
            // console.log(`jour${j}`);
            creatAndManageModal(j, CONFIG_DAY);
        }); 

        //set l'objet global des régle 
        allDayRule = {
            ...allDayRule, 
            [j] : CONFIG_DAY
        };

        // ajout des params si il y en as !
        var tableCalendar = document.querySelector('#tableCalendar'); 
        tableCalendar.append(day_tabElem);
    }
    firstSet = true;
    
}


function creatAndManageModal(j, CONFIG_DAY){
    var structureModal = document.querySelector('#SectionModal');
    structureModal.removeAttribute('class', 'CloseModal'); 
    structureModal.setAttribute('class', 'OpenModal'); 

    var structModalBody = document.querySelector('#modal');

    var bodyModal = document.createElement('div'); 
    bodyModal.setAttribute('class', 'bodyModal'); 

    var closeModal = document.createElement('button');
    closeModal.setAttribute('class', 'btnClose');
    closeModal.setAttribute('value', `close`); 
    structModalBody.append(closeModal); 
    closeModal.addEventListener( 'click', () => {
        bodyModal.remove();
        structureModal.removeAttribute('class', 'OpenModal'); 
        structureModal.setAttribute('class', 'CloseModal');
        constructCalendar() 
    })

    manageBtnModal(j, CONFIG_DAY, bodyModal); 
    structModalBody.append(bodyModal); 
}


function manageBtnModal(j, CONFIG_DAY, bodyModal){
    var titleModal = document.createElement('div'); 
    titleModal.setAttribute('class', 'titleModal');
    titleModal.innerHTML = `Mesures appliqués au jours ${j} de l'épidémie !`;
    bodyModal.append(titleModal); 

    for( let rule in CONFIG_DAY.rules){
        var divRule = document.createElement('button'); 
        divRule.setAttribute('id', `${j}-${rule}`);
        divRule.setAttribute('class', 'styleBtnRuleModal'); 
        divRule.innerHTML =`${CONFIG_DAY.name[rule]}`; 
    
        // console.log(rule); 
        // console.log(allDayRule[j].rules); 
        if(CONFIG_DAY.rules[rule]){
            divRule.setAttribute('class', `styleBtnRuleModal onRule` );
            divRule.setAttribute('name', `${j}${rule}`);
        }else{
            divRule.setAttribute('class', `styleBtnRuleModal offRule` );
            divRule.setAttribute('name', `${j}${rule}`);
        }

        bodyModal.appendChild(divRule);
        
        divRule.addEventListener( 'click', () => {
            // console.log(j);
            
            allDayRule[j].rules[rule] = !allDayRule[j].rules[rule];
            allDayRule[j].checkHandleRules[rule] = !allDayRule[j].checkHandleRules[rule];
            
            Object.keys(allDayRule[j]).forEach( keyDayRule => {
                if(allDayRule[j][keyDayRule] && keyDayRule !== "setRuleDay"){
                    allDayRule[j].setRuleDay = true  
                }
            })
    
            // fonction set de l'objet 
            let setJ = j;
            while(setJ < 364){
    
                allDayRule[setJ].rules[rule] = allDayRule[j].rules[rule];
                setJ++ 
    
                if(allDayRule[setJ].checkHandleRules[rule]){
                    return
                }    
            }
            var child = bodyModal.lastElementChild;
            while (child) { 
                bodyModal.removeChild(child); 
                child = bodyModal.lastElementChild; 
            } 

            manageBtnModal(j, CONFIG_DAY, bodyModal);

            // console.log(allDayRule); 
        })
    }
}



