function onKeyUp() {
    console.log(this.value);
}
let input = document.querySelector("input");
input.addEventListener("keyup", onKeyUp);