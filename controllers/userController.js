const getUserInfo = async (req, res) => {
    const { user } = req;
    res.status(200).send({
      payload: {
        id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  };
  
  export { getUserInfo };