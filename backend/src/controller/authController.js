const bcrypt = require("bcrypt");
// const { validate } = require("../validateData/validateAuth");
const con = require("../services/database");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.authUser = async (req, resp) => {
    console.log(req.body);
    let paramiters = [req.body.email];
    try {
        let user = (callback) =>
            con.query(
                "Select * from usuario where email=?",
                paramiters,
                (err, res) => {
                    if (err) return resp.status(500).send({error: err});
                    return callback(res);
                }
            );

        user (function (res) {
            if (res.length > 0) {
                bcrypt.compare(req.body.senha, res[0].senha, function (err, result) {
                    if (result) {
                        resp.status(200).send({
                            token: exports.generateAuthToken(res[0]),
                        });
                    } else {
                        resp.status(400).send({
                            error: "Senha ou Email incorretos",
                        });
                    }
                });
            } else {
                resp.status(400).send({
                    error: "Senha ou Email incorreto",
                });
            }
        });
    } catch (err) {
        resp.status(500).send({
            error: err,
        });
    }
    /*}
})
*/
};
exports.verifyToken = (req, resp, next) => {
    //get header
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined0') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        //set token
        req.token = bearerToken
        next()
    } else {
        //FOrbidden
        return next(resp.status(403).send({msg: "Nao tens autorizacao para aceder"}))
    }
}

exports.generateAuthToken = function (user) {
    const token = jwt.sign(
        {
            id: user.id,
            tipo: user.tipo,
            email: user.email,
            nome: user.nome,
        },
        config.get("jwtPrivateKey"), {'expiresIn':'15m'}
    );
    return token;
};