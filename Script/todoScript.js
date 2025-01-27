const dropDown = document.querySelector('.custom-dropdown');

dropDown.addEventListener('click', function () {
    const options = document.querySelector('.dropdown-options');
    const defaultOpt = document.querySelector('.default');

    if (options.classList.contains("opt-active")) {
        options.classList.remove("opt-active");
        defaultOpt.classList.remove("hidden"); 
    } else {
        options.classList.add("opt-active");
        defaultOpt.classList.add("hidden"); 
    }
});


function setActive(input) {
    const defaultOpt = document.querySelector('.default');
    const options = document.querySelectorAll('.custom-dropdown .option');
    options.forEach(option => option.classList.remove('selected'));

    const optionSelect = document.querySelector(`.custom-dropdown .option.${input}`);
    if (optionSelect) {
        optionSelect.classList.add('selected');
        defaultOpt.textContent = optionSelect.textContent;

        const urgencyLevels = ['low', 'medium', 'high'];
        defaultOpt.classList.remove(...urgencyLevels);
        if (urgencyLevels.includes(input)) {
            defaultOpt.classList.add(input);
        }
    }
}

