import './style.css';
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";






const Popup = () => {
  const [currentPassword, setCurrentPassword] = useState<string>();

  useEffect(() => {
    setCurrentPassword(getCurrentPassword());

  }, []);


  const copyToClipboard = (text: string) => {
    const input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
  };

  const getCurrentPassword = (): string => {
    return generateRandomPassword(20);
  };
  const refreshPwd = () => {
    setCurrentPassword(getCurrentPassword());
  };
  const openSetting = () => {
    chrome.runtime.openOptionsPage();
  };
  function showCopySuccess() {
    var el = document.getElementById('copy-success');
    el!!.style.display = 'block';
    setTimeout(function() {
      el!!.style.display = 'none';
    }, 2000);
  }

  

  function generateRandomPassword(length: number): string {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const characters = lowerCaseLetters + upperCaseLetters + numbers;
    let result = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      result += characters.charAt(index);
    }
    return result;
  }



  return (
    <>
      <ul className="password-list">

        <li>
          <span className="current-password-label">Current password:</span>{' '}
          <span className="current-password">{currentPassword}</span>
        </li>
      </ul>
      <button
        onClick={() => {
          const success = copyToClipboard(currentPassword || '');
          if (success) {

            // chrome.runtime.sendMessage({ action: 'showNotification', arg1: "Notification", arg2: "Copy success!"  });
            // chrome.runtime.sendMessage({ action: 'consoleLog', arg1: `time= ${new Date().toLocaleTimeString()}`  });

            showCopySuccess();
          } else {
            alert('Failed to copy password to clipboard!');
          }
        }}
        className="copy-password-button"
      >
        Copy Password
      </button>
      <button onClick={refreshPwd} className="refresh-button">
        Refresh
      </button>
      <button onClick={openSetting} className="refresh-button">
        Setting
      </button>


      <div id="copy-success">复制成功！</div>
    </>




  );


};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
