Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});


createCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
  if (comment.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false,
      type: "comment"
    });
  }
};

Meteor.methods({
  createGroupNotification: function(postId) {
    check(postId, String);

    var spectators = Posts.findOne(postId).spectators;
    var challengers = Posts.findOne(postId).challengers;
    var post = Posts.findOne(postId);

    for (i in challengers) {
      console.log(challengers[i]);
      Notifications.insert({
        userId: challengers[i],
        postId: post._id,
        read: false,
        type: "group"
      });
    }

    for (i in spectators) {
      console.log(spectators[i]);
      Notifications.insert({
        userId: spectators[i],
        postId: post._id,
        read: false,
        type: "group"
      });
    }
  }
})

