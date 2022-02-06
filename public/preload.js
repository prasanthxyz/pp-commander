const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
    'featureUtils', require('./featureUtils')
);
