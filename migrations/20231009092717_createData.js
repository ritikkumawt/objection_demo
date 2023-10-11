
exports.up = function(knex) {
  return knex.schema
  .createTable("user",(t)=>{
    t.increments();
    t.string("userName").notNullable().defaultTo("DefaultUserName")
    t.string("userPassword").notNullable();
    t.string("userAddress").notNullable();
    t.string("userGender").notNullable();
    t.string("userEmail").notNullable().unique();
    t.timestamps(true,true)
  })
  .createTable("blog",(t)=>{
    t.increments();
    t.string("blogName").notNullable();
    t.string("description").notNullable();
    t.integer("userId").references("id").inTable("user")
    t.timestamps(true,true)
  })
};

exports.down = knex=> {
  return knex.schema.dropTable('blog')
  .dropTable('user');
};
