const fs = require('fs');
const { exec } = require('child_process')

const featureDir = 'features';

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
