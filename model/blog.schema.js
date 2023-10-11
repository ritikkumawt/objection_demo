const { Model } = require('objection');

class blog extends Model {
  static get tableName() {
    return 'blog';
  }
  static get relationMappings() {
    const User= require('./user.schema'); 

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'blog.userId',
          to: 'user.id',
        },
      },
    };
  }
}


module.exports = blog
