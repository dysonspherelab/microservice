import { injectable, inject } from 'inversify'
import TYPES from '../types/types'


var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc")

import path = require('path')
import fs = require('fs');
import stream = require("stream");

import base64Img = require('base64-img');

export interface ToJsonService {
   
    getJsondata(file)
 }

@injectable()
export class ToJsonServiceImpl implements ToJsonService {

 public async getJsondata(file) {
    var exceltojson;
    return new Promise((resolve, reject) => {
        if (file.name.split('.')[file.name.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        var fileContent = file.data.toString('base64')
        var filepath = "tmp/uploads/" + file.name;
        var fileBuffer = new Buffer(fileContent, 'base64')
        fs.writeFile(filepath, fileBuffer, (err) => {
            try {
                exceltojson({
                    input: filepath,
                    output: null,
                    lowerCaseHeaders: true
                }, function (err, result) {
                    if (err) {
                        return reject(err)

                    }
                    else {
                        return resolve(result)
                    }

                });
            } catch (e) {
                return resolve({ msg: "Currupted File" })
            }
        })
    })

}
}
