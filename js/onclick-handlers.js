function tableFillAllZeroesHandler() {
    tableFillAllZeroes();
    reprocessDisplayedFormulae(truthTable);
}

function tableFillAllOnesHandler(){
    tableFillAllOnes();
    reprocessDisplayedFormulae(truthTable);
}

function tableFillAllIndeterminationsHandler() {
    tableFillAllIndeterminations();
    reprocessDisplayedFormulae(truthTable);
}

function tableClearAllHandler() {
    tableClearAll();
    reprocessDisplayedFormulae(truthTable);
}

function printAllHandler(){
    printAll();
}

function downloadUnlinkedVHDLHandler() {
    downloadUnlinkedVHDL();
}

function downloadLinkedVHDLHandler() {
    downloadLinkedVHDL();
}

function callExternalServiceHandler() {
    callExternalServiceIfAvailable();
}

function displaySumOfMintermsBtnHandler() {
    document.getElementById("displayedFormulaName").innerHTML = "Sum of minterms";
    toggleDisplayedFormulaToSumOfMinterms();
    reprocessDisplayedFormulae(truthTable);
}
function displaySumOfMaxtermsBtnHandler() {
    document.getElementById("displayedFormulaName").innerHTML = "Product of maxterms";
    toggleDisplayedFormulaToProductOfMaxterms();
    reprocessDisplayedFormulae(truthTable);
}
