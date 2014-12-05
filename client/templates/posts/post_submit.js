Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val(),
      activity: $(e.target).find('[name=activity]').val(),
      description: $(e.target).find('[name=description]').val(),
      date: $(e.target).find('[name=date]').val()
    };

    post._id = Posts.insert(post);
    Router.go('postPage', post);
  }
});