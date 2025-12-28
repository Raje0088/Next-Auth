import {jwtVerify,SignJWT} from 'jose';

let secretKey = "abcde"

export async function signToken(payload) {
    return await new SignJWT(payload).setProtectedHeader({alg:"HS256"}).setExpirationTime('1h').sign(   secretKey)
}

export async function verifyToken(token){
    try{
        const {payload} = await jwtVerify(token,secretKey)
    }catch(err){
        return null;
    }
}