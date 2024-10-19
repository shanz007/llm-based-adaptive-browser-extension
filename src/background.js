chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome Extension installed');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log(`Tab updated: ${tab.title}`);
  }
});
