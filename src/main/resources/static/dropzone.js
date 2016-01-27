/**
 * Created by wqiu on 27/01/16.
 */
const React = require('react');
const Dropzone = require('react-dropzone-component');
require('react-dropzone-component/styles/filepicker.css');
require('react-dropzone-component/node_modules/dropzone/dist/min/dropzone.min.css');


const cmdiDropzoneConfig = {
    iconFiletypes: ['.xml'],
    showFiletypeIcon: true,
    // Notice how there's no postUrl set here
    postUrl: '/upload'
};

const fileDropzoneConfig = {
    iconFiletypes: ['.xml', '.txt', '.zip', '.rar', '.gzip', '.pdf', '.doc'],
    showFiletypeIcon: true,
    // Notice how there's no postUrl set here
    postUrl: '/upload'
};

const cmdiDjsConfig = {
    addRemoveLinks: true,
    dictDefaultMessage: "Drop CMDI file here to upload!"
};

const fileDjsConfig = {
    addRemoveLinks: true,
};

var callbackArray = [
    function () {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function () {
        console.log('Wooooow!Test webpack');
    }
];

/**
 * Simple callbacks work too, of course.
 */
var simpleCallBack = function () {
    console.log('I\'m a simple callback');
};

var eventHandlers = {
    // All of these receive the event as first parameter:
    drop: callbackArray,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: simpleCallBack,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecompleted: null
};

const cmdiDropZone= (
    <Dropzone config={cmdiDropzoneConfig} eventHandlers={eventHandlers}
              djsConfig={cmdiDjsConfig}>
    </Dropzone>
);

const fileDropZone = (
    <Dropzone config={fileDropzoneConfig} eventHandlers={eventHandlers}
              djsConfig={fileDjsConfig}>
    </Dropzone>
);

module.exports = {
    cmdiDropZone,
    fileDropZone
};

