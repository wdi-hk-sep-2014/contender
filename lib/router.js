Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

// route to all challenges list
Router.route('/', {name: 'postsList'});

// route to single challenge post
Router.route('/posts/:_id', {
  name: 'postPage',
  data: function() {return Posts.findOne(this.params._id); }
});

// route to submit new challenge page
Router.route('/submit', {name: 'postSubmit'});

// route to not found
Router.onBeforeAction('dataNotFound', {only: 'postPage'});