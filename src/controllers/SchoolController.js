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
            const {name, code, state, city, address, cep, phone, email, site} = req.body;
            if(name === null || code === null || state === null || city === null || address === null || cep === null || phone === null){
                return res.status(400).json({message: 'All fields are required'});
            }
            const school = new School({
                name: name,
                code: code,
                state: state,
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

}
export default new SchoolController;