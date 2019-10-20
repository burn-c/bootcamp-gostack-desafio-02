// eslint-disable-next-line import/no-unresolved
import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const studentExists = await Students.findOne({
      where: { email: req.body.email }
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Estudante já cadastrado!' });
    }

    const { id, name, email, provider } = await Students.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const student = await Students.findByPk(req.studentId);

    if (email !== student.email) {
      const studentExists = await Students.findOne({
        where: { email }
      });

      if (studentExists) {
        return res.status(400).json({ error: 'Estudante já cadastrado!' });
      }
    }

    if (oldPassword && !(await student.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Passwprd does not match' });
    }

    const { id, name, provider } = await student.update(req.body);
    return res.json({
      id,
      name,
      email,
      provider
    });
  }
}

export default new StudentsController();
