const checkAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ message: 'Usuario no autenticado' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).send({ message: 'Acceso denegado. Solo administradores.' });
    }

    next();
};

export default checkAdminRole;
