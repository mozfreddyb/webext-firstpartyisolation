"use strict";
const FIVE_MINUTES = 1000*60*5;
let enabled = true;

function updateIcon(prefEnabled) {
    // TODO maybe this needs a state of the enabled/disabled/error kind
    // e.g., when levelOfControl == not_controllable
    browser.browserAction.setIcon({
        path: prefEnabled ?
            "icons/fishbowl.svg":
            "icons/fishbowl-disabled.svg"
    });
    browser.browserAction.setTitle({
        // Screen readers can see the title
        title: prefEnabled ?
            "Click to disable First Party Isolation for 5 minutes" :
            'Click to re-enable First Party Isolation',
    });
}
function refreshUI() {
    chrome.privacy.websites.firstPartyIsolate.get({},(details) => {

            updateIcon(details.levelOfControl !== "not_controllable" ?
                details.value :
                false);
    });
}

browser.browserAction.onClicked.addListener(() => {
    chrome.privacy.websites.firstPartyIsolate.set({ value: !enabled }, () => {
        if ((chrome.runtime.lastError === undefined) || (chrome.runtime.lastError === null)) {
            enabled = !enabled;
        } else {
            enabled = false;
        }
        updateIcon(enabled);
        setTimeout(refreshUI, FIVE_MINUTES);
    });

});

// Enable FPI when the extension runs and listen for changes
chrome.privacy.websites.firstPartyIsolate.set({ value: true});

//XXX onChange doesn't work just yet.
//chrome.privacy.websites.firstPartyIsolate.onChange.addListener(prefChanged);



