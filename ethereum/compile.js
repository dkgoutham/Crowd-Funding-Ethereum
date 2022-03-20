const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

var input = {
    language: "Solidity",
    sources: {
        "Campaign.sol": {
        content: source,
        },
    },

    settings: {
        outputSelection: {
        "*": {
            "*": [ "*" ],
        },
        },
    },
};

var output =  JSON.parse(solc.compile(JSON.stringify(input)));
  
// console.log(output.contracts);
const finalOutput = output.contracts['Campaign.sol'];
fs.ensureDirSync(buildPath);



for(let contract in output.contracts['Campaign.sol']){
    fs.outputJSONSync(
        path.resolve(buildPath, contract +'.json'),
        finalOutput[contract]
    );
}