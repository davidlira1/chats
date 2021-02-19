import sendMessageBtn from './sendMessageBtn.js';

var Chatbox = function (user, friend) {

    this.user = user;
    this.friend = friend;

    this.chatBox = document.createElement('div');
    this.chatBox.className = 'chatBox';
    //==============================================
    this.friendPic = document.createElement('div');
    this.friendPic.className = 'friendPic';
    this.chatBox.appendChild(this.friendPic);
    //==============================================
    this.messagesBox = document.createElement('div');
    this.messagesBox.className = 'messagesBox';
    this.chatBox.appendChild(this.messagesBox);
    //==============================================
    this.bottomSection = document.createElement('div');
    this.bottomSection.className = 'bottomSection';

    this.inputMessage = document.createElement('textarea');
    this.inputMessage.className = 'inputMessage';
    this.bottomSection.appendChild(this.inputMessage);

    this.sendMessageBtn();
    // this.bottomSection.appendChild(this.sendMessageBtn);

    this.chatBox.appendChild(this.bottomSection);

    // setInterval(() => {
    //     fetchMessages(user, friend)
    //     .then(messages => {
    //         this.displayMessages(messagesBox, messages);
    //     })
    // }, 2000);

    this.messages = ['hello', 'how are you', 'goodbye'];
    this.displayMessages();

}

Chatbox.prototype.displayMessages = function () {
    var messageBox;
    this.messages.forEach(message => {
        messageBox = this.createMessage(message);
        this.messagesBox.appendChild(messageBox);
    })
}

Chatbox.prototype.appendMessage = function (message) {
    var messageBox = this.createMessage(message);
    this.messagesBox.appendChild(messageBox);
    this.messagesBox.scrollTop = this.messagesBox.scrollHeight;
}


Chatbox.prototype.sendMessageBtn = function () {
    var button = document.createElement('div');
    button.className = 'sendMessage';

    //CLICK EVENT LISTENER
    button.addEventListener('click', (ev) => {

        //POST MESSAGE TO DB
        this.postMessage(this.inputMessage.value)
            .then(() => {
                this.appendMessage(this.inputMessage.value);
                this.inputMessage.value = "";
            })
            .catch(() => {
                console.error('could not connect to db');
            });
    })

    this.bottomSection.appendChild(button);
}

Chatbox.prototype.createMessage = function(messageStr) {
    var messageBox = document.createElement('div');
    messageBox.className = 'messageBox';

    var message = document.createElement('div');
    message.className = 'message';
    message.innerHTML = messageStr;

    messageBox.appendChild(message);

    return messageBox;
}

Chatbox.prototype.postMessage = function(message) {
    return axios(
        {
            method: 'post',
            url: 'http://127.0.0.1:3000/message',
            data: {
                sender: this.user,
                receiver: this.friend,
                message,
                time: new Date()
            }
        }
    )

}


var david = new Chatbox('david', 'john');
document.querySelector('.chatBoxes').appendChild(david.chatBox);

var lira = new Chatbox('david', 'john');
document.querySelector('.chatBoxes').appendChild(lira.chatBox);