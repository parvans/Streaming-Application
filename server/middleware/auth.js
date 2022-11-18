import jwt from 'jsonwebtoken'

const auth=async(req, res, next)=>{
    const token=req.headers.token

    if(!token){
        return res.status(401).send('Access Denide no token provide')
    }
    else{

        try {
            const data=jwt.verify(token,process.env.JWTKEY);
        req.user=data;
        next();
        } catch (error) {
            res.send("invalid token")
        }
    }
}

export default auth;