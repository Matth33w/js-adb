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
                    resolve(stdout.split("\n"));
                }
            });
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
}

module.exports = JSADB;