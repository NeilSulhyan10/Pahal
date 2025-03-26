const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    menu : {type : Array, required : true},
    price : {type : Array, required : true},
    location : {type : String, required : true},

})

const Restaurant = mongoose.model("Restaurant",restaurantSchema)
module.exports = Restaurant