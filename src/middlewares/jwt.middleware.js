import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {

    //  1. Read The Token
    const token = req.headers["authorization"];

    // 2. If no token return the error
    if(!token){
        return res.status(401).send("unauthorized")
    }

    // 3. Check if Token is valid
    try{
        const payload = jwt.verify(token, "ZrfSDXbpd2Q5eyDtPj5VBUOCpHDHi0Re");
        req.userID = payload.userID;
    }catch(err){
        // 4. return error
        return res.status(401).send('Unauthorized');
    }

    // 5. Call next middleware
    next();

}

export default jwtAuth;