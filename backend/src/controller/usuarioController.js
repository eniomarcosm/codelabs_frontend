// const { validate } = require("../validateData/validateUsuario");
const con = require("../services/database");
const bcrypt = require("bcrypt");

exports.getAll = (req, resp) => {
    let paramiters = [];
    const sql = "SELECT * FROM usuario";
    con.query(sql, paramiters, (err, res) => {
        if (err) return resp.status(500).send(err);
        return resp.status(200).send(res);
    });
};

exports.getById = (req, resp, next) => {
    if (req.params.id == 0) return next(resp.status(404).send({msg: 'Id nao pode ser 0'}))
    let paramiters = [req.params.id];
    const sql = "SELECT * FROM usuario WHERE id = ?";
    con.query(sql, paramiters, (err, res) => {
        if (err) return resp.status(500).send(err);
        return resp.status(200).send(res);
    });
};

exports.save = async (req, resp) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.senha, salt);
    let paramiters = [
        req.body.email,
        password,
        req.body.tipo,
        req.body.nome,
    ];

    const sql = "INSERT INTO usuario(email, senha, tipo, nome) values(?,?,?,?)";
    con.query(sql, paramiters, (err, res) => {
        if (err) return resp.status(500).send({error: err});
        return resp.status(200).send({id: res?.insertId});
    });
};

// exports.update = async (req, resp) => {
//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(req.body.senha, salt);
//     let paramiters = [
//         req.body.email_inst,
//         password,
//         req.body.role_id,
//         req.body.updatedBy,
//         req.params.id,
//     ];

//     const sql = "UPDATE usuario SET email_inst = ?, senha = ?, role_id = ?, updatedBy = ? WHERE idusuario = ?";
//     con.query(sql, paramiters, (err, res) => {
//         if (err) resp.status(500).send({err: err});
//         return resp.status(200).send(res);
//     });
// };

// exports.delete = (req, resp, next) => {
//     if (req.params.id == 0) return next(resp.status(404).send({msg: 'Id nao pode ser 0'}))
//     const paramiters = [req.params.id];
//     const sql = "UPDATE usuario SET isDeleted = 1 WHERE idusuario = ?";
//     con.query(sql, paramiters, (err, res) => {
//         if (err) resp.status(500).send(err);
//         return resp.status(200).send(res);
//     });
// };
// exports.addUserEstudante = (req, resp) => {
//     let params = [req.body.idusuario, req.body.idestudante]
//     con.query("insert into usuario ( email, nome, tipo, ) values (?,?)", params, (err, res) => {
//         if (err) return resp.status(500).send({status: "500", msg: "Server error"});
//         return resp.status(200).send({msg: "success", id: res.insertId});
//     })
// }

// exports.addUserFuncionario = (req, resp) => {
//     let params = [req.body.idusuario, req.body.idfuncionario]
//     // console.log(params)
//     con.query("insert into usuario_funcionario(idusuario, idfuncionario) values (?,?)", params, (err, res) => {
//         if (err) return resp.status(500).send({status: "500", msg: "Server error"});
//         return resp.status(200).send({msg: "success"});
//     })
// }
// //usuario funcionario dados
// exports.getFuncionarioByIdUserAndRole = (req, resp, next) => {
//     if (req.params.id == 0) return next(resp.status(404).send({msg: 'Id nao pode ser 0'}))
//     const sql = " SELECT u.idusuario as id, u.role_id, fu.*, fu.contato1, fu.email,uf.*, r.*\n" +
//         "        FROM usuario u, funcionario fu, usuario_funcionario uf, roles r where u.role_id=r.idroles\n" +
//         "        and u.idusuario=uf.idusuario and uf.idfuncionario=fu.idfuncionario and u.isDeleted=0 and u.idusuario=?";
//     con.query(sql, req.params.id, (err, res) => {
//         if (err) return resp.status(500).send(err);
//         return resp.status(200).send(res);
//     });
// }

// //listar os dados do estudante atraves do seu id de usuario
// exports.getStudentByIdUserAndRole = (req, resp, next) => {
//     // let param = [req.body.idusuario]
//     if (req.params.id < 0) return next(resp.status(404).send({msg: "Paramentro obrigatorio"}))
//     con.query(
//         "select u.*, ue.*, r.*, e.* from usuario u\n" +
//         "inner join usuario_estudante ue on u.idusuario=ue.idusuario \n" +
//         "join roles r on u.role_id=r.idroles \n" +
//         "join  estudante e on ue.idestudante=e.idestudante where u.role_id=5 and u.idusuario=?", req.params.id,
//         (err, res) => {
//             if (err) return resp.status(404).send({msg: "data not found",});
//             return resp.status(200).send(res);
//         }
//     );
// };