

import Jwt from "jsonwebtoken";

export const authAdmin = (req, res, next) => {
    try {
        // Collect token from cookies
        console.log("Middleware hit");
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "admin not authenticated" }); 
        }
        
        // Decode token

       
            
            const decodedToken = Jwt.verify(token, process.env.JWT_secretKey);
            console.log(decodedToken,"Token decoded:");
            
            if (!decodedToken) {
                return res.status(401).json({ message: "Token decoding failed" });
            };
            if(decodedToken.role !=="admin" && decodedToken.role !=="seller"){
                
                return res.status(401).json({ message: "Access denied" }); 
            }
            
            
            // Attach admin data to request object
            
            req.admin = decodedToken;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Error in authUser middleware:", error.message);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
