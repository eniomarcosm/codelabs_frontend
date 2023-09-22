
// const { validate } = require("../validateData/validateUsuario");
const con = require("../services/database");

exports.save = async (req, resp) => {
    let paramiters = [
        req.body.label,
        req.body.origem,
        req.body.data_chegada,
        req.body.transportador,
        req.body.qrcoderef
        
    ];

    const sql = "INSERT INTO contentor(label, origem, data_chegada, transportador, qrcoderef) values(?,?,?,?,?)";
    con.query(sql, paramiters, (err, res) => {
        if (err) return resp.status(500).send({error: err});
        return resp.status(200).send({id: res?.insertId});
    });
};


exports.getById = (req, resp, next) => {
    if (req.params.id == 0) return next(resp.status(404).send({msg: 'Id nao pode ser 0'}))
    let paramiters = [req.params.id];
    const sql = "SELECT * FROM contentor WHERE id = ?";
    con.query(sql, paramiters, (err, res) => {
        if (err) return resp.status(500).send(err);
        return resp.status(200).send(res);
    });

};


exports.getAll = (req, resp) => {
    let paramiters = [];
    const sql = "SELECT * FROM contentor";
    con.query(sql, paramiters, (err, res) => {
        if (err) return resp.status(500).send(err);
        return resp.status(200).send(res);
    });
};
