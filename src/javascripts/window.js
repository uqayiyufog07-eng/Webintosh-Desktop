import { createAlert } from "./ui/alert.js";

let fd = document.querySelector(".finderbar")

export function create(file, light) {
    fetch(file)
        .then(response => {
            if (response.status !== 200) {
                createAlert("./assets/icons/访达.svg", "加载 App 时遇到错误", `服务器返回状态码: ${response.status}`, "好", "close");
                return;
            }
            response.text()
                .then((content) => {
                    let cleanFile = file.split("/").pop().split(".")[0];
                    document.body.innerHTML += content;
                    let script = document.createElement("script");
                    script.src = `./src/javascripts/apps/${cleanFile}.js`;
                    script.type = "module";
                    document.body.appendChild(script);
                    let link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = `./assets/stylesheets/apps/${cleanFile}/index.css`;
                    document.querySelector("head").appendChild(link);
                });
        })
        .catch(error => {
            console.error('Error opening app:', error);
        });
    setTimeout(() => {
        fd.style.height = "24px";
        if (Array.from(fd.classList).includes("macbook")) {
            fd.style.height = "35px";
        }
        resetWindowListeners(light);
    }, 150);
}

export function resetWindowListeners(light) {
    let windows = document.querySelectorAll(".window");
    windows.forEach(win => {
        let closeBtn = win.querySelector(".wintools .red");
        let miniBtn = win.querySelector(".wintools .yellow");
        let zoomBtn = win.querySelector(".wintools .green");

        const closeWindow = () => {
            win.remove();
            light.classList.remove("on");
        };

        win._closeWindow = closeWindow;

        closeBtn.addEventListener("click", () => {
            closeWindow();
        });
        miniBtn.addEventListener("click", () => {
            console.log("Clicked minimize");
        });
        zoomBtn.addEventListener("click", () => {
            console.log("Clicked maximize");
        });

        addWindowDrag(win);
    });
}

function addWindowDrag(windowElement) {
    let isDragging = false;
    let offsetX, offsetY;

    const titleBar = windowElement;

    titleBar.addEventListener('mousedown', function (e) {
        isDragging = true;

        offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        offsetY = e.clientY - windowElement.getBoundingClientRect().top;

        windowElement.style.zIndex = 1000;
        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        const maxX = window.innerWidth - windowElement.offsetWidth;
        const maxY = window.innerHeight - windowElement.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(document.querySelector(".finderbar").offsetHeight, Math.min(newY, maxY));

        windowElement.style.left = newX + 'px';
        windowElement.style.top = newY + 'px';
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });
}