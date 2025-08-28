var attack1 = 100;
var IV1 = 10;
var isStab1 = false;
var isGMax1 = false;
var attackType1 = 0;

var attack2 = 100;
var IV2 = 10;
var isStab2 = false;
var isGMax2 = false;
var attackType2 = 0;

var defendingType1 = 0;
var defendingType2 = 0;
var defendingDefense = 150;

var tem1 = 1;
var tem2 = 2;

function getTypeEffectivenessMultiplier(attacking, defending1, defending2){
    return (typeEffectiveness[attacking][defending1] / 100 ) * (typeEffectiveness[attacking][defending2] / 100);
};

function getAttackAtLevel(baseAttack, iv, level){
    return (baseAttack + iv) * cpmtable[levels.indexOf(level)];
};

function simulateDamageOnTarget(movePower, attack, defense, isStab, tem){
    return (Math.floor((0.5 * movePower * (attack / defense) * (isStab ? 1.2 : 1) * tem1) * 100) / 100).toFixed(2);
};