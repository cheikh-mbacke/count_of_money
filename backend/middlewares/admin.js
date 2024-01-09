const adminMiddleware = (req, res, next) => {
    const isAdmin = req.body.roleName === 'admin';
    if (isAdmin) {
        next();
    } else {
        res.status(403).send('Accès refusé');
    }
};
module.exports = adminMiddleware;
