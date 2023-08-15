import mongoose from "mongoose";

const ProfessorSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        date_of_birth: { type: Date, required: true },
        cpf: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        cep: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        uf: { type: String, required: true },
        schoolId: [{type: mongoose.Schema.Types.ObjectId, ref: 'school', required: true}],
        studentsId: [{type: mongoose.Schema.Types.ObjectId, ref: 'student'}],
        email: { type: String, required: true },
        loginId: {type: mongoose.Schema.Types.ObjectId, ref: 'login'},
        code2factor: {type: String},
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    }
);

const Professor = mongoose.model("professor", ProfessorSchema);
export default Professor;