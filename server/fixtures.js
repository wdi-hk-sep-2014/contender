if (Posts.find().count() === 0) {
  var now = new Date().getTime();


  // dummy users
  var songId = Meteor.users.insert({
    profile: {name: "Songyee Park"}

  });
  var song = Meteor.users.findOne(songId);

  var harryId = Meteor.users.insert({
    profile: {name: "Harry Potter"}
  });
  var harry = Meteor.users.findOne(harryId);


  var chessId = Posts.insert({
    title: "I'll beat you so hard",
    activity: "Chess",
    author: song.profile.name,
    description: "Lan Kwai Fong, this weekend, around 7pm. You up for this?",
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2
  });

  Comments.insert({
    postId: chessId,
    userId: harry._id,
    author: harry.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Bring it onnnnnn.'
  });

  Comments.insert({
    postId: chessId,
    userId: song._id,
    author: song.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: "No using magic! Fair play!"
  })

  Posts.insert({
    title: "Currently undefeated in the game of Tic-Tac-Toe",
    activity: "Tic-Tac-Toe",
    author: harry.profile.name,
    description: "Cyberport, 3F, tomorrow. Bring pen and paper, sucka!",
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0
  });

  Posts.insert({
    title: "Seeking a Tennis rival",
    activity: "Tennis",
    author: song.profile.name,
    description: "There's a tennis court behind my apartment at Central. 7pm, loser buys dinner!",
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0
  });

}