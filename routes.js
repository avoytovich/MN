const routes = require('next-routes');

// Name   Page      Pattern
module.exports = routes()
  .add('manage-groups', '/manage-groups', 'manage-groups')
  .add('editgroup', '/manage-groups/editgroup/:id', 'editgroup')
  .add('quiz', '/manage-groups/group/:id/quiz', 'quiz')
  .add('group', '/manage-groups/group/:id/:sub?', 'manage-groups/group')
  .add('create-group','/manage-groups/creategroup', 'creategroup')
