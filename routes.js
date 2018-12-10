const routes = require('next-routes');

// Name   Page      Pattern
module.exports = routes()
  .add('manage-groups', '/manage-groups', 'manage-groups')
  .add('editgroup', '/manage-groups/editgroup/:id', 'editgroup')
  .add('quiz', '/manage-groups/group/:id/quiz', 'quiz')
  .add('group', '/manage-groups/group/:id', 'manage-groups/group')
  .add('create-group','/manage-groups/creategroup', 'creategroup')
  .add('edit-member', '/edit-member/:memberId', 'edit-member')
  .add('create-member', '/create-member/:groupId', 'create-member')
  .add('group-questions', '/group-questions/:groupId', 'group-questions')