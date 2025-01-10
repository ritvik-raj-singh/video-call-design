const smallvideo = document.getElementById("smallvideo");
let offsetX, offsetY;

const move = (e) => {
    smallvideo.style.left = `${e.clientX - offsetX}px`;
    smallvideo.style.top = `${e.clientY - offsetY}px`;
};

smallvideo.addEventListener("mousedown", (e) => {
    offsetX = e.clientX - smallvideo.offsetLeft;
    offsetY = e.clientY - smallvideo.offsetTop;
    document.addEventListener("mousemove", move);
});

document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", move);
});
