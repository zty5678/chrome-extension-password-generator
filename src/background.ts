// function polling() {
//   // console.log("polling");
//   setTimeout(polling, 1000 * 30);
// }

// polling();



function consoleLog(arg1: string) {
  console.log(`${arg1}`);
}

function showNotification(title: string, msg:string) {
  chrome.notifications.create(`my-notification-${Date.now()}`, {
    type: "basic",
    iconUrl: "../icon.png",
    title:  title,
    message: msg,
 });

}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'consoleLog') {
    const result = consoleLog(request.arg1);
    sendResponse(result);
  }else if(request.action === 'showNotification'){
    showNotification(request.arg1, request.arg2)
  }
});

