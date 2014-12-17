Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function() {
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationPostPath: function() {
    return Router.routes.postPage.path({_id: this.postId});
  },

  groupNotification: function() {
    return Router.routes.postPage.path({_id: this.postId});
  },

  author: function() {
    return Posts.findOne(this.postId).author;
  },

  isGroup: function() {
    if (this.type === 'group')
      return true;
    else
      return false;
  }
});



// notifications that are clicked are marked as read
Template.notificationItem.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});