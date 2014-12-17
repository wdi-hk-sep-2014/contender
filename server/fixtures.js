if (Posts.find().count() === 0) {
  var now = new Date().getTime();


  // dummy users
  var songId = Meteor.users.insert({
    username: "songyeepark",
    password: "whatever"
  });

  var song = Meteor.users.findOne(songId);

  var harryId = Meteor.users.insert({
    username: "harrypotter"
  });
  var harry = Meteor.users.findOne(harryId);


  var chessId = Posts.insert({
    title: "You think your Pokemon is better than mine?",
    activity: "Video Game",
    author: song.username,
    description: "Lan Kwai Fong, this weekend, around 7pm.",
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    spectators: [],
    specJoins: 0,
    challengers: [],
    challJoins: 0,
    selected: false
  });

  Comments.insert({
    postId: chessId,
    userId: harry._id,
    author: harry.username,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Bring it onnnnnn.'
  });

  Comments.insert({
    postId: chessId,
    userId: song._id,
    author: song.username,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: "My magikarp is going to whoop your ass."
  });

  Posts.insert({
    title: "Currently undefeated in the greatest sport that is Ping Pong",
    activity: "Ping Pong",
    author: harry.username,
    description: "Cyberport, 3F, tomorrow. Bring your own racket.",
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    spectators: [],
    specJoins: 0,
    challengers: [],
    challJoins: 0,
    selected: false

  });

  Posts.insert({
    title: "Seeking a sparring partner...in Street Fighter",
    activity: "Arcade",
    author: song.username,
    description: "GameZone, New Town Mall, 65 Argyle St, Mong Kok. 7pm, loser buys dinner!",
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    spectators: [],
    specJoins: 0,
    challengers: [],
    challJoins: 0,
    selected: false
  });


}