const { Model } = require('objection');
const Blog = require('./blog.schema')
class user extends Model {
  static get tableName() {
    return 'user';
  } static get relationMappings() {
    return {
      blog: {
        relation: Model.HasManyRelation,
        modelClass: Blog,
        join: {
          from: "user.id",
          to: "blog.userId",
        },
      },
    };
  }
}

module.exports = user
