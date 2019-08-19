import express from 'express';
import { register, logIn} from '../controller/authController';

const router = express.Router();

router.post('/users', register);
router.post('/', logIn); //ToDo

export default router;