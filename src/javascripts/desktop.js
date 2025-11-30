import { finderbar } from './finderbar.js';
import { dock } from './dock.js';

let containerList = []

const desktop = document.getElementById("desktop");
const containers = document.querySelectorAll(".desktop .container");
containers.forEach((container) => {
    containerList.push(container);
})
console.log(containerList);

function getThumb(file) {
    return new Promise(resolve => {
        const fileType = file.type
        if (fileType.includes('image/')) {
            const url = URL.createObjectURL(file)
            resolve(url)
        } else if (fileType.includes('video/')) {
            //通过将视频绘制到canvas，再将canvas转换为blob对象即可。
            const canvas = document.createElement("canvas")
            const video = document.createElement("video")
            video.src = URL.createObjectURL(file)
            video.load()
            video.muted = true
            video.currentTime = 0.1
            // document.body.append(canvas)
            // document.body.append(video)
            video.onloadeddata = () => {
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                video.onseeked = () => {
                    const ctx = canvas.getContext('2d')
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                    //暂停截取视频帧后立即删除
                    resolve(canvas.toDataURL())
                    video.remove()
                    canvas.remove()
                }
                video.currentTime = 0.1
            }
        } else {
            resolve("../../assets/images/GenericDocumentIcon.png")
        }
    })
}

function getIcon(file, callback) {
    file.file((file) => {
        console.log(file.type);
        let src = "../../assets/images/GenericDocumentIcon.png";
        getThumb(file).then((url) => {
            src = url
            callback(url)
        })
    });
}

function addFile(file) {
    if (containerList[containerList.length - 1].querySelectorAll(".items").length < 6) {
        let item = document.createElement("div");
        item.classList.add("item");
        let icon = document.createElement("img");
        // icon.src = getIcon(file);
        let name = document.createElement("p");
        name.innerHTML = file.name;
        item.appendChild(icon);
        item.appendChild(name);
        containerList[containerList.length - 1].appendChild(item);
        getIcon(file, (src) => {
            console.log(src)
            icon.src = src;
        });
    } else {
        let container = document.createElement("div");
        container.classList.add("container");
        let item = document.createElement("div");
        item.classList.add("item");
        let icon = document.createElement("img");
        // icon.src = getIcon(file);
        let name = document.createElement("p");
        name.innerHTML = file.name;
        item.appendChild(icon);
        item.appendChild(name);
        containerList.push(container);
        container.appendChild(item);
        getIcon(file, (src) => {
            icon.src = src;
        });
    }
}

function addFolder(folder) {
    if (containerList[containerList.length - 1].querySelectorAll(".items").length < 6) {
        let item = document.createElement("div");
        item.classList.add("item");
        let icon = document.createElement("img");
        icon.src = "../../assets/images/Folder.png";
        let name = document.createElement("p");
        name.innerHTML = folder.name;
        item.appendChild(icon);
        item.appendChild(name);
        containerList[containerList.length - 1].appendChild(item);
    } else {
        let container = document.createElement("div");
        container.classList.add("container");
        let item = document.createElement("div");
        item.classList.add("item");
        let icon = document.createElement("img");
        icon.src = "../../assets/images/Folder.png";
        let name = document.createElement("p");
        name.innerHTML = folder.name;
        item.appendChild(icon);
        item.appendChild(name);
        containerList.push(container);
        container.appendChild(item);
    }
}

function resize() {
    // desktop.style.height = `${document.body.clientHeight - finderbar.clientHeight - dock.clientHeight - 5}px`;

    // let maxContainer = Math.floor(desktop.clientHeight / 120);
    // containerList.forEach((container, index) => {
    //     let items = Array.from(container.children);
    //     let nextOrLastItems;

    //     if (items.length > maxContainer) {
    //         console.log("items.length > maxContainer");
    //         nextOrLastItems = items.slice(maxContainer);
    //         nextOrLastItems.push(items[items.length - 1]);

    //         console.log(nextOrLastItems);

    //         nextOrLastItems.forEach((item) => {
    //             container.removeChild(item);
    //             if (item && containerList[index + 1]) {
    //                 containerList[index + 1].prepend(item);
    //             }
    //         });
    //     }
    // });
}

window.addEventListener("resize", resize);
resize();

window.addEventListener("dragenter", (event) => {
    console.log('dragenter');
    event.preventDefault();
});
window.addEventListener("dragleave", (event) => {
    event.preventDefault();
});
window.addEventListener("dragend", (event) => {
    event.preventDefault();
});
window.addEventListener("dragover", (event) => {
    event.preventDefault();
});
window.addEventListener("drop", (event) => {
    event.preventDefault();

    const files = event.dataTransfer.items;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.webkitGetAsEntry) {
            const entry = file.webkitGetAsEntry();
            if (entry.isDirectory) {
                addFolder(entry);
            } else if (entry.isFile) {
                addFile(entry);
            }
        } else {
            addFile(entry);
        }
    }

    cursor.classList.remove("copy");
});