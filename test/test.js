'use strict';
let broadlink = require('../../broadlinkjs');
let fs = require('fs');

var b = new broadlink();

b.on("deviceReady", (dev) => {
    if (dev.type == "RMPro") {
        var timer = setInterval(function(){
            console.log("send check!", dev.host.address, dev.type);
            dev.checkData();
        }, 1000);

        dev.on("temperature", (temp)=>{
            console.log("RMPRO: get temp " + temp, dev.host.address, dev.type);
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
    } if (dev.type == "RM3" || dev.type == "RMMini") {
        var timer = setInterval(function(){
            console.log("RM: send check!", dev.host.address, dev.type);
            dev.checkData();
        }, 1000);

        dev.on("temperature", (temp)=>{
            console.log("get temp " + temp, dev.host.address, dev.type);
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
            console.log(status, dev.host.address, dev.type);
        });
        dev.check_power();
    }
});

b.discover();
