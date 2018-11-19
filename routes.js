const routes = require('next-routes');

// Name   Page      Pattern
module.exports = routes()
  .add('editgroup', '/home/editgroup/:id', 'editgroup')
  .add('quiz', '/home/quiz/:id', 'home/quiz')
  .add('group', '/home/manage-groups/group/:id', 'home/manage-groups/group')
