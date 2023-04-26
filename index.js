/*
///////////////////////////////////////////////////////////////

     ██╗███████╗       █████╗ ██████╗ ██████╗ 
     ██║██╔════╝      ██╔══██╗██╔══██╗██╔══██╗
     ██║███████╗█████╗███████║██║  ██║██████╔╝
██   ██║╚════██║╚════╝██╔══██║██║  ██║██╔══██╗
╚█████╔╝███████║      ██║  ██║██████╔╝██████╔╝
 ╚════╝ ╚══════╝      ╚═╝  ╚═╝╚═════╝ ╚═════╝ 
                                            
A JavaScript android device bridge controller API!
Developed by Matheus Ibrahim (Matth33w) - 2023
///////////////////////////////////////////////////////////////
*/

const { exec } = require("child_process");
const fs = require("fs");
const readline = require("readline");
const { errorHandler } = require("./utils");

class JSADB {
    tap(x, y, device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell input tap ${x} ${y}`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    resolve();
                }
            });
        });
    }

    swipe(xPoint1, yPoint1, xPoint2, yPoint2, durationInMs, device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell input swipe ${xPoint1} ${yPoint1} ${xPoint2} ${yPoint2} ${durationInMs}`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    resolve();
                }
            });
        });
    }

    type(text, device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell input text "${text}"`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    resolve();
                }
            });
        });
    }

    screenshot(filename, device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell screencap -p /sdcard/${filename ? filename : "screenshot.png"} && adb.exe pull /sdcard/${filename ? filename : "screenshot.png"}`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    resolve();
                }
            });
        });
    }

    dumpWindowXML(device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell uiautomator dump`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                }
    
                exec(`adb.exe ${device ? `-s ${device}` : ""} pull /sdcard/window_dump.xml`, (error, stdout, stderr) => {
                    if(error) {
                        reject(errorHandler(error));
                    }

                    resolve();
                });
            });
        });
    }

    existsInDump(query, prop) {
        return new Promise(async (resolve, reject) => {
            if(!fs.existsSync(__dirname + "/window_dump.xml")) {
                reject(errorHandler({code: -1, message: "You need to dump the XML before making a query on it."}));
            } else {
                const rl = readline.createInterface(fs.createReadStream(__dirname + "/window_dump.xml"));
                let text = "";
                
                rl.on("line", textStream => {
                    text += textStream;
                });

                rl.on("close", () => {
                    resolve(text.indexOf(prop ? `${prop}="${query}"` : `text="${query}"`) > -1 ? true : false);
                });
            }
        });
    }

    getResolution(device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell wm size`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                }
    
                const resolutionArray = stdout.substring(15, stdout.length).replace("\n", "").replace("\r", "").split("x");
                const returnData = {
                    width: Number(resolutionArray[0]),
                    height: Number(resolutionArray[1])
                };
    
                resolve(returnData);
            });
        });
    }

    getDeviceList() {
        return new Promise((resolve, reject) => {
            exec("adb.exe devices", (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    const devicesArray = stdout.split("\n");
                    let returnData = [];

                    for(var i = 1; i < devicesArray.length; i++) {
                        const device = devicesArray[i].substring(0, devicesArray[i].indexOf("\t"));
                        if(device.trim() != "")
                            returnData.push(device);
                    }

                    resolve(returnData);
                }
            });
        }); 
    }

    listOfInstalledApps(device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell pm list packages`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    resolve(stdout.replace(/\r/g, "").replace(/package:/g, "").split("\n"));
                }
            });
        });
    }

    appExists(appPackageName, device) {
        return new Promise(async (resolve, reject) => {
            try {
                const installedApps = await this.listOfInstalledApps(device ? device : undefined);

                if(appPackageName.trim() == "") {
                    reject(errorHandler({code: -1, message: "The app package name is mandatory."}));
                }

                if(installedApps.indexOf(appPackageName) > -1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch(err) {
                reject(err);
            }
        });
    }

    clearAppCache(appPackageName, device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell pm clear ${appPackageName}`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    resolve();
                }
            });
        });
    }

    openApp(appPackageName, device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell monkey -p ${appPackageName} 1`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    resolve();
                }
            });
        });
    }

    installApp(appPath, device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} install ${appPath}`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    resolve();
                }
            });
        });
    }

    goToHome(device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell input keyevent KEYCODE_HOME`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    resolve();
                }
            });
        });
    }

    waitInMilliseconds(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    getBatteryDetails(device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell dumpsys battery`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    const textLines = stdout.replace(/\r/g, "").split("\n");
                    let finalObject = {};

                    for(var i = 1; i < textLines.length; i++) {
                        if(textLines[i].trim() != "") {
                            const currentTextLine = textLines[i].replace(/\s\s/g, "");
                            const propAndValueSeparator = currentTextLine.split(":");

                            let prop = propAndValueSeparator[0];
                            let value = propAndValueSeparator[1].substring(1, propAndValueSeparator[1].length);

                            switch(prop) {
                                case "AC powered": {
                                    prop = "acPowered";
                                    break;
                                }

                                case "USB powered": {
                                    prop = "usbPowered";
                                    break;
                                }

                                case "Wireless powered": {
                                    prop = "wirelessPowered";
                                    break;
                                }

                                case "Max charging current": {
                                    prop = "maxChargingCurrent";
                                    break;
                                }

                                case "Max charging voltage": {
                                    prop = "maxChargingVoltage";
                                    break;
                                }

                                case "Charge counter": {
                                    prop = "chargeCounter";
                                    break;
                                }
                            }

                            if(!isNaN(value)) {
                                value = Number(value);
                            }

                            if(value == "true" || value == "false") {
                                value = Boolean(value);
                            }

                            finalObject[prop] = value;
                        }
                    }
                    resolve(finalObject);
                }
            });
        });
    }

    serviceCheck(service, device) {
        return new Promise((resolve, reject) => {
            exec(`adb.exe ${device ? `-s ${device}` : ""} shell service check ${service}`, (error, stdout, stderr) => {
                if(error) {
                    reject(errorHandler(error));
                } else {
                    if(stdout.indexOf("not found") > -1) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            });
        });
    }
}

module.exports = JSADB;