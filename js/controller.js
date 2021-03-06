function configure(config_json) {
    var config = JSON.parse(config_json);
    if(config.type != "config")
        return;

    //Set up statement
    var statement = config.statement;
    var statementIsEditable = config.statementIsEditable;
    
    quill.container.firstChild.innerHTML = statement;
    if(!statementIsEditable) {
        quill.disable();
    }

    if(typeof(config.entityName)=="undefined"){
        document.getElementById("tbTitle").value = "";
        document.getElementById("tbTitle").readOnly = false;
    }
    else{
        document.getElementById("tbTitle").value = config.entityName;
        document.getElementById("tbTitle").readOnly = !config.entityNameIsModifiable;
    }

    //Set up inputs: add as many as needed, set them to their value and then flag them
    //read only as needed.

    var inputCount = config.inputCount;
    var outputCount = config.outputCount;
    var inputNames = config.inputs;
    var outputNames = config.outputs;
    var inputsAreReadOnly = !config.inputsAreModifiable;
    var outputsAreReadOnly = !config.outputsAreModifiable;
    var inputCountIsReadOnly = !config.inputCountIsEditable;
    var outputCountIsReadOnly = !config.outputCountIsEditable;
    var capturedTruthTable = config.truthTable;

    for(var i = 0; i<inputCount-1; i++){
        jQuery._data( document.getElementById("add_input"),"events").click[0].handler();
    }
    for(var i = 0; i<outputCount-1; i++){
        jQuery._data( document.getElementById("add_output"),"events").click[0].handler();
    }

    for(var i = 0; i<inputCount; i++) {
        var currentInput = document.getElementById("input"+i);
        currentInput.value = ((inputNames!=null) ? inputNames[i] : "");
        if(inputsAreReadOnly) {
            currentInput.readOnly = true;
            var currentRemove = document.getElementById("inDelete"+i);
            if(currentRemove!=null){
                currentRemove.remove();
            }
        }
    }
    for(var i = 0; i<outputCount; i++) {
        var currentOutput = document.getElementById("output"+i);
        currentOutput.value = ((outputNames!=null) ? outputNames[i] : "");;
        if(outputsAreReadOnly) {
            currentOutput.readOnly = true;
            var currentRemove = document.getElementById("outDelete"+i);
            if(currentRemove!=null){
		currentRemove.remove();
            }
        }
    }
    
    var inputRemoveControls = document.getElementsByClassName("remove_input");
    var outputRemoveControls = document.getElementsByClassName("remove_output");

    if(inputCountIsReadOnly) {
        for (var i = 0; i<inputRemoveControls.length; i++) {
            var toRemove = inputRemoveControls[i];
            inputRemoveControls[i].parentNode.removeChild(toRemove);
        }
        document.getElementById("add_input").disabled = true;
        document.getElementById("input"+inputCount).remove();
        if(!inputsAreReadOnly)
	    document.getElementById("inDelete"+inputCount).remove();
    }
    
    if(outputCountIsReadOnly) {
        for (var i = 0; i<outputRemoveControls.length; i++) {
            var toRemove = outputRemoveControls[i];
            outputRemoveControls[i].parentNode.removeChild(toRemove); 
        }
        document.getElementById("add_output").disabled = true;
        document.getElementById("output"+outputCount).remove();
        if(!outputsAreReadOnly)
	    document.getElementById("outDelete"+outputCount).remove();
    }
    evaluateInputOutputStatus();

    if(typeof capturedTruthTable != "undefined") {
        gQueuedTruthTable = truthTable = capturedTruthTable;

    }
    
}


function configure_integration(integration_config_json) {
    var config = JSON.parse(integration_config_json);
    if(config.type != "integrationConfig")
        return;

    document.getElementById("btnExternalSvc").innerHTML = config.externalSvcBtnText;
    document.getElementById("btnLaunchExternalSvc").innerHTML = config.launchSvcBtnText;

    if(!config.downloadUnlinkedVHDLBtnEnabled){
        document.getElementById("btnUnlinkedVHDL").disabled = true;    
    }
    if(!config.downloadUnlinkedVHDLBtnPresent){
        document.getElementById("btnUnlinkedVHDL").remove();
    }
    if(!config.downloadLinkedVHDLBtnEnabled){
        document.getElementById("btnLinkedVHDL").disabled = true;
    }
    if(!config.downloadLinkedVHDLBtnPresent){
        document.getElementById("btnLinkedVHDL").remove();
    }

    if(typeof(config.archType) == "undefined"){
        gSystemArchitectureType = "behavioral";
    }
    else{
        gSystemArchitectureType = config.archType;
    }
    
    if(typeof(config.vhdlEntityName) == "undefined"){
        gSystemArchitectureName = _("Untitled");
    }
    else{
        gSystemArchitectureName = config.vhdlEntityName;
    }

    gPorts = config.ports;
    
}

function reset() {
    for (var i = $(".inputform").length-1; i>0 ; i--){
        $(".inputform")[i].remove();
    }
    $(".inputform")[0].value = "";
    for (var i = $(".outputform").length-1; i>0 ; i--){
        $(".outputform")[i].remove();
    }
    
    $(".inputform")[0].value = "";
    $(".outputform")[0].value = "";

    $("#tablaVerdad").remove();

    $(".remove_input").remove();
    $(".remove_output").remove();

    gDeclaredInputCount = 1;
    gDefinedInputCount = 0;
    gDeclaredOutputCount = 1;
    gDefinedOutputCount = 0;
    gInputHashmap = {};
    gOutputHashmap = {};
    gDuplicatedInputs = false;
    gDuplicatedOutputs = false;
    gQmcHashmap = {};
    gKarnaughHashmap = {};
    gSystemTitle = "";
    gCorrespondenceHashmap = {}

    $("#add_input").off("click");
    $("#add_output").off("click");
    setupEventListeners();
}
