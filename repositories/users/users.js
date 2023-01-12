class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  createUser = async (
    member,
    accountId,
    encryptPassword,
    nickname,
    phone,
    address,
    point
  ) => {
    try {
      const user = await this.userModel.create({
        member,
        account_id: accountId,
        password: encryptPassword,
        nickname,
        phone,
        address,
        point,
      });

      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

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

  loginUser = async (accountId) => {
    try {
      const user = await this.userModel.findOne({
        where: { account_id: accountId },
      });

      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

module.exports = UserRepository;
