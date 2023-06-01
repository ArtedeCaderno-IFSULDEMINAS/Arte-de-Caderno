import School from "../models/school.js";

class SchoolController {
    
        listSchool = async (req, res) => {
            try{
                const schools = await School.find();
                res.status(200).json(schools);
            }
            catch(err){
                res.status(500).json({message: err.message});
            }
        }
    
        insertSchool = async (req, res) => {
            const {name, code, uf, city, address, cep, phone, email, site} = req.body;
            if(name === null || code === null || uf === null || city === null || address === null || cep === null || phone === null){
                return res.status(400).json({message: 'All fields are required'});
            }
            const school = new School({
                name: name,
                code: code,
                uf: uf,
                city: city,
                address: address,
                cep: cep,
                phone: phone,
                email: email,
                site: site
            });
            try{
                const newSchool = await school.save();
                res.status(200).json(newSchool);
            }
            catch(err){
                res.status(400).json({message: err.message});
            }
        }

        listSchoolByCity = async (req, res) => {
            const {city} = req.body;
            if(city === null){
                return res.status(400).json({message: 'City is required'});
            }
            try{
                const schools = await School.find({city: city});
                res.status(200).json(schools);
            }
            catch(err){
                res.status(500).json({message: err.message});
            }
        }

        listUfs = async (req, res) => {
            try{
                const ufs = await School.find().distinct('uf');
                res.status(200).json(ufs);
            }
            catch(err){
                res.status(500).json({message: err.message});
            }
        }

        listCitiesByUf = async (req, res) => {
            const {uf} = req.body;
            if(uf === null){
                return res.status(400).json({message: 'Uf is required'});
            }
            if(uf.length !== 2){
                return res.status(400).json({message: 'Uf must have 2 characters'});
            }
            try{
                const cities = await School.find({uf: uf}).distinct('city');
                res.status(200).json(cities);
            }
            catch(err){
                res.status(500).json({message: err.message});
            }
        }



}
export default new SchoolController;