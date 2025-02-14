const container = document.querySelector(".parent-container");

document.addEventListener("mousemove", (ev) => {
    rotateCard(ev, container);
})

function rotateCard(event, element){
    const x = event.clientX;
    const y = event.clientY;

    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;

    const offsetX =  ((x - midX) / midX) * 45;
    const offsetY =  ((y - midY) / midY) * 45;

    element.style.setProperty("--rotateX", -1* offsetX + "deg");
    element.style.setProperty("--rotateY", offsetY + "deg");
}