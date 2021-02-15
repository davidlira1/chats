const faker = require('faker');
const fs = require('fs');

module.exports = () => {
    var messages = 'message_id,sender,receiver,message,time\r\n';
    var sender, receiver, hour;
    var messageId = 0;
    for(sender = 1; sender <= 10; sender++) {
        //for each sender we want to pick 6 random numbers, and generate 10 to 20 messages for each.
        var receivers = [];
        while(receivers.length < 6) {
            receiver = Math.ceil(Math.random() * 1000);
            if(!receivers.includes(receiver)) {
                receivers.push(receiver);

                hour = Math.ceil(Math.random() * 24);
                minute = 1;
                for(var message = 1; message <= Math.ceil(Math.random() * 5) + 5; message++) {
                    messageId++;
                    hour = Math.ceil(Math.random() * 23);
                
                    messages+= `${messageId},${sender},${receiver},${faker.lorem.sentence()},${'2021-02-12 '}${hour}${':'}${++minute}${':13.145902-08'}\r\n`;                
                    messageId++;
                    messages+= `${messageId},${receiver},${sender},${faker.lorem.sentence()},${'2021-02-12 '}${hour}${':'}${++minute}${':13.145902-08'}\r\n`;                

                };
            }
        }
    }
    
    fs.writeFileSync(__dirname + '/messages.txt', messages);
}
