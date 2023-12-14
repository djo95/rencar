var jwt = require('jsonwebtoken');
const User = require('../Models/User');

exports.isAuth=async(req,res,next)=>{
    try {
        const token = req.header('Authorization')
       
        var decoded = jwt.verify(token, process.env.JWT_KEY);
       console.log(decoded)
        if(!decoded){
            return res.status(400).send({errors : [{msg : 'Invalid token'}]})
        }

        const found = await User.findById(decoded.id)

        req.user = found

        next()
    } catch (error) {
        res.status(500).send({errors : [{msg : "Not auth"}]})
    }
}