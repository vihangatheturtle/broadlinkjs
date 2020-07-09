'use strict';
let broadlink = require('../../broadlinkjs');
let fs = require('fs');

var b = new broadlink();

b.on("deviceReady", (dev) => {
    console.log("Detected:", dev.host.address, dev.type);

    if (dev.type == "RMPro" || dev.type == "RM3" || dev.type == "RMMini") {
        var timer = setInterval(function(){
            console.log(dev.type, "Send check!", dev.host.address);
            dev.checkData();
        }, 1000);

        dev.on("temperature", (temp)=>{
            console.log(dev.type, "get temp " + temp, dev.host.address);
            dev.enterLearning();
        });

        dev.on("rawData", (data) => {
            fs.writeFile("test1", data, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
                clearInterval(timer);
            });
        });
        dev.checkTemperature();
    } else if(dev.type == "MP1") {
        dev.on("mp_power", (status)=> {
            console.log(dev.type, status, dev.host.address);
        });
        dev.check_power();
    }
});

b.discover();
