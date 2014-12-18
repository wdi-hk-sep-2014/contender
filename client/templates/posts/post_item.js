Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },

  openPost: function() {
    post = Posts.findOne({_id: this._id});
    return post.open === true;
  }
});

