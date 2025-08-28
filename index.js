function colourGradientor(p, rgb_beginning, rgb_end){
    var w = p * 2 - 1;
    var w1 = (w + 1) / 2.0;
    var w2 = 1 - w1;

    var rgb = [parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2),
        parseInt(rgb_beginning[1] * w1 + rgb_end[1] * w2),
            parseInt(rgb_beginning[2] * w1 + rgb_end[2] * w2)];
    return 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
};
var gradientFinish = [0xED, 0xED, 0xED];
var gradientStart = [0x49, 0xC9, 0x28];
var lowestDamage = 1;
var highestDamage = 2;

function getRelativePercentageToDamageGate(input){
    return (input - lowestDamage) / (highestDamage - lowestDamage);
}


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
        while(tableContainer.hasChildNodes()){
            tableContainer.removeChild(tableContainer.childNodes[0]);
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

    lowestDamage = simulateDamageOnTarget(moveBasePower[(isGMax1 && isGMax2) ? 1 : 0][0], getAttackAtLevel(Math.min(attack1, attack2), Math.min(IV1, IV2), subLevels[0]), defendingDefense, (isStab1 && isStab2), Math.min(tem1,tem2));
    highestDamage = simulateDamageOnTarget(moveBasePower[(isGMax1 || isGMax2) ? 1 : 0][2], getAttackAtLevel(Math.max(attack1, attack2), Math.max(IV1, IV2), subLevels[subLevels.length-1]), defendingDefense, (isStab1 || isStab2), Math.max(tem1,tem2));
};

var subLevels = levels.slice(28);

function generateTableHead(){
    var tableRow = document.createElement('tr');
    var cellleft = document.createElement('td');
    cellleft.setAttribute('colspan', 3);
    var cellmiddle = document.createElement('td');
    var cellright = document.createElement('td');
    cellright.setAttribute('colspan', 3);

    var Mon1 = document.createElement('p');
    Mon1.innerText = 'Mon 1';
    cellleft.appendChild(Mon1);
    cellleft.classList.add('borderless');
    cellmiddle.classList.add('borderless');
    var Mon2 = document.createElement('p');
    Mon2.innerText = 'Mon 2';
    cellright.appendChild(Mon2);
    cellright.classList.add('borderless');

    tableRow.appendChild(cellleft);
    tableRow.appendChild(cellmiddle);
    tableRow.appendChild(cellright);
    table.appendChild(tableRow);
};

var fillTable = function(){
    generateTableHead();
    for(let level = 0; level < subLevels.length; level++){
        var tableRow = document.createElement('tr');
        var cellleft1 = document.createElement('td');
        var cellleft2 = document.createElement('td');
        var cellleft3 = document.createElement('td');
        var cellmiddle = document.createElement('td');
        var cellright1 = document.createElement('td');
        var cellright2 = document.createElement('td');
        var cellright3 = document.createElement('td');

        var attackAtLevel1 = getAttackAtLevel(attack1, IV1, subLevels[level]);
        var attackAtLevel2 = getAttackAtLevel(attack2, IV2, subLevels[level]);
        var moveChoice1 = isGMax1 ? 1 : 0;
        var moveChoice2 = isGMax2 ? 1 : 0;
        cellleft1.innerText = simulateDamageOnTarget(moveBasePower[moveChoice1][0], attackAtLevel1, defendingDefense, isStab1, tem1);
        cellleft1.style.backgroundColor = colourGradientor(getRelativePercentageToDamageGate(cellleft1.innerText), gradientStart, gradientFinish);
        cellleft2.innerText = simulateDamageOnTarget(moveBasePower[moveChoice1][1], attackAtLevel1, defendingDefense, isStab1, tem1);
        cellleft2.style.backgroundColor = colourGradientor(getRelativePercentageToDamageGate(cellleft2.innerText), gradientStart, gradientFinish);
        cellleft3.innerText = simulateDamageOnTarget(moveBasePower[moveChoice1][2], attackAtLevel1, defendingDefense, isStab1, tem1);
        cellleft3.style.backgroundColor = colourGradientor(getRelativePercentageToDamageGate(cellleft3.innerText), gradientStart, gradientFinish);
        cellmiddle.innerText = subLevels[level];
        cellmiddle.classList.add('level-cell');
        cellright1.innerText = simulateDamageOnTarget(moveBasePower[moveChoice2][0], attackAtLevel2, defendingDefense, isStab2, tem2);
        cellright1.style.backgroundColor = colourGradientor(getRelativePercentageToDamageGate(cellright1.innerText), gradientStart, gradientFinish);
        cellright2.innerText = simulateDamageOnTarget(moveBasePower[moveChoice2][1], attackAtLevel2, defendingDefense, isStab2, tem2);
        cellright2.style.backgroundColor = colourGradientor(getRelativePercentageToDamageGate(cellright2.innerText), gradientStart, gradientFinish);
        cellright3.innerText = simulateDamageOnTarget(moveBasePower[moveChoice2][2], attackAtLevel2, defendingDefense, isStab2, tem2);
        cellright3.style.backgroundColor = colourGradientor(getRelativePercentageToDamageGate(cellright3.innerText), gradientStart, gradientFinish);
        

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