Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },

  joinedSpec: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.spectators, userId)) {
      return 'Join as Spectator';
    } else {
      return 'You are a Spectator';
    }
  },

  joinedSpecClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.spectators, userId)) {
      return 'upSpec btn btn-primary';
    } else {
      return 'btn btn-success';
    }
  },

  joinedChall: function(){
    var userId = Meteor.userId();
    if (userId && !_.include(this.challengers, userId)) {
      return 'Join as Challenger';
    } else {
      return 'You are a Challenger';
    }
  },

  joinedChallClass: function(){
    var userId = Meteor.userId();
    if (userId && !_.include(this.challengers, userId)) {
      return 'upChall btn btn-danger';
    } else {
      return 'btn btn-success';
    }
  },

  ownPost: function() {
    return this.userId === Meteor.userId();
  },

  openPost: function() {
    post = Posts.findOne({_id: this._id});
    return post.open === true;
  }

});



Template.postPage.events({
  'click .upSpec': function(e) {
    e.preventDefault();
    Meteor.call('upSpec', this._id);
  },
  'click .upChall': function(e) {
    e.preventDefault();
    Meteor.call('upChall', this._id);
  },
  'click .closeChallenge': function(e) {
    e.preventDefault();
    Meteor.call('closeChallenge', this._id);
  },
  'click .openChallenge': function(e) {
    e.preventDefault();
    Meteor.call('openChallenge', this._id);
  }
});



