# Automated Infinite Craft

This script is a customizable away to automatically discover stuff in the game [Infinite Craft](https://neal.fun/infinite-craft/) from [Neil.fun](https://neal.fun).

**How to use it?**

- You can use this in the normal version of the website;
- You can type anything in the search bar and the script will only try combinations between the visible elements after filtering;
- You can enable discoveries and only run the script upon first discoveries;
- Be creative :)

## How to Execute

The script is really easy to execute, all you need to do is open the console from your browser (F12 or FN+F12 or SHIFT+CTRL+J etc...) and paste the script.

**In some cases you'll receive an error saying you can't paste scripts in the console, to supress that just type 'allow pasting' without the ''**

Also, there are two versions of this script:

- **desktop.js**: can be used in standard view of the browser;
- **mobile.js**: can be used in mobile devices and/or reponsive view.

**If you want to know how a new item was crafted you can look into the console, every combination is logged in there.**

## Settings

Feel free to change the settings inside the `CONFIG` object inside the scripts.

**What can be changed?**

- `nIterations`: specifies the amout of combinations the algorithm will try to execute;
- `delayInMS`: specifies the delay between each try. Please keep in mind that since the script make requests to Infinite Craft API, a small amount in here will result in temporary block 429. I recommend setting this up to something around ~300ms.
