const { Client } = require('pg');
var client = new Client({
    user: 'postgres',
    password: 'pw'
})

client.connect();

client
.query('DROP DATABASE IF EXISTS chat')
.then(() => {
    return client.query('CREATE DATABASE chat');
})
.then(() => {
    client.end();
    client = new Client({
        user: 'postgres',
        password: 'pw',
        database: 'chat'
    })
    client.connect();

    return client.query(
        `CREATE TABLE users (
            "user_id" SERIAL NOT NULL PRIMARY KEY,
            "first_name" VARCHAR(50),
            "last_name" VARCHAR(50)
        )`
    )
})
.then(() => {
    return client.query(
        `CREATE TABLE messages (
            "message_id" SERIAL NOT NULL PRIMARY KEY,
            "sender" int NOT NULL,
            "receiver" int NOT NULL,
            "message" VARCHAR(200) NOT NULL,
            "time" TIMESTAMPTZ NOT NULL
        )`
    )
})
.then(() => {
    return client.query(
        `COPY users FROM '${__dirname}/../generate-data/users.txt' WITH CSV HEADER` 
    )
})
.then(() => {
    return client.query(
        `COPY messages FROM '${__dirname}/../generate-data/messages.txt' WITH CSV HEADER` 
    )
})
.then(() => {
    client.end();
})