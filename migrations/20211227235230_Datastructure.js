
exports.up = function(knex) {
  return knex
        .schema
        .createTable("addressee", function(addresseeTable) {
            addresseeTable.increments();

            addresseeTable.string( "name", 50 ).notNullable();
            addresseeTable.string( "lastName", 50 ).notNullable();
            addresseeTable.string( "email", 250 ).notNullable().unique();
            addresseeTable.string( "phoneNumber", 50 ).notNullable();
            addresseeTable.string( "pushUserId", 50 ).notNullable().unique();
            addresseeTable.boolean( "isValid" ).notNullable().defaultTo(true);
            addresseeTable.timestamps();
        })

        .createTable("communication_type", function(communicationTypeTable) {
            communicationTypeTable.increments();

            communicationTypeTable.string( "description", 50 ).notNullable();
            communicationTypeTable.boolean( "isValid" ).notNullable().defaultTo(true);
        })

        .createTable("message", function(messageTable){
            messageTable.increments();

            messageTable.text( "text" ).notNullable();
            messageTable.dateTime( "timeToSend" ).notNullable();
            messageTable.enu( "status", ["waiting", "sended", "canceled"] ).notNullable().defaultTo("waiting");
        })

        .createTable("addressee_message", function(addresseeMessage){
            addresseeMessage.increments();

            addresseeMessage.integer('messageId',11).unsigned().references('id').inTable('message');
            addresseeMessage.integer('addresseeId',11).unsigned().references('id').inTable('addressee');
        })

        .createTable("message_communication_type", function(messageCommunicationType) {
            messageCommunicationType.increments();
            messageCommunicationType.integer('messageId',11).unsigned().references('id').inTable('message');
            messageCommunicationType.integer('communicationTypeId',11).unsigned().references('id').inTable('communication_type');
        })
};

exports.down = function(knex) {
    return knex
           .schema
            .dropTableIfExists( "addressee" )
            .dropTableIfExists( "communication_type" )
            .dropTableIfExists( "message" )
            .dropTableIfExists( "addressee_message" )
            .dropTableIfExists( "message_communication_type" );
};
