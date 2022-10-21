const mongoose=require('mongoose')
 const validator=require('validator')
//creating a schema with columns
    var userSchema=new mongoose.Schema({
    firstname: {type:'string',required:true},
    lastname: {type:'string',required:true},
    email: {type:'string',          
            required:true,
            lowercase:true,
            validate:(value)=>{
            return validator.isEmail(value)
            }
            },
     age:{type:'number'},
     mobile: {type:'string',default:"000-000-0000"},
     password:{type:'string',required:true}
     })
    
     let userModel=mongoose.model('userInfo',userSchema)
  module.exports={userModel,mongoose}