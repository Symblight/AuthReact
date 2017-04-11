import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const Schema = mongoose.Schema;

var SchemaUser = new Schema({
    firstname: {type: String, unique: true,required: true},
    password:{type: String, required: true},
    email: {type: String, unique: true,required: true},
},{collection:'users'});

SchemaUser.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

SchemaUser.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);  
};

mongoose.model('user', SchemaUser);