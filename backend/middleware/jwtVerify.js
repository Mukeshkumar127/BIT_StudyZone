import jwt from "jsonwebtoken"

const verifyJWT = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Unauthorized, JWT token is required" });
    }
    const auth = authHeader.split(" ")[1];

    if(!auth){
        return res.status(403)
        .json({message:'Unauthorized ,JWT token is require'});
    }

    try {
        const decoded=jwt.verify(auth,process.env.JWT_SECRET_KEY);

        req.user=decoded;
        next();
    } 
    catch (error) {
        return res.status(403)
            .json({message:'Unauthorized, JWT token wrong or expired'})  
    }
    
}

export {verifyJWT}