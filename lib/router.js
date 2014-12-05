Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});


// route to all challenges list
Router.route('/', {name: 'postsList'});


Router.route('/post/:_id', {
  name: 'postPage',
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function() {
    return Posts.findOne(this.params._id);
  }
});


// route to editing single challenge post
Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() {return Posts.findOne(this.params._id); }
});


// route to submit new challenge page
Router.route('/submit', {name: 'postSubmit'});


// function that requires user to log in
// Latency: added loadingTemplate while waiting to log in
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

// route to notFound template
// instead of postPage when dataNotFound
Router.onBeforeAction('dataNotFound', {only: 'postPage'});


// route to accessDenied template
// instead of postSubmit when user not logged in
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

