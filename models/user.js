var mongoose = require('mongoose');
var jsonPatch = require('mongoose-json-patch');

var userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  meta: {
    created_date: {
      type: Date,
      writable: false
    },
    active: Boolean,
    creator_delegate_id: {
      type: String,
      writable: false
    }
  }
});

userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.created_date = new Date();
    this.meta.active = true;
  }
  // Unwrittable fields
  next();
});

userSchema.plugin(jsonPatch);

module.exports = mongoose.model('User', userSchema);
