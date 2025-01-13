const smallvideo = document.getElementById("insetVideo");
let offsetX, offsetY;

const move = (e) => {
    smallvideo.style.left = `${e.clientX - offsetX}px`;
    smallvideo.style.top = `${e.clientY - offsetY}px`;
};

smallvideo.addEventListener("mousedown", (e) => {
    offsetX = e.clientX - smallvideo.offsetLeft;
    offsetY = e.clientY - smallvideo.offsetTop;
    document.addEventListener("mousemove", move);
});

document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", move);
});



document.addEventListener("DOMContentLoaded", () => {
    const largeVideo = document.querySelector(".video");
    const smallVideo = document.querySelector(".insetVideo");

    if (largeVideo && smallVideo) {
        smallVideo.addEventListener("click", () => {
            console.log("Small video clicked");

            // Retrieve computed background styles
            const largeVideoBackground = window.getComputedStyle(largeVideo).background;
            const smallVideoBackground = window.getComputedStyle(smallVideo).background;

            console.log("Before swap:", {
                largeVideoBackground,
                smallVideoBackground
            });

            // Swap the backgrounds
            largeVideo.style.background = smallVideoBackground;
            smallVideo.style.background = largeVideoBackground;

            console.log("After swap:", {
                largeVideoBackground: largeVideo.style.background,
                smallVideoBackground: smallVideo.style.background
            });

            // Retrieve and swap background-size styles
            const largeVideoBgSize = window.getComputedStyle(largeVideo).backgroundSize;
            const smallVideoBgSize = window.getComputedStyle(smallVideo).backgroundSize;

            largeVideo.style.backgroundSize = smallVideoBgSize;
            smallVideo.style.backgroundSize = largeVideoBgSize;
        });
    } else {
        console.error("Large or small video element not found!");
    }
});


//for message box display
var toggleChatButton;
function domContent(){
    toggleChatButton = ((window.getComputedStyle(document.querySelector('.message')).display!='none')?document.querySelector('.message'):document.querySelector('.chat'));
    console.log(toggleChatButton)
    const chatSection = document.querySelector('.chatSection');
    const sendButton = document.querySelector('.sendButton');
    const messageInput = document.querySelector('.chatInputWrapper input');
    const chatMessages = document.querySelector('.chatMessages');
    const typingIndicator = document.querySelector('.typingIndicator');
    const tabMessages = document.querySelector('.tab.active');
    // const tabParticipants = document.querySelectorAll('.tab')[1];
    const videoSection = document.querySelector('.videoSection');
    const closeMsg = document.querySelector('.closeMsg');


    // Function to add a new message to the chat window
    function addMessage(sender, text, time, alignment = 'left') {
        const messageRow = document.createElement('div');
        messageRow.classList.add('messageRow', alignment);

        if (alignment === 'left') {
            const profilePic = document.createElement('img');
            profilePic.src = 'video-img/img4.jpg';
            profilePic.alt = sender;
            profilePic.classList.add('profilePic');
            messageRow.appendChild(profilePic);
        }

        const messageContent = document.createElement('div');
        messageContent.classList.add('messageContent');

        const messageHeader = document.createElement('div');
        messageHeader.classList.add('messageHeader');
        messageHeader.innerHTML = `
            <span class="senderName">${sender}</span>
            <span class="messageTime">${time}</span>
        `;
        messageContent.appendChild(messageHeader);

        const messageText = document.createElement('div');
        messageText.classList.add('messageText');
        messageText.textContent = text;
        messageContent.appendChild(messageText);

        messageRow.appendChild(messageContent);
        chatMessages.appendChild(messageRow);
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

    // Function to handle sending a new message
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            addMessage('You', messageText, time, 'right');
            messageInput.value = '';
        }
    }

    // Event listener for the send button
    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    // Event listener for pressing "Enter" to send the message
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });


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

    // Example: Add some initial messages
    setTimeout(() => {
        addMessage('Casey', "Hello Guys! What's your opinion?", '2:12 pm', 'left');
        addMessage('John', 'Images are better.', '2:13 pm', 'left');
        addMessage('You', 'Yes, it will decrease the loading.', '2:14 pm', 'right');
        addMessage('Jack', 'Anyone is up for illustrations. I think there are less relatable images according to our brand.', '2:15 pm', 'left');
    }, 500);

}

const mediaQuery = window.matchMedia("(max-width: 961px)"); // Media query for phones
mediaQuery.addEventListener("change", domContent);

document.addEventListener("DOMContentLoaded", () => {
    // Selecting relevant DOM elements
    domContent();
})
