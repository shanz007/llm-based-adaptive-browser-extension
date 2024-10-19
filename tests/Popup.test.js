// Popup.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import Popup from '../src/components/Popup.js';
import '@testing-library/jest-dom'; // Import this line

// Mock the chrome.tabs.query function
beforeAll(() => {
  global.chrome = {
    tabs: {
      query: jest.fn((queryInfo, callback) => {
        // Mocking response of chrome.tabs.query
        callback([
          { id: 1, title: 'Tab 1' },
          { id: 2, title: 'Tab 2' },
        ]);
      }),
    },
  };
});

describe('Popup Component', () => {
  test('renders Open Tabs header', () => {
    render(<Popup />);
    const headerElement = screen.getByText(/Open Tabs/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('displays the list of open tabs', async () => {
    render(<Popup />);
    
    // Check if the tab titles are displayed
    const tab1 = await screen.findByText('Tab 1');
    const tab2 = await screen.findByText('Tab 2');

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
  });

  test('renders empty list when no tabs are open', async () => {
    // Change the mock implementation for this test
    chrome.tabs.query.mockImplementation((queryInfo, callback) => {
      callback([]); // No tabs
    });

    render(<Popup />);
    
    const noTabsMessage = await screen.findByText(/Open Tabs/i); // Check for header presence
    expect(noTabsMessage).toBeInTheDocument();
    expect(screen.queryByText('Tab 1')).toBeNull(); // Check that no tabs are displayed
    expect(screen.queryByText('Tab 2')).toBeNull(); // Check that no tabs are displayed
  });
});
