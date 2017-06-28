function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files;

    if(typeof evt.dataTransfer == "undefined"){
        files = this.files;
    }
    else{
        files = evt.dataTransfer.files; // FileList object
    }

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++)
    {

        var reader = new FileReader();
        reader.onload = function(event)
        {
            // NOTE: event.target point to FileReader
            var contents = event.target.result;
            var lines = contents.split('\n');
            //////
            reset();
            configure(contents);
        };

        reader.readAsText(f);
    }
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function setupDrop(dropzone, directfileinput){
  // Setup the dnd listeners.
  var dropZone = dropzone;
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  directfileinput.addEventListener('change', handleFileSelect, false);
}
