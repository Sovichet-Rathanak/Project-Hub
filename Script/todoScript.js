const dropDown = document.querySelector('.custom-dropdown');

dropDown.addEventListener('click', function(){
    const options = document.querySelector('.dropdown-options');
    const defaultOpt = document.querySelector('.default-option');

    if(options.classList.contains("opt-active")){
        options.classList.remove("opt-active");
        defaultOpt.classList.remove("inactive")
    }else{
        options.classList.add("opt-active");
        defaultOpt.classList.add("inactive")
    }
})