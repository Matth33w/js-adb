<div align="center">
    <img width="200" height="200" src="./logo.png" />
    <h3 align="center">JS-ADB</h3>
    <h4 align="center">Developed by Matth33w</h4>
</div>
<p>JS-ADB is a JavaScript library that allows you to execute Android Debug Bridge (ADB) commands directly from your JavaScript code. With this tool, you can automate tasks on Android devices by sending ADB commands programmatically.</p>
<p>It provides a simple and easy-to-use interface for executing ADB commands from your JavaScript code. You can use the library to perform tasks such as capturing screenshots, tapping on screen, typing, dumping the current window XML, and more.</p>
<p>JS-ADB is designed for developers who work with Android devices and want to automate tasks using JavaScript. It can be used in a variety of scenarios, including testing, development, and automation.</p>
<h1>How does it work?</h1>
<p>This is not a NPM module! At least, not yet. So you gotta import it manually to your project.</p>
<p>Why? Because for now this tool is for my personal use only since it still is in a very experimental state.</p>
<p>But don't worry.. It's very easy to use. Just make sure you have at least one android emulator running on the background, so you can start sending your commands.</p>

```js
// import it from a local folder
const JSADB = require("./js-adb");

// start an instance
const instance = new JSADB();

// optionally you can specify a device name in case of multitasking..
// it is equivalent to the -s parameter on the ADB command line.
const deviceName = "emulator-5545";

// don't know which devices are available? no need to worry no more..
console.log(instance.getDeviceList());

// functions works asynchronously, so make sure to add "await" 
async function test() {
    await instance.screenshot("picture.png", deviceName);
    await instance.dumpWindowXML(deviceName);
    console.log(await instance.listOfInstalledApps());
}

test();
```
<h1>Available Commands</h1>
<ul>
    <li>
        <code>tap(x, y, device)</code>
        <ul>
            <li><b>x</b> - X position of the tap</li>
            <li><b>y</b> - Y position of the tap</li>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>nothing.</i></p>
    </li>
    <hr/>
    <li>
        <code>type(text, device)</code>
        <ul>
            <li><b>text</b> - The text value to type</li>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>nothing.</i></p>
    </li>
    <hr/>
    <li>
        <code>clearAppCache(appPackageName, device)</code>
        <ul>
            <li><b>appPackageName</b> - The package name of the app you want to clear the cache</li>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>nothing.</i></p>
    </li>
    <hr/>
    <li>
        <code>screenshot(filename, device)</code>
        <ul>
            <li><b>filename (optional)</b> - The name to save the file</li>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>The file will be available at the js-adb root folder if succeeded.</i></p>
    </li>
    <hr/>
    <li>
        <code>getResolution(device)</code>
        <ul>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>An object with the <code>width</code> and <code>height</code> properties inside of it.</i></p>
    </li>
    <hr/>
    <li>
        <code>getDeviceList()</code>
        <p>Returns: <i>A string array with the device names.</i></p>
    </li>
    <hr/>
    <li>
        <code>listOfInstalledApps(device)</code>
        <ul>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>A string array with the names of the installed apps.</i></p>
    </li>
    <hr/>
</ul>