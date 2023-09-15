import Professor from "../models/professor.js";
import Login from "../models/login.js";
import School from "../models/school.js";
import Student from "../models/student.js";
import createHashWithSalt from "../middleware/hashWithSalt.js";

class ProfessorController {

    listProfessor = async (req, res, next) => {
        try{
            const professors = await Professor.find();
            res.status(200).json(professors);
        }
        catch(err){
            next(err);
        }
    }

    getProfessorById = async (req, res, next) => {
        try{
            const {id} = req.params;
            const professor = await Professor.findById(id);

            if(professor === null){
                return res.status(404).json({message: 'Professor not found'});
            }
            
            const response = {
                professor: professor,
                accessType: 'professor'
            };

            res.status(200).json(response);
        }
        catch(err){
            next(err);
        }
    }

    insertProfessor = async (req, res, next) => {
        const {name, date_of_birth, cpf, phone, cep, address, city, uf, email, schoolId, password} = req.body;
        const loginExists = await Login.findOne({username: cpf});
        if(loginExists !== null){
            return res.status(400).json({message: 'User already exists'});
        }
        
        const hashPassword = await createHashWithSalt(password);
        const login = new Login({
            username: cpf,
            password: hashPassword,
            accessType: 'professor',
            email: email
        });
        try{
            const newLogin = await login.save();
            const professor = new Professor({
                name: name,
                date_of_birth: date_of_birth,
                cpf: cpf,
                phone: phone,
                cep: cep,
                address: address,
                city: city,
                uf: uf,
                loginId: newLogin._id,
                schoolId: schoolId,
                email: email
            });
            const newProfessor = await professor.save();
            res.status(201).json(newProfessor);
        }
        catch(err){
            next(err);
        }

    }

    updateProfessor = async (req, res, next) => {
        const {id} = req.params;
        const update = req.body;
        try{
            const professorUpdate = await Professor.findByIdAndUpdate(
                id,
                {$set: update},
                {new: true}
            );
    
            if(professorUpdate === null){
                return res.status(404).json({message: 'Professor not found'});
            }
    
            return res.status(200).json(professorUpdate);
        }

        catch(err){
            next(err);
        }
    }

    deleteProfessor = async (req, res, next) => {
        const {id} = req.params;
        if(id === null){
            return res.status(400).json({message: 'Id is required'});
        }
        try{
            const professor = await Professor.findById(id);
            if(professor === null){
                return res.status(400).json({message: 'Professor not found'});
            }
            await Login.deleteOne({_id: professor.loginId});
            const result = await Professor.deleteOne({_id: id});

            if(result.deletedCount === 0){
                return res.status(400).json({message: 'Professor not found'});
            }
            return res.status(200).json({message: 'Professor deleted'});
        }
        catch(err){
            next(err);
        }
    }

    listSchoolByProfessorId = async (req, res, next) => {
        const schools = [];
        const {id} = req.params;
        try{
            const professor = await Professor.findById(id);
            if(professor === null){
                return res.status(404).json({message: 'Professor not found'});
            }
            for(let i = 0; i < professor.schoolId.length; i++){
                const school = await School.findById(professor.schoolId[i]);
                schools.push(school);
            }
            return res.status(200).json(schools);
        }
        catch(err){
            next(err);
        }
    }

    insertStudentByProfessorId = async (req, res, next) => {
        const {id} = req.params;
        try{
            const studentReq = new Student(req.body);

            const loginExists = await Login.findOne({username: studentReq.cpf});
            const professor = await Professor.findById(id);

            if(professor === null){
                return res.status(404).json({message: 'Professor not found'});
            }

            if(loginExists !== null){
                return res.status(400).json({message: 'User already exists'});
            }
    
            await studentReq.save();
    
            professor.studentsId.push(studentReq._id);

            await professor.save();
    
            return res.status(201).json(studentReq);
        }

        catch(err){
            next(err);
        }
        
    }

    listStudentsByProfessorId = async (req, res, next) => {
        const {id} = req.params;
        if(id === null){
            return res.status(400).json({message: 'Id is required'});
        }

        try{
            const professor = await Professor.findById(id);
            if(professor === null){
                return res.status(400).json({message: 'Professor not found'});
            }
            const students = [];
            for(let i = 0; i < professor.studentsId.length; i++){
                const student = await Student.findById(professor.studentsId[i]);
                students.push(student);
            }
            return res.status(200).json(students);
        }
        catch(err){
            next(err);
        }
    }

    addSchoolByProfessorId = async (req, res, next) => {
        const {id} = req.params;
        const {schoolId} = req.body;
        if(id === null){
            return res.status(400).json({message: 'Id is required'});
        }
        if(schoolId === null){
            return res.status(400).json({message: 'School id is required'});
        }
        try{
            const professor = await Professor.findById(id);
            if(professor === null){
                return res.status(400).json({message: 'Professor not found'});
            }
            professor.schoolId.push(schoolId);
            await professor.save();
            return res.status(200).json(professor);
        }
        catch(err){
            next(err);
        }
    }
}

export default new ProfessorController;