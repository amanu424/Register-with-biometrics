const userRepository = require('../repositories/userRepository');

exports.getDashboard = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    const users = await userRepository.getAllUsers();
    res.render('dashboard', { users });
};

exports.deleteUser = async (req, res) => {
    const userId = req.body.userId; // Get the user ID from the form

    try {
        const user = await userRepository.deleteUserById(userId);

        // Delete the user's image from Cloudinary if it exists
        if (user.photo) {
            const publicId = user.photo.split('/').pop().split('.')[0]; // Extract public_id from the URL
            //await cloudinary.uploader.destroy(`user_photos/${publicId}`);
        }
        req.flash("success", "User deleted")
        res.redirect('/dashboard');
    } catch (err) {
        res.redirect('/dashboard');
    }
};
