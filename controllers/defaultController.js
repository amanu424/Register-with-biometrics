exports.getDefault = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/register');
    }

    return res.redirect('/dashboard');
};