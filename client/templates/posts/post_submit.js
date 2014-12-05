Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val(),
      activity: $(e.target).find('[name=activity]').val(),
      description: $(e.target).find('[name=description]').val()
    };


    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);


      Router.go('postPage', {_id: result._id});
    });
  }
});