function Something() {
    this.value = 1;
    setInterval(function increase() {
        this.value++;
    }, 1000);
}
const obj = new Something();