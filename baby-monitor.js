DiaperChanges = new Meteor.Collection('diaper_changes');

if (Meteor.is_client) {
  Template.diaper_changes.lastDiaperChanged = function () {
    lastDiaperChange = DiaperChanges.findOne({}, { sort: { created_at: -1 } });
    if (typeof lastDiaperChange !== 'undefined')
      return lastDiaperChange.created_at
    else
      return new Date();
  };

  Template.diaper_changes.lastDiaperChangedDisplay = function () {
    return Date.create(Template.diaper_changes.lastDiaperChanged()).format('at {12hr}:{mm}{tt} on {Weekday}');
  };

  Template.diaper_changes.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
      DiaperChanges.insert({ created_at: new Date() });
      if (typeof console !== 'undefined')
        console.log("Diaper change!");
    }
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
