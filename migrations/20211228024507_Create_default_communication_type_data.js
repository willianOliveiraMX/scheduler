
exports.up = function(knex) {
    return knex("communication_type").insert(([
        { description: "email", isValid: true },
        { description: "sms", isValid: true },
        { description: "push", isValid: true },
        { description: "whatsapp", isValid: true },
    ]));
};

exports.down = function(knex) {
  
};
