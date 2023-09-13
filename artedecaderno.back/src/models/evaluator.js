import mongoose from "mongoose";

const EvaluatorSchema = new mongoose.Schema(
    {
        id: {type: String},
        name: {type: String, required: true},
        email: {type: String, required: true},
        cpf: {type: String, required: true},
        draws: [{type: mongoose.Schema.Types.ObjectId, ref: 'draw'}],
        loginId: {type: mongoose.Schema.Types.ObjectId, ref: 'login'},
    }
)

const Evaluator = mongoose.model('evaluator', EvaluatorSchema);
export default Evaluator;