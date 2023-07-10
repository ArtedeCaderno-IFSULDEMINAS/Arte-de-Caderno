import Professor from "../models/professor.js";
import Login from "../models/login.js";
import School from "../models/school.js";

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

    insertProfessor = async (req, res, next) => {
        const professorReq = new Professor(req.body);
        const {name, date_of_birth, cpf, phone, cep, address, city, uf, email, schoolId, password} = professorReq;
        const loginExists = await Login.findOne({username: cpf});
        if(loginExists !== null){
            return res.status(400).json({message: 'User already exists'});
        }
        const login = new Login({
            username: cpf,
            password: password,
            accessType: 'professor'
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
                email: email,
                accessType: 'professor'
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
        const professorReq = new Professor(req.body);

        const {name, date_of_birth, cpf, phone, cep, address, city, uf, email, schoolId} = professorReq;

        if(id === null){
            return res.status(400).json({message: 'Id is required'});
        }

        try{
            const professor = await Professor.findById(id);
            if(professor === null){
                return res.status(400).json({message: 'Professor not found'});
            }
            professor.name = name;
            professor.date_of_birth = date_of_birth;
            professor.phone = phone;
            professor.cep = cep;
            professor.address = address;
            professor.city = city;
            professor.uf = uf;
            professor.schoolId = schoolId;
            professor.email = email;
            await professor.save();
            res.status(200).json(professor);
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
        const {professorId} = req.body;
        if(professorId === null){
            return res.status(400).json({message: 'Professor is required'});
        }
        try{
            const professor = await Professor.findById(professorId);
            if(professor === null){
                return res.status(400).json({message: 'Professor not found'});
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

}

export default new ProfessorController;