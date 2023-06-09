<div align="center">
    <img width="200" height="200" src="https://media.discordapp.net/attachments/1099435229334224948/1099435278298525727/logo.png?width=655&height=655" />
    <h3 align="center">JS-ADB</h3>
    <h4 align="center">Developed by Matth33w</h4>
</div>
<p>JS-ADB is a JavaScript library that allows you to execute Android Debug Bridge (ADB) commands directly from your JavaScript code. With this tool, you can automate tasks on Android devices by sending ADB commands programmatically.</p>
<p>It provides a simple and easy-to-use interface for executing ADB commands from your JavaScript code. You can use the library to perform tasks such as capturing screenshots, tapping on screen, typing, dumping the current window XML, and more.</p>
<p>JS-ADB is designed for developers who work with Android devices and want to automate tasks using JavaScript. It can be used in a variety of scenarios, including testing, development, and automation.</p>
<h1>How does it work?</h1>

```js
// import it
const JSADB = require("js-adb");

// start an instance
const instance = new JSADB();

// optionally you can specify a device name in case of multitasking..
// it is equivalent to the -s parameter on the ADB command line.
const deviceName = "emulator-5545";

// functions works asynchronously, so make sure to add "await" 
async function test() {
    await instance.screenshot("picture.png", deviceName);
    await instance.dumpWindowXML(deviceName);
    console.log(await instance.listOfInstalledApps());

    // don't know which devices are available? no need to worry no more..
    console.log(await instance.getDeviceList());
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
        <code>swipe(xPoint1, yPoint1, xPoint2, yPoint2, durationInMs, device)</code>
        <ul>
            <li><b>xPoint1</b> - Initial X position of the swipe</li>
            <li><b>yPoint1</b> - Initial Y position of the swipe</li>
            <li><b>xPoint2</b> - Final X position of the swipe</li>
            <li><b>yPoint2</b> - Final Y position of the swipe</li>
            <li><b>durationInMs</b> - Swipe duration in milliseconds</li>
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
        <code>dumpWindowXML(device)</code>
        <ul>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>A <code>window_dump.xml</code> file will be available at the root folder if succeeded.</i></p>
    </li>
    <hr/>
    <li>
        <code>existsInDump(query, prop)</code>
        <ul>
            <li><b>query</b> - The value you want to search</li>
            <li><b>prop (optional)</b> - Check the property of the node you want to read the value. By default it is "text".</li>
        </ul>
        <p>Returns: <i>A boolean that represents if the value was found or not.</i></p>
    </li>
    <hr/>
    <li>
        <code>screenshot(filename, device)</code>
        <ul>
            <li><b>filename (optional)</b> - The name to save the file</li>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>The file will be available at the root folder if succeeded.</i></p>
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
        <code>waitInMilliseconds(time)</code>
        <ul>
            <li><b>time</b> - The time to wait before executing the next instruction in milliseconds</li>
        </ul>
        <p>Returns: <i>nothing.</i></p>
    </li>
    <hr/>
    <li>
        <code>installApp(appPath, device)</code>
        <ul>
            <li><b>appPath</b> - Path of your APK file</li>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>nothing.</i></p>
    </li>
    <hr/>
    <li>
        <code>openApp(appPackageName, device)</code>
        <ul>
            <li><b>appPackageName</b> - Package name of the app you want to open</li>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>nothing.</i></p>
    </li>
    <hr/>
    <li>
        <code>goToHome(device)</code>
        <ul>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>nothing.</i></p>
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
    <li>
        <code>appExists(appPackageName, device)</code>
        <ul>
            <li><b>appPackageName</b> - Package name of the app you want to check</li>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>A boolean representing if the app exists on the device or not.</i></p>
    </li>
    <hr/>
    <li>
        <code>connectDevice(device)</code>
        <ul>
            <li><b>device</b> - Device URL in localhost to connect.</li>
        </ul>
        <p>Returns: <i>A boolean representing if the device was connected or not.</i></p>
    </li>
    <hr/>
    <li>
        <code>getBatteryDetails(device)</code>
        <ul>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>An object with the battery details.</i></p>
    </li>
    <hr/>
    <li>
        <code>serviceCheck(service, device)</code>
        <ul>
            <li><b>service</b> - The service you want to check</li>
            <li><b>device (optional)</b> - Set a specific device name in case of having multiple instances</li>
        </ul>
        <p>Returns: <i>A boolean representing if the service was found or not.</i></p>
    </li>
    <hr/>
</ul>