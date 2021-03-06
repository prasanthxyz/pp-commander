const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process')

const featureDir = path.join(os.homedir(), 'commander-features');

exports.writeFeature = (featureName, data) => {
    try {
        fs.writeFileSync(`${featureDir}/${featureName}.json`, JSON.stringify(data));
    } catch(err) {
        console.error(err);
    }
};

exports.getFeatures = () => {
    if (!fs.existsSync(featureDir)){
        fs.mkdirSync(featureDir);
    }

    featureFilenames = fs.readdirSync(featureDir);
    const features = [];
    for (const featureFilename of featureFilenames) {
        const featureName = featureFilename.replace(/\.[^/.]+$/, "");
        const featureData = fs.readFileSync(`${featureDir}/${featureFilename}`);
        features.push({
            name: featureName,
            commands: JSON.parse(featureData)
        });
    }

    return features;
}

exports.deleteFeature = (featureName) => {
    try {
        fs.unlinkSync(`${featureDir}/${featureName}.json`);
    } catch(err) {
        console.error(err);
    }
}

exports.renameFeature = (oldName, newName, data) => {
    this.deleteFeature(oldName);
    this.writeFeature(newName, data);
};

exports.runCommand = (command) => {
    exec(command, ()=>{});
}
