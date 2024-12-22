messages = ["Hello", "World!"]

textbox = document.getElementById("textgenerator");

prevIndex = null;
currentText = "";
animateIn = function() {
    textbox.innerHTML = randomText();
    setTimeout(animateIn, 1000); 
}

randomText = function() {
    min = Math.ceil(0);
    max = Math.floor(messages.length);
    do {
        currentIndex = messages[Math.floor(Math.random() * (max - min) + min)];
    } while(currentIndex == prevIndex);
    prevIndex = currentIndex;
    return currentIndex
}

animateIn();
