const adminMiddleware = (req, res, next) => {

    // User must be logged in
    if (!req.user) {

        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });

    }


    // User must be admin
    if (req.user.role !== "admin") {

        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });

    }


    next();

};


export default adminMiddleware;