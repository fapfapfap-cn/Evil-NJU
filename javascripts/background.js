chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF'
  });
});

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'ON' ? 'OFF' : 'ON';

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState
  });

  if (nextState === 'ON') {
    // Insert the CSS file when the user turns the extension on
    await chrome.scripting.insertCSS({
      files: ['css/focus-mode.css'],
      target: { tabId: tab.id }
    });
  } else if (nextState === 'OFF') {
    // Remove the CSS file when the user turns the extension off
    await chrome.scripting.removeCSS({
      files: ['css/focus-mode.css'],
      target: { tabId: tab.id }
    });
  }
});