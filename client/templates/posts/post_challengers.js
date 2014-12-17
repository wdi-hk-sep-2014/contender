Template.postChallengers.helpers({
  challengers: function() {
    console.log(this);
    return this.challengers;
  }
});

Template.challenger.helpers({
  userName: function() {
    console.log("userId: " + this);
    userId = this.toString();

    user = Meteor.users.findOne({_id: userId});
    return user.username;
  }
});