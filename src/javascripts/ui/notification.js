let newNotification;
let newNotificationTitle;
let newNotificationText;
let newNotificationTime;
let newNotificationCommand;

export function createNotification(icon, title, text, command, time = "now") {
    newNotification = document.createElement("c-notification");
    newNotification.iconpath = icon;
    newNotification.style.zIndex = 2048;
    newNotification.style.top = "34px";
    newNotificationTitle = document.createElement("p");
    newNotificationTitle.setAttribute("slot", "title");
    newNotificationTitle.innerHTML = title;
    newNotificationText = document.createElement("p");
    newNotificationText.setAttribute("slot", "text");
    newNotificationText.innerHTML = text;
    newNotificationTime = document.createElement("p");
    newNotificationTime.setAttribute("slot", "time");
    newNotificationTime.innerHTML = time;
    newNotificationCommand = new Function(command);
    newNotification.addEventListener("click", newNotificationCommand);
    newNotification.appendChild(newNotificationTitle);
    newNotification.appendChild(newNotificationText);
    newNotification.appendChild(newNotificationTime);
    document.body.appendChild(newNotification);
    // setTimeout(() => {
    //     newNotification.remove();
    // }, 5500);
}