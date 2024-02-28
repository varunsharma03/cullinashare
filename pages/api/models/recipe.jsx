import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    categorie: {
        type: String,
        required: true,
        trim: true
    },
    nationality: {
        type: String,
        required: true,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: {
        type: [String],
    },
    rating: {
        type: Number,
        default: 0
    },
    by:{
        type:String
    },
    url:{
        type:String,
    }
}, {
    timestamps: true
});

const RecipeModel = mongoose.models?.recipes || mongoose.model("recipes", recipeSchema);

export default RecipeModel;
