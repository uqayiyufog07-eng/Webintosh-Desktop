import { create } from "./window.js";

const defaultApps = [
    "访达", "启动台", "Safari浏览器", "信息", "邮件", "地图", "照片", "FaceTime通话",
    "日历", "通讯录", "提醒事项", "备忘录", "音乐", "视频", "播客", "News", "系统设置",
    "hr", "Download_Folder", "废纸篓"
];

export const dock = document.getElementById("dock");

function init() {
    defaultApps.forEach((app, index) => {
        let container = document.createElement("div");
        container.classList.add("container");
        if (app != "hr") {
            let img = document.createElement("img");
            img.src = `assets/icons/${app}.svg`;
            if (app.endsWith("Folder")) {
                img.src = "assets/icons/folder.svg";
            }
            container.appendChild(img);
            let light = document.createElement("div");
            light.classList.add("light");
            if (index == 0) {
                light.classList.add("on");
            }
            container.appendChild(light);

            img.addEventListener("mousedown", () => {
                img.style.filter = "brightness(0.5)";
            });
            img.addEventListener("mouseup", () => {
                img.style.filter = "brightness(1)";
                create("assets/apps/"+app+".html", light);
                light.classList.add("on");
            });
        } else {
            let hr = document.createElement("hr");
            container.appendChild(hr);
        }
        dock.appendChild(container);
    })
}
init();