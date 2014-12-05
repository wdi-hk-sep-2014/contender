Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val(),
      activity: $(e.target).find('[name=activity]').val(),
      description: $(e.target).find('[name=description]').val()
    };

    var errors = validatePost(post);
    if (errors.title || errors.activity || errors.description)
      return Session.set('postSubmitErrors', errors);


    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);


      Router.go('postPage', {_id: result._id});
    });
  }
});


Template.postSubmit.created = function() {
  Session.set('postSubmitErrors', {});
}


// errorMessage returns the message itself
// errorClass checks for the presence of a message
Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error': '';
  }
});