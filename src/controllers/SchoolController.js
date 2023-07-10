import School from "../models/school.js";

class SchoolController {
    
        listSchool = async (req, res, next) => {
            try{
                const schools = await School.find();
                res.status(200).json(schools);
            }
            catch(err){
                next(err);
            }
        }
    
        insertSchool = async (req, res, next) => {
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
                next(err);
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
                next(err);
            }
        }

        listUfs = async (req, res, next) => {
            try{
                const ufs = await School.find().distinct('uf');
                res.status(200).json(ufs);
            }
            catch(err){
                next(err);
            }
        }

        listCitiesByUf = async (req, res, next) => {
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
                next(err);
            }
        }

        


}
export default new SchoolController;