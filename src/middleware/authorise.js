const authorise = (permittedRole) => {
  return (req, res, next) => {
    // only for user
    const user = req.user;
    let isPremitted = false;
    // checking if it has permitted role
    permittedRole.amp((role) => {
      if (user.role.includes(role)) {
        isPremitted = true;
      }
    });

    if (isPremitted) {
      return next();
    } else {
      return res
        .status(500)
        .send({ message: "you are not authorised to perform this operation " });
    }
  };
};

module.exports = authorise;
