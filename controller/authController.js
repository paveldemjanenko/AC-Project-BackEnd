import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    await UserModel.save({
      username: req.body.username,
      email: req.body.email,
      rehashedPassword: req.body.rehashedPassword,
    }).catch(error => {
      throw new AppError(error.message, 400);
    });
    // logger.log('info', `Successfully registered: ${req.body.userName}`);
    res.status(200).send({ payload: { message: 'Successfully registered' } });
  };

  export { register };