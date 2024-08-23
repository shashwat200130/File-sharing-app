const socket = io();

const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const statusDiv = document.getElementById('status');
const fileList = document.getElementById('fileList');

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        statusDiv.textContent = data;
        fileInput.value = '';
    })
    .catch(error => {
        console.error('Error uploading file:', error);
    });
});

socket.on('fileUploaded', (data) => {
    const listItem = document.createElement('li');
    const downloadLink = document.createElement('a');

    downloadLink.href = data.url;
    downloadLink.textContent = `Download ${data.filename}`;
    downloadLink.download = data.filename;

    listItem.appendChild(downloadLink);
    fileList.appendChild(listItem);
});
