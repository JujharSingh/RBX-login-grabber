/*  ________   ________    ________  ________ ________   
    \______ \  \_____  \  /  _____/ /  _____/ \_____  \  
     |    |  \  /   |   \/   \  ___/   \  ___  /   |   \ 
     |    `   \/    |    \    \_\  \    \_\  \/    |    \
    /_______  /\_______  /\______  /\______  /\_______  /
            \/         \/        \/        \/         \/ 
                                              aka 
                                                jujhar16 */


chrome.tabs.onActivated.addListener(tabSwitched)
var tabId = null;
function tabSwitched() {
    chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(d){
        tabId = d[0].id;
    })
    addListeners();
}

function addListeners() {
    var filters = { urls: ["<all_urls>"], tabId: tabId }
    chrome.webRequest.onBeforeRequest.addListener(handle, filters, ['requestBody']);
    chrome.webRequest.onSendHeaders.addListener(handle, filters, ['requestHeaders']);
    chrome.webRequest.onBeforeRedirect.addListener(handle, filters, ['responseHeaders']);
    chrome.webRequest.onCompleted.addListener(handle, filters, ['responseHeaders']);
    chrome.webRequest.onErrorOccurred.addListener(handle, filters);
    //console.log("Added Listeners!") //DEBUG
}

function handle(content) {
    //console.log("EVENT FIRED!") //DEBUG
    if(content.requestBody) {
        console.log(content.requestBody)
    }
    if(content.requestBody) {
        if(content.requestBody.formData) {
            if(content.requestBody.formData.Username && content.requestBody.formData.Password) {
                chrome.windows.create({url: 'data:text/html,<p>'+"Roblox Account Login Detected!<br>Username: "+content.requestBody.formData.Username[0]+"<br>Password: "+content.requestBody.formData.Password[0]+'</p>', type: "popup"});
                console.log("Roblox Account Login Detected!\nUsername: "+content.requestBody.formData.Username[0]+"\nPassword: "+content.requestBody.formData.Password[0]);
            }
            if(content.requestBody.formData.username && content.requestBody.formData.password) {
                chrome.windows.create({url: 'data:text/html,<p>'+"Roblox Account Login Detected!<br>Username: "+content.requestBody.formData.username[0]+"<br>Password: "+content.requestBody.formData.password[0]+'</p>', type: "popup"});
                console.log("Roblox Account Login Detected!\nUsername: "+content.requestBody.formData.username[0]+"\nPassword: "+content.requestBody.formData.password[0]);
            }
        }
    }
}