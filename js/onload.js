window.onload = function() {
    //alert("called!");
    window.addEventListener('message', receiveMessage);
    addNewInterceptor(configureNewExercise);
    addNewInterceptor(configureNewIntegration);

    setupDrop(document.body, document.getElementById("fileUploadInput"));
    localizeAll();
}



