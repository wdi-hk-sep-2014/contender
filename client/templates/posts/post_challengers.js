Template.postChallengers.helpers({
  challengers: function() {
    return this.challengers;
  }
});




Template.challenger.helpers({
  userName: function() {
    userId = this.toString();

    user = Meteor.users.findOne({_id: userId});
    return user.username;
  }
});

Template.challenger.events({

});