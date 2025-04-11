# 🕒 Timesheets Fill Helper – Tampermonkey Script
A small utility that makes your Jira timesheet life easier by allowing quick time entry with a friendly floating widget. This is powered by Tampermonkey, a popular userscript manager.

# ✅ Features
Draggable UI

Support for multiples dates to entry

# 🚀 Getting Started
## Step 1: Install Tampermonkey Extension
Depending on your browser, install 🐒[Tampermonkey](https://www.tampermonkey.net/) extension from the official website:

Click Add to Browser and complete the install.

## Step 2: Open Tampermonkey Dashboard
Click the Tampermonkey icon in your browser toolbar.

Select Dashboard.

### Note:
Some extensions now require developer mode enabled and to achieve this is need to navigate on:

Browser extensions > Manage extensions > Click on details button for Tampermonkey > Top rigth side there is a button to activate developer mode and you are set ✅.

## Step 3: Add a New Script
In the dashboard, click the ➕ Create a new script... button.

Remove the default code.

Paste in the contents of timesheets-helper.user.js (the script in this repo).

Press File > 💾 Save (or hit Ctrl+S / Cmd+S).

## Step 4: Use the Script
Visit your Jira Time Log page.

You should see a draggable floating box.

Fill in:

🗓️ Year (auto-filled)

🗓️ Month (auto-filled)

🗓️ Day(s) – supports multiple days like 5 6 7

🕛 Time Spent – example: 2h

🃏 Card – example: time-38 tdrt-xxx

# 🛠️ Configuration
Need to get the endpoint url to the application works.

## 🔍 How to Get the Endpoint URL from Jira Timela
To extract the endpoint URL used by Jira Timela, follow these steps:

1. Open Timela in your browser and wait for the page to fully load.

2. Open your browser’s Developer Tools (usually F12 or right-click → Inspect).

3. Go to the Network tab.

4. Clear all existing network requests (click the clear button 🔄 or ctrl + L in chrome browser).

5. In Timela, create a new appointment (this is just to trigger the API call).

6. In the Network tab, look for a request where the payload contains the keys on payload: started & timespent

7. Click on that request and go to the Headers section.

8. Copy the value of the Request URL – that’s the endpoint you’ll need.

9. Now that you've got the URL go back on code and replace `<full-atlasian-link-with-token>` with the url from the step above.

📝 Tip: You can also check the Request Payload to verify the correct request.

![Preview](assets/get%20url.gif)

# ✨ Bonus Tips
All inputs become fully opaque when focused (opacity: 1) and fade to 0.7 when unfocused.

Hover over inputs to see smooth opacity transitions.

The floating box can be dragged anywhere on screen and remembers its position during a session.

##  📽️ Preview

![Preview](assets/preview.gif)

# 💡 Contributing
Feel free to fork the repo and improve it! PRs are welcome.

# 📜 License
MIT License