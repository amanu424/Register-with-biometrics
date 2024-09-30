const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister); 
router.get('/biometrics', authController.getBiometrics);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.logout);

router.get('/adminRegister', authController.getRegisterAdmin);
router.post('/adminRegister', authController.postRegisterAdmin); 
router.get('/adminLogin', authController.getLoginAdmin);
router.post('/admingoofymypermissionlogin', authController.postLoginAdmin);

router.get('/done', authController.getDone);

module.exports = router;
