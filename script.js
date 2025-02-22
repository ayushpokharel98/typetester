document.addEventListener("keyup", (e) => {
    document.querySelectorAll("kbd").forEach((keycode) => {
        const keyName = (e.key === " " ? "Spacebar" : e.key.toUpperCase());

        if (keycode.innerText === keyName) {
            keycode.classList.remove("flash");

            void keycode.offsetWidth;

            keycode.classList.add("flash");
        }
    });
});