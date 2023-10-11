
exports.seed = async function(knex) {

  await knex("user").insert([{
    id:1,
    userName : "ritikkumawat",
    userPassword : "ritik@123",
    userGender : "male",
    userAddress : "indore",
    userEmail :'ritik@fdgd2'

  },
  {
    id:2,
    userName : "ritik",
    userPassword : "ritik@123",
    userGender : "male",
    userAddress : "indore",
    userEmail :'ritik@fdgd12'
  },
  ]);

  await knex("blog").insert([{
    id:1,
    blogName:"knex",
    description : "learn about migration",
    userId: 2
  },
  {
    id:2,
    blogName:"bookshelf",
    description : "it is an ORM tool ",
    userId: 2
  },
  ])
};
