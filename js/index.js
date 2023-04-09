(function() {
    let sliderInputs = document.querySelectorAll("#slider input[type='radio']");
    let currentIndex = 0;
    let sliderInterval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= sliderInputs.length) {
            currentIndex = 0;
        }
        sliderInputs[currentIndex].checked = true;
    }, 5000);
})();
