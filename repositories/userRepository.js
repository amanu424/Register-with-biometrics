const User = require("../models/user");

class UserRepository {
  async createUser(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async getAllUsers() {
    return await User.find().sort({ $natural: -1});
  }
  
  async findUserByPhone(phone) {
    return await User.findOne({ phone });
  }

  async findUserByName(name) {
    return await User.findOne({ name });
  }

  async findUserById(id) {
    return await User.findById(id);
  }

    async deleteUserById(id) {
        return await User.findByIdAndDelete(id);
    }
}


module.exports = new UserRepository();
