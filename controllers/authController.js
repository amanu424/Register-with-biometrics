const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');

exports.getRegister = (req, res) => {
    res.render('register', { messages: req.flash() });
};

exports.postRegister = async (req, res) => {
    const { name, phone, password, work, reason, country } = req.body;
    const photo = req.file ? req.file.path : null;  // Get photo path from Cloudinary
    try {
        await userRepository.createUser({ name, phone, password, photo, work, reason, country });
        req.flash('success', 'You are registered')
        res.redirect('/register');
    } catch (err) {
        console.log(err)
        res.redirect('/register');
    }
};

exports.getLogin = (req, res) => {
  if (req.session.userId) {
      return res.redirect('/dashboard');
    }
    res.render('login', { messages: req.flash() });
};

exports.postLogin = async (req, res) => {
    const { phone, password } = req.body;
    const user = await userRepository.findUserByPhone(phone);
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id;
        res.redirect('/dashboard');
    } else {
      req.flash('error', 'Wrong input, Try again')
        res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
