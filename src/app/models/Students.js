import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        peso: Sequelize.FLOAT,
        altura: Sequelize.FLOAT,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async student => {
      if (student.password) {
        // eslint-disable-next-line no-param-reassign
        student.password_hash = await bcrypt.hash(student.password, 8);
      }
    });

    return this;
  }
}

export default Students;
