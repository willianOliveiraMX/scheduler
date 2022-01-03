const faker = require('faker');

exports.seed = function(knex) {
      const createAddressee = () => {
        return {
          name: faker.name.findName(),
          lastName: faker.name.findName(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.phoneNumber('###########'),
          pushUserId: faker.random.alphaNumeric(8),
          created_at: new Date()
        };
      };

      const createAddressees = (numUsers = 10) => {
        return Array.from({length: numUsers}, createAddressee);
      }
      
      return knex("addressee").insert(createAddressees(10));
};
