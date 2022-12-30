const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    contraseña: {
        type: String,
        require: true
    },
    pokemones:{
        type: [String],
        require: true
    }
});

module.exports = mongoose.model("User", userSchema);