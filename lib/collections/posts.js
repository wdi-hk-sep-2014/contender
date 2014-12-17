Posts = new Mongo.Collection('posts');

Posts.initEasySearch(['title','activity']);

Posts.allow({
  update: function(userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function(userId, post) {
    return ownsDocument(userId, post);
  }
});

// update only succeed if it's only targeting the fields
Posts.deny({
  update: function(userId, post, fieldNames) {
    //may only edit the following two fields
    return (_.without(fieldNames, 'title', 'activity', 'description').length > 0);
  }
});


// deny post update when fields are empty
Posts.deny({
  update: function(userId, post, fieldNames) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.activity || errors.description;
  }
});

// looks at a post object and returns an "errors" object
// containing any relevant errors, whether the fields are missing
validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a title";

  if (!post.activity)
    errors.activity = "Please fill in an activity";

  if (!post.description)
    errors.description = "Please fill in a description";

  return errors;
}


//Deleted allow, Meteor Methods executed on the server are trusted
//so Meteor Methods bypass any allow/deny callbacks
Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String); //checks user calling method is properly logged in
    check(postAttributes, {         //checks for correct data input types
      title: String,
      activity: String,
      description: String,
      dateAndTime: String
    });

    var errors = validatePost(postAttributes);
    if (errors.title || errors.activity || errors.description)
      throw new Meteor.Error('invalid-post', "You must set a title, activity and description for your post");

  //extend postAttributes with more properties
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: Meteor.userId(),
      author: user.username,
      submitted: new Date(),
      commentsCount: 0,
      spectators: [],
      specJoins: 0,
      challengers: [],
      challJoins: 0,
      selected: ''
    });

  //insert entire post into database and return id to client
    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  },

  // add Spectators and Challengers
  upSpec: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var post = Posts.findOne(postId);
    if (!post)
      throw new Meteor.Error('invalid', 'Post not found');
    if (_.include(post.spectators, this.userId))
      throw new Meteor.Error('invalid', 'Already joined event');

    Posts.update(post._id, {
      $addToSet: {spectators: this.userId},
      $inc: {specJoins: 1}
    });
  },

  upChall: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var post = Posts.findOne(postId);
    if (!post)
      throw new Meteor.Error('invalid', 'Post not found');
    if (_.include(post.challengers, this.userId))
      throw new Meteor.Error('invalid', 'Already joined event');

    Posts.update(post._id, {
      $addToSet: {challengers: this.userId},
      $inc: {challJoins: 1}
    });
  },

  selectChallenger: function(postId, userId) {
    check(userId, String);
    check(postId, String);

    Posts.update(postId,
      { $set: {selected: userId} }
    );
  }

});