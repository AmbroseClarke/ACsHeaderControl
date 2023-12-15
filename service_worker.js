//Ambrose Clarke - December 2023
//Developed from the Chrome Extensions SDK by Google

chrome.runtime.onInstalled.addListener(async function () {
  // restore the default rule if the extension is installed or updated
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existingRules.map((rule) => rule.id),
    addRules: [
	  {
        id: 1,
        action: {
          type: 'modifyHeaders',
          requestHeaders: [
            {
              header: 'referer',
              operation: 'set',
			  value: 'whatever'
            }
          ]
        },
        condition: {
          regexFilter: '.*',
          resourceTypes: ['main_frame', 'xmlhttprequest']
        }
      }
    ]
  });
});

chrome.declarativeNetRequest.setExtensionActionOptions({
  displayActionCountAsBadgeText: true
});

