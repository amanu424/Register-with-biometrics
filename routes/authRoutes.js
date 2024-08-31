const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middlewares/multer');

router.get('/register', authController.getRegister);
router.post('/register', upload.single('photo'), authController.postRegister); 
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.logout);

router.get('/adminRegister', authController.getRegisterAdmin);
router.post('/adminRegister', authController.postRegisterAdmin); 
router.get('/adminLogin', authController.getLoginAdmin);
router.post('/admingoofymypermissionlogin', authController.postLoginAdmin);

router.get('/done', authController.getDone);

module.exports = router;
