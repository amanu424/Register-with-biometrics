const userRepository = require('../repositories/userRepository');
const agentRepository = require('../repositories/agentRepository');
const bcrypt = require('bcryptjs');

exports.getRegister = (req, res) => {
    res.render('register', { messages: req.flash() });
};
exports.getBiometrics = (req, res) => {
    res.render('biometrics', { messages: req.flash() });
};

exports.getRegisterAdmin = (req, res) => {
  if(!req.session.adminId){
    return res.redirect("/adminLogin")
  }
    res.render('adminRegister', { messages: req.flash() });
};

exports.postRegister = async (req, res) => {
    const { name, phone, password, work, reason, country } = req.body;
    try {
        await userRepository.createUser({ name, phone, password, work, reason, country });
        req.flash('success', 'You are registered')
        res.redirect('/biometrics');
    } catch (err) {
        console.log(err)
        req.flash("error", "Error, Try Again!!")
        res.redirect('/register');
    }
};

exports.getDone = (req, res) => {
    res.render('done', { messages: req.flash() });
};

exports.postRegisterAdmin = async (req, res) => {
    const { name, phone, password } = req.body;
    
    try {
        await agentRepository.createAgent({ name, phone, password });
        req.flash('success', 'You are registered')
        res.redirect('/adminRegister');
    } catch (err) {
        console.log(err)
        res.redirect('/adminRegister');
    }
};

exports.getLogin = (req, res) => {
  if (req.session.userId) {
      return res.redirect('/dashboard');
    }
    res.render('login', { messages: req.flash() });
};

exports.getLoginAdmin = (req, res) => {
  if (req.session.adminId) {
      return res.redirect('/adminRegister');
    }
    res.render('adminLogin', { messages: req.flash() });
};

exports.postLogin = async (req, res) => {
    const { phone, password } = req.body;
    const agent = await agentRepository.findAgentByPhone(phone);
    if (agent && await bcrypt.compare(password, agent.password)) {
        req.session.userId = agent.id;
        res.redirect('/dashboard');
    } else {
      req.flash('error', 'Wrong input, Try again')
        res.redirect('/login');
    }
};

exports.postLoginUser = async (req, res) => {
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

exports.postLoginAdmin = async (req, res) => {
    const { phone, password } = req.body;
    
    if (phone == "1123581321" && password == "davincycodeisgettingaway") {
        req.session.adminId = 'adminIdMyAss';
        res.redirect('/adminRegister');
    } else {
      req.flash('error', 'Wrong input, Try again')
        res.redirect('/adminLogin');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
