if (Posts.find().count() === 0) {
  var now = new Date().getTime();


  // dummy users
  var songId = Meteor.users.insert({
    username: "songyeepark"
  });

  var song = Meteor.users.findOne(songId);

  var harryId = Meteor.users.insert({
    username: "harrypotter"
  });

  var harry = Meteor.users.findOne(harryId);


  var chessId = Posts.insert({
    title: "(test) Chess, best three out of five",
    activity: "Chess",
    author: song.username,
    description: "Hong Kong Park, 19 Cotton Tree Drive. I'll bring the board.",
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    spectators: [],
    specJoins: 0,
    challengers: [],
    challJoins: 0,
    selected: false,
    open: true
  });

  Comments.insert({
    postId: chessId,
    userId: harry._id,
    author: harry.username,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: "Do you play professionally? I haven't played in a while."
  });

  Comments.insert({
    postId: chessId,
    userId: song._id,
    author: song.username,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: "No worries, I'm open to players of all levels."
  });

  Posts.insert({
    title: "(test) Currently undefeated in the greatest sport that is Ping Pong",
    activity: "Ping Pong",
    author: harry.username,
    description: "Cyberport, 3F, tomorrow. Bring your own racket.",
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    spectators: [],
    specJoins: 0,
    challengers: [],
    challJoins: 0,
    selected: false,
    open: true

  });

  Posts.insert({
    title: "(test) Seeking a sparring partner...in Street Fighters",
    activity: "Arcade",
    author: song.username,
    description: "GameZone, New Town Mall, 65 Argyle St, Mong Kok. 7pm, loser buys dinner!",
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    spectators: [],
    specJoins: 0,
    challengers: [],
    challJoins: 0,
    selected: false,
    open: true
  });


}