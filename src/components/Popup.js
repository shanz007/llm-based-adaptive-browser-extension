import React, { useState, useEffect } from 'react';

function Popup() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    chrome.tabs.query({}, (result) => {
      setTabs(result);
    });
  }, []);

  return (
    <div>
      <h1>Open Tabs</h1>
      <ul>
        {tabs.map((tab) => (
          <li key={tab.id}>{tab.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Popup;
