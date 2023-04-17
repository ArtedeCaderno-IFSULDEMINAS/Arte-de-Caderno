import Professor from "../models/professor.js";
import Login from "../models/login.js";

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
        const {name, date_of_birth, cpf, phone, cep, address, city, state, schoolId, password, email} = req.body;
        if(name === null || date_of_birth === null || cpf === null || phone === null || cep === null || address === null || city === null || state === null || schoolId === null || password === null){
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
                state: state,
                loginId: newLogin._id,
                schoolId: schoolId,
                email: email
            });
            const newProfessor = await professor.save();
            res.status(201).json(newProfessor);
        }
        catch(err){
            res.status(400).json({message: err.message});
        }

    }

}

export default new ProfessorController;