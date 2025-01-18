//For movement of remoteVideo
const smallVideo = document.getElementById("insetVideo");
const videoSection = document.querySelector(".videoSection");

let offsetX, offsetY;

const move = (e) => {
    const videoRect = smallVideo.getBoundingClientRect();
    const containerRect = videoSection.getBoundingClientRect();

    // Calculate the new position relative to the videoSection
    let newLeft = e.clientX - offsetX - containerRect.left;
    let newTop = e.clientY - offsetY - containerRect.top;

    // Constrain the video within the videoSection boundaries
    newLeft = Math.max(0, Math.min(containerRect.width - videoRect.width, newLeft));
    newTop = Math.max(0, Math.min(containerRect.height - videoRect.height, newTop));

    // Apply the constrained position
    smallVideo.style.left = `${newLeft}px`;
    smallVideo.style.top = `${newTop}px`;
};

smallVideo.addEventListener("mousedown", (e) => {
    const containerRect = videoSection.getBoundingClientRect();

    offsetX = e.clientX - smallVideo.getBoundingClientRect().left + containerRect.left;
    offsetY = e.clientY - smallVideo.getBoundingClientRect().top + containerRect.top;

    document.addEventListener("mousemove", move);
});

document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", move);
});






//Video Toggle
document.addEventListener("DOMContentLoaded", () => {
    const largeVideo = document.querySelector(".localVideo"); // Main large video
    const smallVideo = document.querySelector(".remoteVideo"); // Inset small video
    const expandIcon = document.querySelector(".expand-icon"); // Icon to expand

    // Helper function to check if the video source is a valid video file type
    const isValidVideoSource = (src) => {
        const videoExtensions = ['.mp4', '.webm', '.ogg'];
        return videoExtensions.some(ext => src.toLowerCase().endsWith(ext));
    };

    const playVideoSafely = (videoElement) => {
        if (isValidVideoSource(videoElement.src)) {
            videoElement.play().catch((error) => {
                console.error("Error trying to play video:", error);
            });
        } else {
            console.log("Invalid video source, not playing:", videoElement.src);
        }
    };

    if (largeVideo && smallVideo) {
        smallVideo.addEventListener("click", () => {
            console.log("Small video clicked");

            // Swap the video sources
            const largeVideoSrc = largeVideo.src;
            const smallVideoSrc = smallVideo.src;

            largeVideo.src = smallVideoSrc;
            smallVideo.src = largeVideoSrc;

            // Attempt to play only if the video source is valid
            playVideoSafely(largeVideo);
            playVideoSafely(smallVideo);

            console.log("Video sources swapped:", {
                largeVideoSrc: largeVideo.src,
                smallVideoSrc: smallVideo.src
            });
        });

        expandIcon.addEventListener("click", () => {
            console.log("Expand icon clicked");

            // Swap the video sources
            const largeVideoSrc = largeVideo.src;
            const smallVideoSrc = smallVideo.src;

            largeVideo.src = smallVideoSrc;
            smallVideo.src = largeVideoSrc;

            // Attempt to play only if the video source is valid
            playVideoSafely(largeVideo);
            playVideoSafely(smallVideo);

            console.log("Video sources swapped:", {
                largeVideoSrc: largeVideo.src,
                smallVideoSrc: smallVideo.src
            });
        });
    } else {
        console.error("Large or small video element not found!");
    }
});



const videoElementremote = document.querySelector('.remoteVideo');
if (!videoElementremote.src || videoElement.src === '') {
    console.warn('No video source provided.');
    videoElementremote.style.backgroundColor = 'black'; // Optional: fallback background color
    videoElementremote.style.backgroundImage = 'url(./images/no-src.png)'; // Set background image
    videoElementremote.style.backgroundSize = 'cover'; // Make the image cover the entire element
    videoElementremote.style.backgroundPosition = 'center'; // Center the background image
    videoElementremote.style.position = 'relative'; // Ensure proper layout
}

const videoElementlocal = document.querySelector('.localVideo');
if (!videoElementlocal.src || videoElementlocal.src === '') {
    console.warn('No video source provided.');
    videoElementlocal.style.backgroundColor = 'black'; // Optional: fallback background color
    videoElementlocal.style.backgroundImage = 'url(./images/no-src.png)'; // Set background image
    videoElementlocal.style.backgroundSize = 'cover'; // Make the image cover the entire element
    videoElementlocal.style.backgroundPosition = 'center'; // Center the background image
    videoElementlocal.style.position = 'relative'; // Ensure proper layout
}





//for message box display
var toggleChatButton;
function domContent() {
    toggleChatButton = ((window.getComputedStyle(document.querySelector('.message')).display != 'none') ? document.querySelector('.message') : document.querySelector('.chat'));

    // Select necessary DOM elements
    const chatSection = document.querySelector('.chatSection');
    const sendButton = document.getElementById('sendChat');
    const messageInput = document.querySelector('.chatInputWrapper input');
    const typingIndicator = document.querySelector('.typingIndicator');
    const videoSection = document.querySelector('.videoSection');
    const closeMsg = document.querySelector('.closeMsg');
    const fileInput = document.getElementById('fileInput');


    function addMessage(sender, text, time, alignment = 'left', isFile = false) {
        const chatMessages = document.querySelector('.chatMessages');

        // Create the message row and add the alignment class
        const messageRow = document.createElement('div');
        messageRow.classList.add('messageRow', alignment);

        // Chat headers (for profile pic and sender name)
        const chatHeaders = document.createElement('div');
        chatHeaders.classList.add('chat-headers');

        // Profile picture for left-aligned messages
        if (alignment === 'left') {
            const profilePic = document.createElement('img');
            profilePic.src = 'video-img/img4.jpg';
            profilePic.alt = sender;
            profilePic.classList.add('profilePic');
            chatHeaders.appendChild(profilePic);
        }

        // Sender name
        const senderName = document.createElement('span');
        senderName.classList.add('senderName');
        senderName.textContent = sender;
        chatHeaders.appendChild(senderName);

        // Append headers to the message row
        messageRow.appendChild(chatHeaders);

        // Create the message content
        const msgTime = document.createElement('div');
        msgTime.classList.add('msg-time');

        const messageContent = document.createElement('div');
        messageContent.classList.add('messageContent');

        if (isFile) {
            // If the message is a file
            text.forEach(file => {
                const fileWrapper = document.createElement('div');
                fileWrapper.className = 'file-preview-item';
                fileWrapper.style.display = '-webkit-flex'; // Add for older Safari versions
                fileWrapper.style.display = 'flex';
                fileWrapper.style.flexDirection = 'column';
                fileWrapper.style.justifyContent = 'space-evenly';
                fileWrapper.style.alignItems = 'center';
                fileWrapper.style.flexWrap = 'wrap';
                fileWrapper.style.margin = '10px';
                fileWrapper.dataset.filename = file.name;  // Store filename for reference
                fileWrapper.dataset.file = file.url;      // Store the actual file URL for access

                // Create file icon
                const fileType = file.name.split('.').pop().toLowerCase();
                const iconMap = {
                    doc: './images/doc.png',
                    docx: './images/doc.png',
                    csv: './images/csv-file.png',
                    xls: './images/xls.png',
                    xlsx: './images/xls.png',
                    ppt: './images/ppt.png',
                    pptx: './images/ppt.png',
                    txt: './images/txt.png',
                    json: './images/json-file.png',
                    zip: './images/zip.png',
                    pdf: './images/pdf.png',
                    mp4: './images/mp4.png',
                    mp3: './images/mp3.png',
                    png: './images/png.png',
                    jpg: './images/jpg.png',
                    jpeg: './images/jpeg.png',
                    default: './images/file.png'
                };

                const fileIcon = document.createElement('img');
                fileIcon.src = iconMap[fileType] || './images/file.png';
                fileIcon.alt = file.name;
                fileIcon.style.cursor = 'pointer';
                fileIcon.style.width = '60px';
                fileIcon.style.height = '60px';

                // File name
                const fileName = document.createElement('span');
                fileName.textContent = file.name;
                fileName.className = 'file-name';
                fileName.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
                fileName.style.fontSize = '12px';
                fileName.style.marginTop = '5px';
                fileName.style.color = 'white';
                fileName.style.webkitFontSmoothing = 'antialiased'; // Smooth fonts for Safari

                // Click event to open the file or image
                fileIcon.addEventListener('click', () => {
                    window.open(file.url, '_blank'); // Open the file in a new tab
                });

                fileName.addEventListener('click', () => {
                    window.open(file.url, '_blank'); // Open the file in a new tab
                });

                fileWrapper.appendChild(fileIcon);
                fileWrapper.appendChild(fileName);
                messageContent.appendChild(fileWrapper);
            });
        } else {
            // If the message is text
            const messageText = document.createElement('div');
            messageText.classList.add('messageText');
            messageText.textContent = text;
            messageContent.appendChild(messageText);
        }

        // Add message time
        const messageTime = document.createElement('span');
        messageTime.classList.add('messageTime');
        messageTime.textContent = time;

        msgTime.appendChild(messageContent);
        msgTime.appendChild(messageTime);

        // Append to message row
        messageRow.appendChild(msgTime);

        // Append to chatMessages
        chatMessages.appendChild(messageRow);

        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }



    // Function to simulate "typing" indicator
    function showTypingIndicator(sender) {
        typingIndicator.textContent = `${sender} is typing...`;
        typingIndicator.style.display = 'block';

        setTimeout(() => {
            typingIndicator.style.display = 'none';
        }, 2000);
    }

    function sendMessage() {
        const messageText = messageInput.value.trim();
        const preview = document.getElementById('filePreview');
        const files = Array.from(preview.querySelectorAll('.file-preview-item')); // Get the files from the preview container

        if (files.length > 0) {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Create an array of file objects
            const fileList = files.map(filePreview => {
                const fileName = filePreview.dataset.filename;
                const img = filePreview.querySelector('img'); // Assuming the image is in an <img> tag for preview
                const file = filePreview.dataset.file; // Get the actual file object from the preview

                if (img) {
                    // If it's an image, return its src (URL)
                    return {
                        name: fileName,
                        url: img.src,  // This is the img URL for images
                        type: 'image'
                    };
                } else {
                    // If it's not an image, create a Blob URL for the file
                    const fileUrl = URL.createObjectURL(file);
                    return {
                        name: fileName,
                        url: fileUrl,  // Use Blob URL for non-image files
                        type: 'file'
                    };
                }
            });

            // Send the message (file data)
            addMessage('', fileList, time, 'right', true);
            preview.innerHTML = '';  // Clear preview after sending
        }

        if (messageText) {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            addMessage('', messageText, time, 'right');
            messageInput.value = ''; // Clear input field
        }
    }



    // Event listener for the send button
    sendButton.addEventListener('click', () => {
        sendMessage();
        clearFilePreview(); // Clear the file preview container
    });

    // Event listener for pressing "Enter" to send the message
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
            clearFilePreview(); // Clear the file preview container
        }
    });

    // Function to clear the file preview container
    function clearFilePreview() {
        const previewContainer = document.getElementById('filePreviewContainer');
        previewContainer.style.display = 'none'; // Hide the preview container

    }



    // Toggle Chat Section
    toggleChatButton.addEventListener('click', () => {
        chatSection.classList.toggle('expanded')
        videoSection.classList.toggle('compressed');
    });
    closeMsg.addEventListener('click', () => {
        chatSection.classList.toggle('expanded')
        videoSection.classList.toggle('compressed');
    });


    // Simulate typing
    setTimeout(() => {
        showTypingIndicator('John');
    }, 1000);

}

const mediaQuery = window.matchMedia("(max-width: 768px) and (min-height: 600px)"); // Media query for phones
mediaQuery.addEventListener("change", domContent);

document.addEventListener("DOMContentLoaded", () => {
    // Selecting relevant DOM elements
    domContent();
})



const video = document.querySelector('.icon-visible-video');
const speaker = document.querySelector('.icon-visible-volume');
const mic = document.querySelector('.icon-visible-mic');
const noVideo = document.querySelector('.video');
const noAudio = document.querySelector('.mute');
const noMic = document.querySelector('.mic-off');


video.addEventListener("click", () => {
    video.classList.toggle('icon-hidden');
    noVideo.classList.toggle('icon-hidden');

})
noVideo.addEventListener("click", () => {
    video.classList.toggle('icon-hidden');
    noVideo.classList.toggle('icon-hidden');

})
speaker.addEventListener("click", () => {
    noAudio.classList.toggle('icon-hidden');
    speaker.classList.toggle('icon-hidden');

})
noAudio.addEventListener("click", () => {
    noAudio.classList.toggle('icon-hidden');
    speaker.classList.toggle('icon-hidden');

})
mic.addEventListener("click", () => {
    mic.classList.toggle('icon-hidden');
    noMic.classList.toggle('icon-hidden');

})
noMic.addEventListener("click", () => {
    mic.classList.toggle('icon-hidden');
    noMic.classList.toggle('icon-hidden');

})

document.getElementById('fileInput').addEventListener('change', function (event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('filePreviewContainer');
    const preview = document.getElementById('filePreview');
    // Show the file preview container if files are selected
    if (files.length > 0) {
        previewContainer.style.display = 'block';
    }
    // Loop through files and append previews without clearing previous ones
    Array.from(files).forEach((file) => {
        const existingFilePreview = Array.from(preview.children).find(item => item.dataset.filename === file.name);

        // Check if the file already exists in the preview container
        if (!existingFilePreview) {  // If file doesn't exist, append it
            const filePreview = document.createElement('div');
            filePreview.className = 'file-preview-item';
            filePreview.dataset.filename = file.name; // Add a data attribute to track the filename

            // Check if the file is an image
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.alt = file.name;
                img.addEventListener('click', () => window.open(img.src, '_blank')); // Open image in new tab
                filePreview.appendChild(img);
            } else {
                // Handle non-image files
                const fileType = file.name.split('.').pop().toLowerCase();
                // Create a wrapper div for the file icon and name
                const fileWrapper = document.createElement('div');
                fileWrapper.style.display = '-webkit-flex'; // For older Safari versions
                fileWrapper.style.display = 'flex';
                fileWrapper.style.webkitFlexDirection = 'column'; // For older Safari versions
                fileWrapper.style.flexDirection = 'column';
                fileWrapper.style.webkitAlignItems = 'center'; // For older Safari versions
                fileWrapper.style.alignItems = 'center';
                fileWrapper.style.margin = '10px';
                fileWrapper.style.boxSizing = 'border-box'; // Ensure consistent box model
                filePreview.appendChild(fileWrapper);
                const iconMap = {
                    doc: './images/doc.png',
                    docx: './images/doc.png',
                    csv: './images/csv-file.png',
                    xls: './images/xls.png',
                    xlsx: './images/xls.png',
                    ppt: './images/ppt.png',
                    pptx: './images/ppt.png',
                    txt: './images/txt.png',
                    json: './images/json-file.png',
                    zip: './images/zip.png',
                    pdf: './images/pdf.png',
                    mp4: './images/mp4.png',
                    mp3: './images/mp3.png',
                    png: './images/png.png',
                    jpg: './images/jpg.png',
                    jpeg: './images/jpeg.png',
                    default: './images/file.png' // Common file icon fallback
                };
                const fileIcon = document.createElement('img');
                fileIcon.src = iconMap[fileType] || './images/file.png';
                fileIcon.alt = file.name;
                fileIcon.style.cursor = 'pointer';
                fileWrapper.appendChild(fileIcon);

                const fileName = document.createElement('span');
                fileName.textContent = file.name;
                fileName.className = 'file-name';
                fileIcon.addEventListener('click', () => {
                    const url = URL.createObjectURL(file);
                    window.open(url, '_blank');
                });
                fileName.addEventListener('click', () => {
                    const url = URL.createObjectURL(file);
                    window.open(url, '_blank');
                });
                fileWrapper.appendChild(fileName);
            }

            // Append the new file preview to the container
            preview.appendChild(filePreview);
        }
    });
});
//message selection
function toggleButtonStyle(button = document.querySelector('.message')) {
    button.classList.toggle("active");
}







