function generateContent() {
    const contentType = document.getElementById('content-type').value;
    const keyword = document.getElementById('keyword').value;

    fetch(`/generate?contentType=${contentType}&keyword=${keyword}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('output').innerText = data.content;
        })
        .catch(error => console.error('Error:', error));
}
