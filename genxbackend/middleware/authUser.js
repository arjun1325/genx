

import Jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
    try {
        // Collect token from cookies
        console.log("Middleware hit");
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "User not authenticated" }); // 401 for unauthorized
        }

        // Decode token
        const decodedToken = Jwt.verify(token, process.env.JWT_secretKey);
        console.log("Token decoded:");

        if (!decodedToken) {
            return res.status(401).json({ message: "Token decoding failed" });
        }

        // Attach user data to request object
        req.user = decodedToken;
        

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Error in authUser middleware:", error.message);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
