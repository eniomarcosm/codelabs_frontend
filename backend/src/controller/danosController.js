
// const { validate } = require("../validateData/validateUsuario");
const con = require("../services/database");

exports.save = async (req, resp) => {
    let paramiters = [
        req.body.descricao,
        req.body.idEstado,
        req.body.idTipoDano,
        req.body.idRegistrador,
        req.body.idContentor
        
    ];

    const sql = "INSERT INTO dano(descricao, idEstado, idTipoDano, idRegistrador, idContentor) values(?,?,?,?,?)";
    con.query(sql, paramiters, (err, res) => {
        if (err) return resp.status(500).send({error: err});
        return resp.status(200).send({id: res?.insertId});
    });
};


exports.getById = (req, resp, next) => {
    if (req.params.id == 0) return next(resp.status(404).send({msg: 'Id nao pode ser 0'}))
    let paramiters = [req.params.id];
    const sql = "SELECT * FROM dano WHERE id = ?";
    con.query(sql, paramiters, (err, res) => {
        if (err) return resp.status(500).send(err);
        return resp.status(200).send(res);
    });

};


exports.getAll = (req, resp) => {
    let paramiters = [];
    const sql = "SELECT * FROM dano";
    con.query(sql, paramiters, (err, res) => {
        if (err) return resp.status(500).send(err);
        return resp.status(200).send(res);
    });
};

exports.update = async (req, resp) => {
    let paramiters = [
        req.body.descricao,
        req.body.momento,
        req.body.idTipoDano,
        req.body.idContentor,
        req.params.id,
    ];

    const sql = "UPDATE dano SET descricao = ?, momento = ?, idTipoDano = ?, idContentor = ? WHERE id = ?";
    con.query(sql, paramiters, (err, res) => {
        if (err) resp.status(500).send({err: err});
        return resp.status(200).send(res);
    });
};