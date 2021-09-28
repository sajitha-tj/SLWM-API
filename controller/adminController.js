const Admin = require('../model/adminSchema');
const bcrypt = require("bcrypt");

const register = (req, resp) => {
    Admin.findOne({email:req.body.email}).then(result=>{
        if (result===null){
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                const dto = new Admin({
                    email: req.body.email,
                    password: hash,
                    name: req.body.name,
                    link: req.body.AdminLink,
                    backupId: req.body.backupId
                });

                dto.save().then(response => {
                    resp.status(201).json({status: true, token: 'empty', message: 'success..'});
                }).catch(error => {
                    resp.status(500).json(error);
                })

            });
        }else{
            resp.status(400).json({message:'Already Exists'})
        }
    }).catch(error1=>{
        resp.status(500).json(error1);
    })

}

const login = (req,res)=>{
    Admin.findOne({email:req.headers.email}).then(response=>{
        if (response===null){
            res.status(404).json({message:'Empty Result'});
        }else {
            bcrypt.compare(req.headers.password, response.password, function (err, result){
                if(result){
                    res.status(200).json({status:true, token:'empty', message:'success'});
                }else {
                    res.status(401).json({status:false, message:'UnAuthorized'});
                }
            });
        }
    }).catch(error=>{
        res.status(500).json(error);
    });
}

const changePassword = (req,res)=>{
    Admin.findOne({email:req.headers.email}).then(response=>{
        if (response===null){
            res.status(404).json({message:'Empty Result'});
        }else {
            bcrypt.compare(req.headers.oldpassword, response.password, function (err, result){
                if(result){
                    bcrypt.hash(req.body.newpassword, 10, function(err, hash1) {
                        Admin.updateOne({email:req.headers.email},
                            {
                                $set: {
                                    password: hash1,
                                    name: response.name,
                                    link: response.link,
                                    backupId: response.backupId
                                }
                            }).then(updateResult => {
                            if(updateResult.modifiedCount > 0){
                                res.status(200).json({message:"changed"});
                            }else {
                                res.status(200).json({message:"Try Again"});
                            }
                        }).catch(updateError => {
                            res.status(500).json(updateError);
                        });
                    });
                }else {
                    res.status(401).json({status:false, message:'UnAuthorized'});
                }
            });
        }
    }).catch(error=>{
        res.status(500).json(error);
    });
}

const getAccData =(req,res)=>{
    Admin.findOne({email:req.headers.email},'email name link').then(result => {
        if (result !== null) {
            res.status(200).json({state: true, dataSet: result});
        } else {
            res.status(200).json({state: false});
        }
    }).catch(error => {
        res.status(500).json(error);
    });
}

module.exports={
    register, login, changePassword, getAccData
}