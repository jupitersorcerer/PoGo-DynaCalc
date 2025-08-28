function fillTypeDropdown(typeSelectDropdownID){
    select = document.getElementById(typeSelectDropdownID);
    for(var typing in typeArray){
        var opt = document.createElement('option');
        opt.value = typing;
        opt.innerHTML = typeArray[typing];
        select.appendChild(opt);
    }
}


var tableContainer = document.getElementById('table-box');
var table = document.createElement('table');

var initTable = function(){
    if(tableContainer.hasChildNodes()){
        for(var child in tableContainer.childNodes){
            console.log(child);
            tableContainer.removeChild(child);
        }
    }

    var headding = document.createElement('p');
    headding.innerHTML = 'Data';
    tableContainer.appendChild(headding);

    table = document.createElement('table');
    tableContainer.appendChild(table);
};

var updateCalcData = function(){
    attack1 = document.getElementById('attack-input1').value;
    IV1 = document.getElementById('iv-input1').value;
    isStab1 = document.getElementById('stab-checkbox1').checked;
    isGMax1 = document.getElementById('gmax-checkbox1').checked;
    attackType1 = document.getElementById('type-select1').selectedIndex;

    attack2 = document.getElementById('attack-input2').value;
    IV2 = document.getElementById('iv-input2').value;
    isStab2 = document.getElementById('stab-checkbox2').checked;
    isGMax2 = document.getElementById('gmax-checkbox2').checked;
    attackType2 = document.getElementById('type-select2').selectedIndex;

    defendingType1 = document.getElementById('defending-type-select1').selectedIndex;
    defendingType2 = document.getElementById('defending-type-select2').selectedIndex;
    defendingDefense = document.getElementById('defender-defense-input').value;

    tem1 = getTypeEffectivenessMultiplier(attackType1, defendingType1, defendingType2);
    tem2 = getTypeEffectivenessMultiplier(attackType2, defendingType1, defendingType2);
};

var fillTable = function(){
    for(var level in levels){
        var tableRow = document.createElement('tr');
        var cellleft1 = document.createElement('td');
        var cellleft2 = document.createElement('td');
        var cellleft3 = document.createElement('td');
        var cellmiddle = document.createElement('td');
        var cellright1 = document.createElement('td');
        var cellright2 = document.createElement('td');
        var cellright3 = document.createElement('td');

        var attackAtLevel1 = getAttackAtLevel(attack1, IV1, levels[level]);
        var attackAtLevel2 = getAttackAtLevel(attack2, IV2, levels[level]);
        var moveChoice1 = isGMax1 ? 1 : 0;
        var moveChoice2 = isGMax2 ? 1 : 0;
        cellleft1.innerText = simulateDamageOnTarget(moveBasePower[moveChoice1][0], attackAtLevel1, defendingDefense, isStab1, tem1);
        cellleft2.innerText = simulateDamageOnTarget(moveBasePower[moveChoice1][1], attackAtLevel1, defendingDefense, isStab1, tem1);
        cellleft3.innerText = simulateDamageOnTarget(moveBasePower[moveChoice1][2], attackAtLevel1, defendingDefense, isStab1, tem1);
        cellmiddle.innerText = levels[level];
        cellright1.innerText = simulateDamageOnTarget(moveBasePower[moveChoice2][0], attackAtLevel2, defendingDefense, isStab2, tem2);
        cellright2.innerText = simulateDamageOnTarget(moveBasePower[moveChoice2][1], attackAtLevel2, defendingDefense, isStab2, tem2);
        cellright3.innerText = simulateDamageOnTarget(moveBasePower[moveChoice2][2], attackAtLevel2, defendingDefense, isStab2, tem2);
        

        tableRow.appendChild(cellleft1);
        tableRow.appendChild(cellleft2);
        tableRow.appendChild(cellleft3);
        tableRow.appendChild(cellmiddle);
        tableRow.appendChild(cellright1);
        tableRow.appendChild(cellright2);
        tableRow.appendChild(cellright3);
        table.appendChild(tableRow);
    }
};

var calcFunction = function(){
    updateCalcData();
    initTable();
    fillTable();
};


fillTypeDropdown('type-select1');
fillTypeDropdown('type-select2');
fillTypeDropdown('defending-type-select1');
fillTypeDropdown('defending-type-select2');

document.getElementById('calc-button').addEventListener('click', calcFunction);