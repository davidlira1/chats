const faker = require('faker');
const fs = require('fs');

module.exports = () => {
    var users = 'user_id,first_name,last_name\r\n';
    
    for(var i = 1; i <= 1000; i++) {
        users+= `${i},${faker.name.firstName()},${faker.name.lastName()}\r\n`;
    }
    
    fs.writeFileSync(__dirname + '/users.txt', users);
}


