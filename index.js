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
    // Select the chatMessages container
    const chatMessages = document.querySelector('.chatMessages');

    // Create the message row and add the alignment class
    const messageRow = document.createElement('div');
    messageRow.classList.add('messageRow', alignment);

    // Create the chat headers container (for profile pic and sender name)
    const chatHeaders = document.createElement('div');
    chatHeaders.classList.add('chat-headers');

    // Add the profile picture only for 'left' aligned messages
    if (alignment === 'left') {
        const profilePic = document.createElement('img');
        profilePic.src = 'video-img/img4.jpg'; // Default profile pic
        profilePic.alt = sender;
        profilePic.classList.add('profilePic');
        chatHeaders.appendChild(profilePic);
    }

    // Add the sender's name
    const senderName = document.createElement('span');
    senderName.classList.add('senderName');
    senderName.textContent = sender;
    chatHeaders.appendChild(senderName);

    messageRow.appendChild(chatHeaders);

    // Create the message time and text container
    const msgTime = document.createElement('div');
    msgTime.classList.add('msg-time');

    const messageContent = document.createElement('div');
    messageContent.classList.add('messageContent');

    // Add the message text
    const messageText = document.createElement('div');
    messageText.classList.add('messageText');
    messageText.textContent = text;
    messageContent.appendChild(messageText);

    // Add the message time
    const messageTime = document.createElement('span');
    messageTime.classList.add('messageTime');
    messageTime.textContent = time;

    msgTime.appendChild(messageContent);
    msgTime.appendChild(messageTime);

    // Add msg-time to the message row
    messageRow.appendChild(msgTime);

    // Append the new message row to the chat messages container
    chatMessages.appendChild(messageRow);

    // Scroll to the bottom of the chat window
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

            addMessage('', messageText, time, 'right');
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

}

const mediaQuery = window.matchMedia("(max-width: 961px)"); // Media query for phones
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


video.addEventListener("click",() => {
    video.classList.toggle('icon-hidden');
    noVideo.classList.toggle('icon-hidden');

})
noVideo.addEventListener("click",() => {
    video.classList.toggle('icon-hidden');
    noVideo.classList.toggle('icon-hidden');

})
speaker.addEventListener("click",() => {
    noAudio.classList.toggle('icon-hidden');
    speaker.classList.toggle('icon-hidden');

})
noAudio.addEventListener("click",() => {
    noAudio.classList.toggle('icon-hidden');
    speaker.classList.toggle('icon-hidden');

})
mic.addEventListener("click",() => {
    mic.classList.toggle('icon-hidden');
    noMic.classList.toggle('icon-hidden');

})
noMic.addEventListener("click",() => {
    mic.classList.toggle('icon-hidden');
    noMic.classList.toggle('icon-hidden');

})