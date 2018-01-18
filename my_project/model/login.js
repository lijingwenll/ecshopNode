var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserObj = new Schema({
    username     : String,
    psw          : String,
    create_date  : {type: Date, default: Date.now},
});

var MyUserObj = mongoose.model('data', UserObj); 

module.exports = MyUserObj;