var createPermitted = function createPermitted (userId, requestedId) {
  // Only logged in user can create their own profile. Will change to a
  // more robust permission system in the future
  return userId == requestedId;
};

var getPermitted = function getPermitted (userId, requestedId) {
  // Only logged in user can get their own profile. Will change to a
  // more robust permission system in the future
  return userId == requestedId;
};

var patchPermitted = function getPermitted (userId, requestedId) {
  // Only logged in user can patch their own profile. Will change to a
  // more robust permission system in the future
  return userId == requestedId;
};

var deletePermitted = function getPermitted (userId, requestedId) {
  // Only logged in user can patch their own profile. Will change to a
  // more robust permission system in the future
  return userId == requestedId;
};

module.exports = {
  createPermitted: createPermitted,
  getPermitted: getPermitted,
  patchPermitted: patchPermitted,
  deletePermitted: deletePermitted
};
