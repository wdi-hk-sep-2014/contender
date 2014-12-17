Template.postContenders.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },


  displayText: function() {
    post = Posts.findOne({_id: this._id});
    if (post.selected === '') {
      return " Select your Challenger";
    } else {
      user = Meteor.users.findOne({_id: post.selected});
      return user.username;
    }
  }
});








Template.contendersList.helpers({
  challengers: function() {
    return this.challengers;
  }
});



Template.contendersList.rendered = function(){
  Session.set('postId', this.data._id);
  Session.set('postSelected', this.data.selected);
};







Template.contender.helpers({
  userName: function() {

    userId = this.toString();

    user = Meteor.users.findOne({_id: userId});
    return user.username;
  }

});





Template.contender.events({

  'click .yes': function(e) {
    e.preventDefault();

    var postStatus = Session.get('postSelected');
    var currentPostId = Session.get('postId');

    console.log(this.toString());
    Meteor.call('selectChallenger', currentPostId, this.toString());

    Router.go('/post/' + currentPostId);

  }

});


Template.contender.rendered = function() {
  $('.example').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes

    var modal = $(this)
    modal.find('.modal-title').text("Select " + recipient + " as Challenger?")
    modal.find('.modal-body input').val(recipient)
  });
};
