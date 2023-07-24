import Login from '../models/login.js';
import Student from '../models/student.js';
import createHashWithSalt from '../middleware/hashWithSalt.js';

class StudentController {
    
    listStudent = async (req, res, next) => {
        try{
            const students = await Student.find();
            res.status(200).json(students);
        }
        catch(err){
            next(err);
        }
    }

    insertStudent = async (req, res, next) => {
        const {name, date_of_birth, cpf, phone, cep, address, city, uf, email, schoolId, password} = req.body;

        const loginExists = await Login.findOne({username: cpf});

        if(loginExists !== null){
            return res.status(400).json({message: 'User already exists'});
        }

        const hashPassword = await createHashWithSalt(password);
        const login = new Login({
            username: cpf,
            password: hashPassword,
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
                schoolId: schoolId
            });
            const newStudent = await student.save();
            res.status(201).json(newStudent);
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }

    updateStudent = async (req, res, next) => {
        const {id} = req.params;
        const studentReq = new Student(req.body);

        const {name, date_of_birth, phone, cep, address, city, uf, email, schoolId} = studentReq;

        if( id === null){
            return res.status(400).json({message: 'Id is required'});
        }

        try{
            const student = await Student.findById(id);
            if(student === null){
                return res.status(400).json({message: 'Student not found'});
            }

            student.name = name;
            student.date_of_birth = date_of_birth;
            student.cpf = student.cpf;
            student.phone = phone;
            student.cep = cep;
            student.address = address;
            student.city = city;
            student.uf = uf;
            student.schoolId = schoolId;
            student.email = email;
            student.loginId = student.loginId;
            student.drawsId = student.drawsId;

            await student.save();
            res.status(200).json(student);
        }
        catch(err){
            next(err);
        }
    }

    deleteStudent = async (req, res, next) => {
        const {id} = req.params;  
        if(id === null){
            return res.status(400).json({message: 'Id is required'});
        }

        try{
            const student = await Student.findById(id);
            if(student === null){
                return res.status(400).json({message: 'Student not found'});
            }

            await Login.deleteOne({_id: student.loginId});

            const result = await Student.deleteOne({_id: id});
            
            if(result.deletedCount === 0){
                return res.status(400).json({message: 'Student not found'});
            }
            res.status(200).json({message: 'Student deleted'});
        }
        catch(err){
            next(err);
        }
    }


}

export default new StudentController;