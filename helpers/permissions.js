var createPermitted = function createPermitted (userId, requestedId) {
  // Only logged in user can create their own profile. Will change to a
  // more robust permission system in the future
  return userId == requestedId;
};

module.exports = {
  createPermitted: createPermitted
};
