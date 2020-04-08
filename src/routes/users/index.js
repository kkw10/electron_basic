const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
  /**
   * method : POST
   * body : id, password
   */
  const { id, password } = req.body;

  if (id !== 'kkw') {
    const error = new Error('User Not Found');
    error.status = 404;
    return next(error);
  } 
  else if (password !== 'kkw123') {
    const error = new Error('Invalid Password');
    error.status(401);
    return next(error);
  }

  next();
});

router.post('/login', (req, res, next) => {
  res
    .status(200)
    .json({ message: 'Login Success' });
});

router.post('/', (req, res, next) => {
  /**
   * User 생성 요청
   * method : POST
   * body : id, password
   * content-type : x-www-urlencoded, application/json
   */

  /**
   * @TODO DB Model을 통해서 실제 User 생성
   */
  const { id, password } = req.body;

  if (id !== 'kkw') {
    const error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }
  else if (password !== 'kkw123') {
    const error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  const NewUser = { id, password }

  req.NewUser = NewUser;
  next();
});

router.post('/', (req, res, next) => {
  res.json(req.NewUser);
});

module.exports = router;