var express = require('express');
var router = express.Router();
var {connection,mysql} =require('../config/dbSql')
var {dbName,dbUrl,mongodb} =require('../config/dbConfig');
var {userModel,mongoose}=require('../config/dbSchema')

connection.connect()

//mongodb
mongoose.connect(dbUrl);
router.post('/signupm',async(req,res)=>{
   try{
    let users=await userModel.findOne({email:req.body.email})
    if(users){   
    res.send({
    statusCode:400,
    message:"Email Id already Exists",
    
    })
   }else{
   //let hashedPassword =await hashPassword(req.body.password)
   //req.body.password=hashedPassword
   let users=await userModel.create(req.body)
    res.send({
    statusCode:200,
    message:"user added successfully",
    })
   }
   }catch(err){
   console.log(err)
     res.send({
    statusCode:500,
    message:"Internal Server Error"
    
    })
   }
   });

   router.post('/profile/:email',async(req,res)=>{
    try{
      let users=await userModel.findOne({email:req.params.email});
      if(users){
         
         res.send({
          statusCode:200,
          message:"User details fetched successfully",
          users
         })
      }else{
        res.send({
          statusCode:"400",
          message:"User not exist"
        })
      }

    }catch(err){
       res.send({
        statusCode:500,
        message:"Internal  Server Error"
       })
    }
   })

   router.put('/profile/:email',async(req,res)=>{
    try{
     let users=await userModel.findOne({email:req.params.email})
     if(users){
      let pass_update=await userModel.updateOne({email:req.params.email},{$set:{
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        age:req.body.age,
        mobile:req.body.mobile,
    }})
    res.send({
      statusCode:200,
      message:"User Profile Updated Successfully"
    })
       
     }else{
      res.send({
        statusCode:400,
        messag:"user not exists"
      })
     }
     }catch(err){
      console.log(err)
        res.send({
       statusCode:500,
       message:"Internal  Error"
       
       })
      }
    
    });
 
    router.put('/forgotpassm/:email',async(req,res)=>{
      try{
        let users=await userModel.findOne({email:req.params.email})
        if(users){
          if(req.body.password==req.body.confirmPassword){
           let password=await userModel.updateOne({email:req.params.email},{$set:{password:req.body.password}})
            res.send({
              statusCode:200,
              message:"password Updated successfully"
            })
          }else{
            res.send({
              statusCode:200,
              message:"Password mismatch"
            })
          }
        }else{
          res.send({
            statusCode:400,
            message:"User not exist"
          })
        }

      }catch(err){
        res.send({
          statusCode:500,
          message:"Internal Server Error"
        })
      }
    })
   
//Sql
router.post('/signup',async(req,res)=>{
  try{
  const firstname=req.body.firstname;
  const lastname=req.body.lastname;
  const email=req.body.email;
  const age=req.body.age;
  const mobile=req.body.mobile;
  const password=req.body.password;
  let query =await connection.query("INSERT INTO manageusers.users(FIRSTNAME,LASTNAME,EMAIL,AGE,MOBILE,USERPASSWORD) VALUES(?,?,?,?,?,?)",[firstname,lastname,email,age,mobile,password],(err,result)=>{
    if(err) throw err;
    
     //res.send(results);
     res.send({
       statusCode:200,
       message:"user added succesfully",
      
     })
   })
 }catch(err){
   console.log(err)
     res.send({
    statusCode:500,
    message:"Internal  Error"
    
    })
   }
   })

   router.post('/signin',async(req,res)=>{
    try{
    const email=req.body.email;
    const password=req.body.password;
    let query =await connection.query("select * from manageusers.users where email=? and userpassword=?",[email,password],(err,result)=>{
      if(err){
        res.send({
          err:err
        })}
    
        if(result){
        res.send({
         statusCode:200,
         message:"user logged in succesfully",
        result
       })
      }else{
        res.send({
          statusCode:400,
          message:"Incorrect credentials",
         result
        })
      }
      
     })
   }catch(err){
     console.log(err)
       res.send({
      statusCode:500,
      message:"Internal  Error"
      
      })
     }
     })


module.exports = router;
