Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
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

