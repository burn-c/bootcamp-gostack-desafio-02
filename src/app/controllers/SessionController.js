import jwt from 'jsonwebtoken';

import Students from '../models/Students';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const students = await Students.findOne({ where: { email } });

    if (!students) {
      return res.status(401).json({ error: 'Usuário não cadastrado!' });
    }

    if (!(await students.checkPassword(password))) {
      return res.status(401).json({ error: 'Erro de senha ou usuário!' });
    }

    const { id, name } = students;

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
