class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  findUser = async (userId) => {
    try {
      const user = await this.userModel.findOne({
        attributes: [
          'id',
          'account_id',
          'nickname',
          'phone',
          'address',
          'point',
          'member',
        ],
        where: { id: userId },
      });

      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  loginUser = async (userId) => {
    try {
      const user = await this.userModel.findOne({
        where: { account_id: userId },
      });

      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

module.exports = UserRepository;
