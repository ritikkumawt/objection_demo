exports.up = function (knex) {
    return knex.schema.table('user', function (table) {
        table.string('profilePic');
    });
};

exports.down = function (knex) {
    return knex.schema.table('user', function (table) {
        table.dropColumn('profilePic');
    });
};
