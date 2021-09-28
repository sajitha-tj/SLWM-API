const User = require("../model/UserSchema");

const saveUser = (req,res) => {
    const user = new User({
        userId: req.body.userId,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userLocation: req.body.userLocation,
        userBio: req.body.userBio,
        userSkills: req.body.userSkills,
        userLinks: req.body.userLinks
    });

    user.save().then(result => {
        res.status(200).json({state:true, "message":"Saved"});
    }).catch(error => {
        res.status(500).json(error);
    });
}

const updateUser = (req,res) => {
    User.updateOne(
        {userId: req.body.userId},
        {
            $set: {
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                userLocation: req.body.userLocation,
                userBio: req.body.userBio,
                userSkills: req.body.userSkills,
                userLinks: req.body.userLinks
            }
        }
    ).then(updateResult => {
        if(updateResult.modifiedCount > 0){
            res.status(200).json({message:"updated"});
        }else {
            res.status(200).json({message:"Try Again"});
        }
    }).catch(updateError => {
        res.status(500).json(updateError);
    });
}

const deleteUser = (req,res) => {
    User.deleteOne({userId: req.headers.id}).then(deleteResponse => {
        if(deleteResponse.deletedCount > 0){
            res.status(200).json({message:"Deleted"});
        }else {
            res.status(200).json({message: 'Try Again'});
        }
    }).catch(error => {
        res.status(500).json(error)
    })
}

const getUser = (req,res) => {
    User.findOne({userId: req.headers.id}).then(result => {
        if (result !== null) {
            res.status(200).json({state: true, dataSet: result});
        } else {
            res.status(200).json({state: false});
        }
    }).catch(error => {
        res.status(500).json(error);
    });
}

const getAllUsers = (req,res) => {
    User.find().then(result => {
        res.status(200).json({dataSet: result});
    }).catch(error => {
        res.status(500).json(error);
    });
}

module.exports = {
    saveUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUsers
}