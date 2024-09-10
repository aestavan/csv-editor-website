document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tvName = urlParams.get('tv').toLowerCase(); // Convert to lowercase
    const tvFileName = `1331-${tvName.replace(' ', '')}-TV.csv`; // Convert to file name format

    const currentWallpaper1 = document.getElementById('current-wallpaper-1');
    const currentWallpaper2 = document.getElementById('current-wallpaper-2');
    const previewWallpaper1 = document.getElementById('preview-wallpaper-1');
    const previewWallpaper2 = document.getElementById('preview-wallpaper-2');
    const uploadWallpaper1 = document.getElementById('upload-wallpaper-1');
    const uploadWallpaper2 = document.getElementById('upload-wallpaper-2');
    const applyButton = document.getElementById('apply-button');
    const previousWallpapersList = document.getElementById('previous-wallpapers-list');
    const tvNameElement = document.getElementById('tv-name');
    const tvFileNameElement = document.getElementById('tv-file-name');

    if (tvNameElement && tvFileNameElement) {
        tvNameElement.textContent = `TV Name: ${tvName}`;
        tvFileNameElement.textContent = `File Name: ${tvFileName}`;
    } else {
        console.error('TV Name or File Name element not found');
    }

    // Function to fetch images
    function fetchImages() {
        console.log('Fetching images for TV:', tvName);
        fetch(`http://10.176.217.139/atv/fetch_images.php?tv=${tvName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const currentWallpapersContainer = document.getElementById('current-wallpapers');
                currentWallpapersContainer.innerHTML = '';
                data.current.forEach(url => {
                    const img = document.createElement('img');
                    img.src = `${url}?${new Date().getTime()}`; // Cache-busting query string
                    currentWallpapersContainer.appendChild(img);
                });

                const previousWallpapersContainer = document.getElementById('previous-wallpapers');
                previousWallpapersContainer.innerHTML = '';
                data.previous.forEach(url => {
                    const img = document.createElement('img');
                    img.src = `${url}?${new Date().getTime()}`; // Cache-busting query string
                    previousWallpapersContainer.appendChild(img);
                });
            })
            .catch(error => console.error('Error fetching images:', error));
    }

    // Fetch current and previous wallpapers from the server
    if (tvName) {
        fetchImages();
    } else {
        console.error('TV name not found in URL parameters');
    }

    // Function to handle file uploads
    function handleFileUpload(input, preview) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Event listeners for file inputs
    uploadWallpaper1.addEventListener('change', () => handleFileUpload(uploadWallpaper1, previewWallpaper1));
    uploadWallpaper2.addEventListener('change', () => handleFileUpload(uploadWallpaper2, previewWallpaper2));

    // Function to apply changes
    applyButton.addEventListener('click', () => {
        const newWallpaper1 = uploadWallpaper1.files[0];
        const newWallpaper2 = uploadWallpaper2.files[0];

        if (newWallpaper1 && newWallpaper2) {
            const formData = new FormData();
            formData.append('tvName', tvName);
            formData.append('wallpaper1', newWallpaper1, `${tvName.replace(' ', '')}-wallpaper1.png`);
            formData.append('wallpaper2', newWallpaper2, `${tvName.replace(' ', '')}-wallpaper2.png`);

            // Send data to the server
            fetch('http://10.176.217.139/atv/upload.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Wallpapers uploaded successfully!');
                    // Refresh images after successful upload
                    fetchImages();
                } else {
                    alert('Failed to upload wallpapers.');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
});
