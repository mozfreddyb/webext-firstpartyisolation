'use strict';

let enabled = true;
// Enable FPI when the extension runs
setFPI(true).then(() => {
  updateIcon(enabled);
});

function updateIcon(prefEnabled) {
  // TODO maybe this needs a state of the enabled/disabled/error kind
  // e.g., when levelOfControl == not_controllable
  browser.browserAction.setIcon({
    path: prefEnabled ?
      'icons/fishbowl-light.svg' :
      'icons/fishbowl-disabled.svg'
  });
  browser.browserAction.setTitle({
    // Screen readers can see the title
    title: prefEnabled ?
      browser.i18n.getMessage('TooltipDisableFPI') :
      browser.i18n.getMessage('TooltipReEnableFPI')
  });
}

/*
function refreshUI() {
  chrome.privacy.websites.firstPartyIsolate.get({},(details) => {
    updateIcon(details.levelOfControl !== 'not_controllable' ?
      details.value :
      false);
  });
}
*/

async function setFPI(state) {
  if (state) {
    // Can't enable FPI if cookieConfig uses dFPI ("reject_trackers_and_partition_foreign")
    // so instead, we'll downgrade to strict tracking protection
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=1649876
    const cookieConfig = await browser.privacy.websites.cookieConfig.get({});
    if (cookieConfig.value.behavior == "reject_trackers_and_partition_foreign") {
      await browser.privacy.websites.cookieConfig.set({ behavior: "reject_trackers"});
    }
  }
  await browser.privacy.websites.firstPartyIsolate.set({ value: state });
  if (!browser.runtime.lastError) {
      enabled = state;
  } else {
    enabled = false;
  }
}

browser.browserAction.onClicked.addListener(() => {
  setFPI(!enabled).then(() => {
        updateIcon(enabled);
  });
});

// XXX onChange doesn't work just yet.
//chrome.privacy.websites.firstPartyIsolate.onChange.addListener(prefChanged);

// build context-menu to disable temporarily and permanently
/*
browser.menus.create({
  id: 'toggle',
  title: 'Disable First Party Isolation (5 minutes)',
  contexts: ['browser_action']
});

browser.menus.create({
  id: 'disabletemp',
  title: 'Disable First Party Isolation',
  contexts: ['browser_action']
});

browser.menus.onClicked((clickData) => {
  let id = clickData.menuItemId;

  switch(id) {
    case 'toggle':
      break;
    case 'disabletemp':
      break;
  }
});
*/
