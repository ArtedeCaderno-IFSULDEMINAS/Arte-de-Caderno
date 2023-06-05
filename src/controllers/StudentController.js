import Login from '../models/login.js';
import Student from '../models/student.js';

class StudentController {
    
    listStudent = async (req, res) => {
        try{
            const students = await Student.find();
            res.status(200).json(students);
        }
        catch(err){
            res.status(500).json({message: err.message});
        }
    }

    insertStudent = async (req, res) => {
        const {name, date_of_birth, cpf, phone, cep, address, city, uf, schoolId, password, email} = req.body;
        if(name === null || date_of_birth === null || cpf === null || phone === null || cep === null || address === null || city === null || uf === null || schoolId === null || password === null){
            return res.status(400).json({message: 'All fields are required'});
        }

        const loginExists = await Login.findOne({username: cpf});
        if(loginExists !== null){
            return res.status(400).json({message: 'User already exists'});
        }
        const login = new Login({
            username: cpf,
            password: password,
            accessType: 'student'
        });

        try{
            const newLogin = await login.save();
            const student = new Student({
                name: name,
                date_of_birth: date_of_birth,
                cpf: cpf,
                phone: phone,
                cep: cep,
                address: address,
                city: city,
                uf: uf,
                loginId: newLogin._id,
                email: email,
                schoolId: schoolId,
                accessType: 'student'
            });
            const newStudent = await student.save();
            res.status(201).json(newStudent);
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }

}

export default new StudentController;