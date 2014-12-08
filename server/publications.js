Meteor.publish('posts', function() {
  return Posts.find();
});


// passing this.params._id as an argument to the subscription
// restricting our data set to comments belonging to the current post
Meteor.publish('comments', function(postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function(){
  return Notifications.find({userId: this.userId, read: false});
});