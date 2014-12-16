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

  joinedSpec2: function() {
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

  joinedChall2: function(){
    var userId = Meteor.userId();
    if (userId && !_.include(this.challengers, userId)) {
      return 'upChall btn btn-danger';
    } else {
      return 'btn btn-success';
    }
  },

  ownPost: function() {
    return this.userId === Meteor.userId();
  }

});

Template.postPage.events({
  'click .upSpec': function(e) {
    e.preventDefault();
    Meteor.call('upSpec', this._id);
  }
});

Template.postPage.events({
  'click .upChall': function(e) {
    e.preventDefault();
    Meteor.call('upChall', this._id);
  }
});

