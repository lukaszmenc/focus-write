var textArea = document.getElementById("textArea");

function initializeTextEditor() {
    var savedText = localStorage.getItem("savedText");
    if (savedText) {
        textArea.value = savedText;
        updateCounts();
    }

    textArea.addEventListener("input", function() {
        updateCounts();
    });
}

function saveToFile() {
    var text = textArea.value;

    var fileName = prompt("File name (without extension)");
    if (!fileName) {
        alert("Text was not saved to file");
        return;
    }

    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    var a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = fileName + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    alert("Text saved to file successfully!");
}

function loadFromFile() {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'text/plain';

    fileInput.onchange = function(event) {
        var file = event.target.files[0];
        if (!file) {
            return;
        }

        var reader = new FileReader();
        reader.onload = function(event) {
            var contents = event.target.result;
            textArea.value = contents;
            updateCounts();
        };

        reader.readAsText(file);
    };

    fileInput.click();
}

function clearText() {
    textArea.value = "";
    updateCounts();
    saveTextToLocalStorage();
}

function updateCounts() {
    var text = textArea.value;
    var words = text.match(/\S+/g) || [];
    var wordCount = words.length;
    var charCountNoSpaces = text.replace(/\s/g, "").length;
    var charCountWithSpaces = text.length;

    document.getElementById("wordCount").textContent = wordCount;
    document.getElementById("charCountNoSpaces").textContent = charCountNoSpaces;
    document.getElementById("charCountWithSpaces").textContent = charCountWithSpaces;

    saveTextToLocalStorage();
}

function saveTextToLocalStorage() {
    var text = textArea.value;
    localStorage.setItem("savedText", text);
}

function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

initializeTextEditor();
