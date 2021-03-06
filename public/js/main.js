let allDayRule = {};
let firstSet = false;
let checkPeriodeRule = {
    rule1: {
        count: 0,
        waitUpdate: false,
    },
    rule2: {
        count: 0,
        waitUpdate: false,
    },
    rule3: {
        count: 0,
        waitUpdate: false,
    },
    rule4: {
        count: 0,
        waitUpdate: false,
    },
    rule5: {
        count: 0,
        waitUpdate: false,
    },
    rule6: {
        count: 0,
        waitUpdate: false,
    }
}

var btnSubmit = document.querySelector('#btnSubmit');
btnSubmit.addEventListener('click', function () {
    mainBrain();
    // console.log('allDayRule', allDayRule);
    // let divResulte = document.querySelector('.recupData');
    // divResulte.innerHTML = JSON.stringify(allDayRule);
});

var btnSubmitFR = document.querySelector('#btnSubmitFR');
btnSubmitFR.addEventListener('click', function () {
    creatorData();
    constructCalendar();
    // console.log('allDayRule', allDayRule);
    // let divResulte = document.querySelector('.recupData');
    // divResulte.innerHTML = JSON.stringify(allDayRule);
});

constructCalendar();


let btnCloseIntro = document.querySelector('.btnCloseIntro'); 
let sectionModalintro = document.querySelector('#SectionModalIntro');
btnCloseIntro.addEventListener('click', () => {
    sectionModalintro.removeAttribute('class', 'OpenModal');
    sectionModalintro.setAttribute('class', 'CloseModal');
})

let navBtnIntrocduction = document.querySelector('#ModalIntroduction'); 
navBtnIntrocduction.addEventListener("click", (e) =>{
    sectionModalintro.removeAttribute('class', 'CloseModal');
    sectionModalintro.setAttribute('class', 'OpenModal'); 
});

let modalIntro = document.querySelector('#modalIntro');
sectionModalintro.addEventListener("click", (e) =>{
    let isClickInside = modalIntro.contains(event.target); 
    if(!isClickInside){
        sectionModalintro.removeAttribute('class', 'OpenModal'); 
        sectionModalintro.setAttribute('class', 'CloseModal');
    }
});



function mainBrain() {
    let data = collectDataForm();
    // console.log(data);
    // var remis_FirstDay = 2000;  
    // var deleteHuman_FirstDay = 50;

    var dailyData = [];

    for (i = 0; i < 365; i++) {
        calclDailyData(data, allDayRule, dailyData, i);
        console.log(dailyData);
    }

    // console.log(dailyData);

    // let balise_nombre_mort = document.querySelector("#total_death");
    // balise_nombre_mort.innerHTML = 'Construire un tableau ici';

    let dataGraphNbMort = {
        label: [],
        data: []
    };
    let dataGraphNbMortJour = {
        label: [],
        data: []
    };
    let dataGraphNbRemis = {
        label: [],
        data: []
    };
    let dataGraphNbRemisJour = {
        label: [],
        data: []
    };
    let dataGraphNbSains = {
        label: [],
        data: []
    };
    let dataGraphNbMalade = {
        label: [],
        data: []
    };
    let dataGraphNbMaladeJour = {
        label: [],
        data: []
    };
    let dataGraphR0 = {
        label: [],
        data: []
    };


    console.log(dailyData);
    for (let indexDaily in dailyData) {
        dataGraphNbMort.label.push(indexDaily * 1),
            dataGraphNbMort.data.push(dailyData[indexDaily].deleteHuman)
    }
    for (let indexDaily in dailyData) {
        dataGraphNbMortJour.label.push(indexDaily * 1),
            dataGraphNbMortJour.data.push(dailyData[indexDaily].deleteHumanDay)
    }
    for (let indexDaily in dailyData) {
        dataGraphNbRemis.label.push(indexDaily * 1),
            dataGraphNbRemis.data.push(dailyData[indexDaily].remis)
    }
    for (let indexDaily in dailyData) {
        dataGraphNbRemisJour.label.push(indexDaily * 1),
            dataGraphNbRemisJour.data.push(dailyData[indexDaily].remisDay)
    }
    for (let indexDaily in dailyData) {
        dataGraphNbSains.label.push(indexDaily * 1),
            dataGraphNbSains.data.push(dailyData[indexDaily].sains)
    }
    for (let indexDaily in dailyData) {
        dataGraphNbMalade.label.push(indexDaily * 1),
            dataGraphNbMalade.data.push(dailyData[indexDaily].malades)
    }
    for (let indexDaily in dailyData) {
        dataGraphNbMaladeJour.label.push(indexDaily * 1),
            dataGraphNbMaladeJour.data.push(dailyData[indexDaily].maladesDay)
    }
    for (let indexDaily in dailyData) {
        dataGraphR0.label.push(indexDaily * 1),
        dataGraphR0.data.push(dailyData[indexDaily].R0)
    }



    // console.log(dataGraph)

    let containerCharts = document.querySelector('.containerCharts');

    let childContainer = containerCharts.lastElementChild;
    while (childContainer) {
        containerCharts.removeChild(childContainer);
        childContainer = containerCharts.lastElementChild;
    }


    let chartNbMort = document.createElement('canvas');
    chartNbMort.setAttribute('id', 'chartNbMort');
    chartNbMort.getContext('2d');
    containerCharts.append(chartNbMort);
    new Chart(chartNbMort, {
        type: 'line',
        data: {
            labels: dataGraphNbMortJour.label,
            datasets: [
                {
                    label: "Nombre de Mort / Jour",
                    data: dataGraphNbMortJour.data,
                    borderColor: "#f44336",
                    fill: false
                }
            ]
        },
        responsive: true, 
        options: {
            legend: {
                display: true,
                labels: {
                    fontSize: 30,
                    fontColor: "#FFF"
                }
            },
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        fontColor: "#e6e6e6",
                        fontSize: 20
                    }
                }],
                xAxes: [{
                    display: true,
                    ticks: {
                        fontColor: "#e6e6e6",
                        fontSize: 20
                    }
                }],
            }
        }
    });

    let chartR0 = document.createElement('canvas');
    chartR0.setAttribute('id', 'chartR0');
    chartR0.getContext('2d');
    containerCharts.append(chartR0);
    new Chart(chartR0, {
        type: 'line',
        data: {
            labels: dataGraphR0.label,
            datasets: [
                {
                    label: "R0 / Jour",
                    data: dataGraphR0.data,
                    borderColor: "#ba68c8",
                    fill: false
                }
            ]
        },
        options: {
            legend: {
                display: true,
                labels: {
                    fontSize: 30,
                    fontColor: "#FFF"
                }
            },
            scales: {
                yAxes: [{
                    display: true,
                    // scaleLabel: {
                    //     display: true,
                    //     labelString: 'X axe name',
                    //     fontColor:'#FFF',
                    //     fontSize:10
                    // },
                    ticks: {
                        fontColor: "#e6e6e6",
                        fontSize: 20
                    }
                }],
                xAxes: [{
                    display: true,
                    // scaleLabel: {
                    //     display: true,
                    //     labelString: 'X axe name',
                    //     fontColor:'#FFF',
                    //     fontSize:10
                    // },
                    ticks: {
                        fontColor: "#e6e6e6",
                        fontSize: 20
                    }
                }],
            }
        }
        
    });

    let chartNbMaldade = document.createElement('canvas');
    chartNbMaldade.setAttribute('id', 'chartNbMaldade');
    chartNbMaldade.getContext('2d');
    containerCharts.append(chartNbMaldade);

    new Chart(chartNbMaldade, {
        type: 'line',
        data: {
            labels: dataGraphNbMalade.label,
            datasets: [
                {
                    data: dataGraphNbMalade.data,
                    label: "Personnes Malades",
                    borderColor: "#fdd835",
                    fill: false
                },
                {
                    data: dataGraphNbSains.data,
                    label: "Personnes Saines",
                    borderColor: "#8bc34a",
                    fill: false
                },
                {
                    data: dataGraphNbRemis.data,
                    label: "Personnes Rétablis",
                    borderColor: "#2196f3",
                    fill: false
                }
            ]
        },
        options: {
            legend: {
                display: true,
                labels: {
                    fontSize: 30,
                    fontColor: "#FFF"
                }
            },
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        fontColor: "#e6e6e6",
                        fontSize: 20
                    }
                }],
                xAxes: [{
                    display: true,
                    ticks: {
                        fontColor: "#e6e6e6",
                        fontSize: 20
                    }
                }],
            }
        }
       
    });
}




function calclDailyData(data, allDayRule, dailyData) {
    let dataDay = {};
    let previusDay = dailyData[dailyData.length - 1];

    if (i !== 0 && i !== 1) {
        // for(var r=1; r<6; r++ ){
        //     if (allDayRule[i].rules[`rule${r}`] !== allDayRule[i - 1].rules[`rule${r}`]) {
        //         checkPeriodeRule[`rule${r}`].waitUpdate = true;
        //     }
    
        //     if (allDayRule[i].rules[`rule${r}`]) {
        //         checkPeriodeRule[`rule${r}`].count++;
        //     } else {
        //         checkPeriodeRule[`rule${r}`].count = 0;
        //     }
    
        //     if (checkPeriodeRule[`rule${r}`].waitUpdate && checkPeriodeRule[`rule${r}`].count >= 7) {
        //         data.nombre_contacts = data.nombre_contacts - 4
        //         checkPeriodeRule[`rule${r}`].waitUpdate = false;
        //     }
        //     if (checkPeriodeRule[`rule${r}`].waitUpdate && checkPeriodeRule[`rule${r}`].count === 0) {
        //         data.nombre_contacts = data.nombre_contacts + 4
        //         checkPeriodeRule[`rule${r}`].waitUpdate = false;
        //     }
        //     console.log('ok', new Date());
        // }


        // rule 1
        if (allDayRule[i].rules.rule1 !== allDayRule[i - 1].rules.rule1) {
            checkPeriodeRule.rule1.waitUpdate = true;
        }

        if (allDayRule[i].rules.rule1) {
            checkPeriodeRule.rule1.count++;
        } else {
            checkPeriodeRule.rule1.count = 0;
        }

        if (checkPeriodeRule.rule1.waitUpdate && checkPeriodeRule.rule1.count >= 7) {
            data.nombre_contacts = data.nombre_contacts - 4
            checkPeriodeRule.rule1.waitUpdate = false;
        }
        if (checkPeriodeRule.rule1.waitUpdate && checkPeriodeRule.rule1.count === 0) {
            data.nombre_contacts = data.nombre_contacts + 4
            checkPeriodeRule.rule1.waitUpdate = false;
        }

        // rule 2
        if (allDayRule[i].rules.rule2 !== allDayRule[i - 1].rules.rule2) {
            checkPeriodeRule.rule2.waitUpdate = true;
        }

        if (allDayRule[i].rules.rule2) {
            checkPeriodeRule.rule2.count++;
        } else {
            checkPeriodeRule.rule2.count = 0;
        }

        if (checkPeriodeRule.rule2.waitUpdate && checkPeriodeRule.rule2.count >= 7) {
            data.nombre_contacts = data.nombre_contacts - 4
            checkPeriodeRule.rule2.waitUpdate = false;
        }
        if (checkPeriodeRule.rule2.waitUpdate && checkPeriodeRule.rule2.count === 0) {
            data.nombre_contacts = data.nombre_contacts + 4
            checkPeriodeRule.rule2.waitUpdate = false;
        }

        // rule 3
        if (allDayRule[i].rules.rule3 !== allDayRule[i - 1].rules.rule3) {
            checkPeriodeRule.rule3.waitUpdate = true;
        }

        if (allDayRule[i].rules.rule3) {
            checkPeriodeRule.rule3.count++;
        } else {
            checkPeriodeRule.rule3.count = 0;
        }

        if (checkPeriodeRule.rule3.waitUpdate && checkPeriodeRule.rule3.count >= 7) {
            data.nombre_contacts = data.nombre_contacts - 4
            checkPeriodeRule.rule3.waitUpdate = false;
        }
        if (checkPeriodeRule.rule3.waitUpdate && checkPeriodeRule.rule3.count === 0) {
            data.nombre_contacts = data.nombre_contacts + 4
            checkPeriodeRule.rule3.waitUpdate = false;
        }


        // rule 4
        if (allDayRule[i].rules.rule4 !== allDayRule[i - 1].rules.rule4) {
            checkPeriodeRule.rule4.waitUpdate = true;
        }

        if (allDayRule[i].rules.rule4) {
            checkPeriodeRule.rule4.count++;
        } else {
            checkPeriodeRule.rule4.count = 0;
        }

        if (checkPeriodeRule.rule4.waitUpdate && checkPeriodeRule.rule4.count >= 7) {
            data.proba_contagion = data.proba_contagion - 0.001
            checkPeriodeRule.rule4.waitUpdate = false;
        }
        if (checkPeriodeRule.rule4.waitUpdate && checkPeriodeRule.rule4.count === 0) {
            data.proba_contagion = data.proba_contagion + 0.001
            checkPeriodeRule.rule4.waitUpdate = false;
        }

        // rule 5
        if (allDayRule[i].rules.rule5 !== allDayRule[i - 1].rules.rule5) {
            checkPeriodeRule.rule5.waitUpdate = true;
        }

        if (allDayRule[i].rules.rule5) {
            checkPeriodeRule.rule5.count++;
        } else {
            checkPeriodeRule.rule5.count = 0;
        }

        if (checkPeriodeRule.rule5.waitUpdate && checkPeriodeRule.rule5.count >= 7) {
            data.proba_contagion = data.proba_contagion - 0.003;
            checkPeriodeRule.rule5.waitUpdate = false;
        }
        if (checkPeriodeRule.rule5.waitUpdate && checkPeriodeRule.rule5.count === 0) {
            data.proba_contagion = data.proba_contagion + 0.003;
            checkPeriodeRule.rule5.waitUpdate = false;
        }

        // rule 6
        if (allDayRule[i].rules.rule6 !== allDayRule[i - 1].rules.rule6) {
            checkPeriodeRule.rule6.waitUpdate = true;
        }

        if (allDayRule[i].rules.rule6) {
            checkPeriodeRule.rule6.count++;
        } else {
            checkPeriodeRule.rule6.count = 0;
        }

        if (checkPeriodeRule.rule6.waitUpdate && checkPeriodeRule.rule6.count >= 7) {
            data.proba_contagion = data.proba_contagion - 0.001
            checkPeriodeRule.rule6.waitUpdate = false;
        }
        if (checkPeriodeRule.rule6.waitUpdate && checkPeriodeRule.rule6.count === 0) {
            data.proba_contagion = data.proba_contagion + 0.001
            checkPeriodeRule.rule6.waitUpdate = false;
        }
    }
    console.log(dailyData.length);
    console.log(allDayRule);
    console.log(data);

    let R0 = data.nombre_contacts * data.proba_contagion * data.infection_duration;
    console.log(R0);

    let balise_p_R0 = document.querySelector("#R0");
    balise_p_R0.innerHTML = R0;

    // if nombre de malade ayant besoin de soin > 7000 alors Death_Rate = 5%;

    // condition jour 0 or not
    if (dailyData.length === 0) {

        let deleteHuman_FirstDay = data.initial_infected * 0.02;
        let remis_FirstDay = 0;

        dataDay.sains = Math.round(data.popTotal - deleteHuman_FirstDay - remis_FirstDay - data.initial_infected);
        dataDay.malades = Math.round(data.initial_infected);
        dataDay.maladesDay = Math.round(data.initial_infected);
        dataDay.remis = Math.round(remis_FirstDay);
        dataDay.remis = 0;
        dataDay.deleteHuman = Math.round(deleteHuman_FirstDay);
        dataDay.deleteHumanDay = 0;
        dataDay.R0 = R0;
        dailyData.push(dataDay);
    } else {
        dataDay.sains = Math.round(data.popTotal - previusDay.deleteHuman - previusDay.remis - previusDay.malades);
        dataDay.malades = Math.round(previusDay.malades + (previusDay.malades * data.nombre_contacts * data.proba_contagion * (previusDay.sains / data.popTotal)) - ((1 / data.infection_duration) * previusDay.malades) - ((data.death_rate / data.infection_duration) * previusDay.malades));
        dataDay.maladesDay = dataDay.malades - previusDay.malades;
        dataDay.remis = Math.round(previusDay.remis + 1 / data.infection_duration * previusDay.malades);
        dataDay.remisDay = dataDay.remis - previusDay.remis;
        dataDay.deleteHuman = Math.round(previusDay.deleteHuman + ((data.death_rate / data.infection_duration) * previusDay.malades));
        dataDay.deleteHumanDay = dataDay.deleteHuman - previusDay.deleteHuman;
        dataDay.R0 = R0; 
        dailyData.push(dataDay);
    }
}

function collectDataForm() {

    let data = {
        popTotal: document.querySelector("#population_totale").value * 1,
        initial_infected: document.querySelector("#initial_infected").value * 1,
        nombre_contacts: document.querySelector("#nombre_contacts").value * 1,
        proba_contagion: document.querySelector("#proba_contagion").value * 1,
        infection_duration: document.querySelector("#infection_duration").value * 1,
        death_rate: document.querySelector("#death_rate").value * 1
    }

    return data
    //console.log('poptotal',popTotal); 
}


function constructCalendar() {
    var tableCalendar = document.querySelector("#tableCalendar");
    tableCalendar.innerHTML = '';
    // console.log('start gen calendar allDayRule', allDayRule)
    for (let j = 1; j < 365; j++) {

        let CONFIG_DAY;

        if (!firstSet) {
            CONFIG_DAY = {
                rules: {
                    rule1: false,
                    rule2: false,
                    rule3: false,
                    rule4: false,
                    rule5: false,
                    rule6: false,
                },
                name: {
                    rule1: "Event +500p",
                    rule2: "Travail + Activité",
                    rule3: "Etablissements Scolaires",
                    rule4: "Masques",
                    rule5: "Lavage de main",
                    rule6: "Distance 1m",
                },
                unicodeRule: {
                    rule1: "\u{1F3DF}",
                    rule2: "\u{1F3ED}",
                    rule3: "\u{1F4DA}",
                    rule4: "\u{1F637}",
                    rule5: "\u{1F9FC}",
                    rule6: "\u{2194}",
                },
                checkHandleRules: {
                    rule1: false,
                    rule2: false,
                    rule3: false,
                    rule4: false,
                    rule5: false,
                    rule6: false,
                },
                setRuleDay: false
            }
        } else {
            // console.log('config deja set'); 
            CONFIG_DAY = {
                ...allDayRule[j]
            }
        }

        // console.log(allDayRule);

        var day_tabElem = document.createElement('div');
        day_tabElem.setAttribute("id", `${j}`);
        if (CONFIG_DAY.setRuleDay) {
            day_tabElem.setAttribute("class", `div_tabElem daySet`);
        } else {
            day_tabElem.setAttribute("class", `div_tabElem`);
        }

        let day_icon = document.createElement('div');
        day_icon.setAttribute('class', 'iconCalendar');
        day_tabElem.append(day_icon);

        let spanIcon1 = document.createElement('span');
        if (CONFIG_DAY.rules.rule1) {
            spanIcon1.innerHTML = `${CONFIG_DAY.unicodeRule.rule1}`;
            day_icon.append(spanIcon1);
        } else {
            spanIcon1.remove();
        }
        let spanIcon2 = document.createElement('span');
        if (CONFIG_DAY.rules.rule2) {
            spanIcon2.innerHTML = `${CONFIG_DAY.unicodeRule.rule2}`;
            day_icon.append(spanIcon2);
        } else {
            spanIcon2.remove();
        }
        let spanIcon3 = document.createElement('span');
        if (CONFIG_DAY.rules.rule3) {
            spanIcon3.innerHTML = `${CONFIG_DAY.unicodeRule.rule3}`;
            day_icon.append(spanIcon3);
        } else {
            spanIcon3.remove();
        }
        let spanIcon4 = document.createElement('span');
        if (CONFIG_DAY.rules.rule4) {
            spanIcon4.innerHTML = `${CONFIG_DAY.unicodeRule.rule4}`;
            day_icon.append(spanIcon4);
        } else {
            spanIcon4.remove();
        }
        let spanIcon5 = document.createElement('span');
        if (CONFIG_DAY.rules.rule5) {
            spanIcon5.innerHTML = `${CONFIG_DAY.unicodeRule.rule5}`;
            day_icon.append(spanIcon5);
        } else {
            spanIcon5.remove();
        }
        let spanIcon6 = document.createElement('span');
        if (CONFIG_DAY.rules.rule6) {
            spanIcon6.innerHTML = `${CONFIG_DAY.unicodeRule.rule6}`;
            day_icon.append(spanIcon6);
        } else {
            spanIcon6.remove();
        }

        var span_tabElem = document.createElement('span');
        span_tabElem.setAttribute("class", `span_tabElem`);
        span_tabElem.innerHTML = `J - ${j}`;
        day_tabElem.append(span_tabElem);

        day_tabElem.addEventListener('click', () => {
            // console.log(`jour${j}`);
            creatAndManageModal(j, CONFIG_DAY);
        });

        //set l'objet global des régle 
        allDayRule = {
            ...allDayRule,
            [j]: CONFIG_DAY
        };

        // ajout des params si il y en as !
        var tableCalendar = document.querySelector('#tableCalendar');
        tableCalendar.append(day_tabElem);
    }
    firstSet = true;

}


function creatAndManageModal(j, CONFIG_DAY) {
    var structureModal = document.querySelector('#SectionModal');
    structureModal.removeAttribute('class', 'CloseModal');
    structureModal.setAttribute('class', 'OpenModal');

    var structModalBody = document.querySelector('#modal');

    var bodyModal = document.createElement('div');
    bodyModal.setAttribute('class', 'bodyModal');

    var closeModal = document.createElement('button');
    closeModal.setAttribute('class', 'btnClose');
    closeModal.innerHTML = `Close X`;
    structModalBody.append(closeModal);
    closeModal.addEventListener('click', () => {
        bodyModal.remove();
        structureModal.removeAttribute('class', 'OpenModal');
        structureModal.setAttribute('class', 'CloseModal');
        constructCalendar()
    })



    // structureModal.addEventListener("click", (e) =>{
    //     let isClickInside = bodyModal.contains(event.target); 

    //     if(!isClickInside){
    //         bodyModal.remove();
    //         structureModal.removeAttribute('class', 'OpenModal'); 
    //         structureModal.setAttribute('class', 'CloseModal');
    //         constructCalendar() 
    //     }
    // });



    manageBtnModal(j, CONFIG_DAY, bodyModal);
    structModalBody.append(bodyModal);
}


function manageBtnModal(j, CONFIG_DAY, bodyModal) {
    var titleModal = document.createElement('div');
    titleModal.setAttribute('class', 'titleModal');
    titleModal.innerHTML = `Mesures appliqués au jours ${j} de l'épidémie !`;
    bodyModal.append(titleModal);

    for (let rule in CONFIG_DAY.rules) {
        var divRule = document.createElement('button');
        divRule.setAttribute('id', `${j}-${rule}`);
        divRule.setAttribute('class', 'styleBtnRuleModal');

        let spanNameRule = document.createElement('span');
        spanNameRule.innerHTML = `${CONFIG_DAY.name[rule]}`;
        divRule.appendChild(spanNameRule);

        // console.log(rule); 
        // console.log(allDayRule[j].rules);

        let unicodeRule;
        switch (rule) {
            case 'rule1':
                unicodeRule = "\u{1F3DF}";
                break;
            case 'rule2':
                unicodeRule = "\u{1F3ED}";
                break;
            case 'rule3':
                unicodeRule = "\u{1F4DA}";
                break;
            case 'rule4':
                unicodeRule = "\u{1F637}";
                break;
            case 'rule5':
                unicodeRule = "\u{1F9FC}";
                break;
            case 'rule6':
                unicodeRule = "\u{2194}";
                break;
        }

        let spanEmojiRule = document.createElement('span');
        spanEmojiRule.innerHTML = `${unicodeRule}`;
        divRule.appendChild(spanEmojiRule);

        if (CONFIG_DAY.rules[rule]) {
            if (rule === "rule4" || rule === "rule5" || rule === "rule6") {
                divRule.setAttribute('class', `styleBtnRuleModal offRule`);
            } else {
                divRule.setAttribute('class', `styleBtnRuleModal onRule`);
            }
            divRule.setAttribute('name', `${j}${rule}`);

        } else {
            if (rule === "rule4" || rule === "rule5" || rule === "rule6") {
                divRule.setAttribute('class', `styleBtnRuleModal onRule`);
            } else {
                divRule.setAttribute('class', `styleBtnRuleModal offRule`);
            }
            divRule.setAttribute('name', `${j}${rule}`);
        }

        bodyModal.appendChild(divRule);

        divRule.addEventListener('click', () => {
            // console.log(j);

            allDayRule[j].rules[rule] = !allDayRule[j].rules[rule];
            allDayRule[j].checkHandleRules[rule] = !allDayRule[j].checkHandleRules[rule];

            Object.keys(allDayRule[j]).forEach(keyDayRule => {
                if (allDayRule[j][keyDayRule] && keyDayRule !== "setRuleDay") {
                    allDayRule[j].setRuleDay = true
                }
            })

            // fonction set de l'objet 
            let setJ = j;
            while (setJ < 364) {

                allDayRule[setJ].rules[rule] = allDayRule[j].rules[rule];
                setJ++

                if (allDayRule[setJ].checkHandleRules[rule]) {
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

function creatorData(){

    for (let jc = 1; jc < 365; jc++) {

        let currentData = {
            rules:{
                rule1:false,
                rule2:false,
                rule3:false,
                rule4:false,
                rule5:false,
                rule6:false
            },
            name:{
                rule1:"Event +500p",
                rule2:"Travail + Activité",
                rule3:"Etablissements Scolaires",
                rule4:"Masques",
                rule5:"Lavage de main",
                rule6:"Distance 1m"
            },
            unicodeRule:{
                rule1:"🏟",
                rule2:"🏭",
                rule3:"📚",
                rule4:"😷",
                rule5:"🧼",
                rule6:"↔"
            },
            checkHandleRules:{
                rule1:false,
                rule2:false,
                rule4:false,
                rule5:false,
                rule6:false
            },
            setRuleDay:false
        }

        if(jc >= 45 && jc<100){
            currentData.rules.rule1 = true; 
            currentData.rules.rule2 = true; 
            currentData.rules.rule3 = true; 
            currentData.rules.rule5 = true; 
            currentData.rules.rule6 = true;
            if(jc === 45){
                currentData.checkHandleRules.rule1 = true; 
                currentData.checkHandleRules.rule2 = true; 
                currentData.checkHandleRules.rule3 = true; 
                currentData.checkHandleRules.rule5 = true; 
                currentData.checkHandleRules.rule6 = true;
                currentData.setRuleDay = true; 
            }
            
        }else if( jc>=100){
            currentData.rules.rule1 = true; 
            currentData.rules.rule4 = true; 
            currentData.rules.rule5 = true; 
            currentData.rules.rule6 = true;
            if(jc === 100){
                currentData.checkHandleRules.rule1 = true; 
                currentData.checkHandleRules.rule4 = true; 
                currentData.checkHandleRules.rule5 = true; 
                currentData.checkHandleRules.rule6 = true;
                currentData.setRuleDay = true; 
            }   
        }

        allDayRule = {
            ...allDayRule, 
            [jc] : currentData 
        }
        console.log('for update creator allDayRule', jc, allDayRule); 
    }
}
