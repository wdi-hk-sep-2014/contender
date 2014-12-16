Template.postSpectators.helpers({
  spectators: function() {
    console.log(this);
    return this.spectators;
  }
});

Template.spectator.helpers({
  userName: function() {
    console.log("userId: " + this);
    userId = this.toString();

    user = Meteor.users.findOne({_id: userId});
    return user.username;
  }
});