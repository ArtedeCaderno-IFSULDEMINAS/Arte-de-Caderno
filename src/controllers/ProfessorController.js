import Professor from "../models/professor.js";
import Login from "../models/login.js";
import School from "../models/school.js";

class ProfessorController {

    listProfessor = async (req, res) => {
        try{
            const professors = await Professor.find();
            res.status(200).json(professors);
        }
        catch(err){
            res.status(500).json({message: err.message});
        }
    }

    insertProfessor = async (req, res) => {
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
            res.status(400).json({message: err.message});
        }

    }

    listSchoolByProfessorId = async (req, res) => {
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
            res.status(500).json({message: err.message});
        }
    }

}

export default new ProfessorController;