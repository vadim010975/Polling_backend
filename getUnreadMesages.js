const { faker } = require('@faker-js/faker');

const getUnreadMesages = () => {

  const userName = faker.internet.userName();

  return JSON.stringify({
    status: "ok",
    timestamp: Date.now(),
    messages: [
      {
        id: faker.string.uuid(),
        from: userName,
        subject: "Hello from" + userName,
        body: "Long message body here",
        received: Date.now(),
      }
    ],
  });

}

module.exports = getUnreadMesages;