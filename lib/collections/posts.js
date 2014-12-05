Posts = new Mongo.Collection('posts');


//Deleted allow, Meteor Methods executed on the server are trusted
//so Meteor Methods bypass any allow/deny callbacks
Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String); //checks user calling method is properly logged in
    check(postAttributes, {         //checks for correct data input types
      title: String,
      activity: String,
      description: String,
      date: Date
    });


//extend postAttributes with more properties
  var user = Meteor.user();
  var post = _.extend(postAttributes, {
    userId: user._id,
    author: user.username,
    submitted: new Date()
  });

//insert entire post into database and return id to client
  var postId = Posts.insert(post);

  return {
    _id: postId
  };

  }
});