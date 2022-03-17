const express = require('express');
const router = express.Router();
const mysql  = require("mysql");

// connection à la base de donnée
const db = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "",
    database : "dbGestion"
});

//recuperation des donnée depuis l'interface et insertion
router.post( "/api/insert", ( req, res) => {
    let entre = req.body.entre;
    let motif = req.body.motif;
    let dateEntree =  req.body.date;
    console.log(entre);
    let sql = "insert into entre (somme, motif, dateEntre) values (?, ?, ?) ";

    db.query( sql, [entre, motif, dateEntree], ( err, result ) => {
        if (err) {
            console.log(err); 
        } else {
            console.log(result);
        }
    })
})

router.post( "/api/insertDepense", ( req, res) => {
    let depenses = req.body.depense;
    let motifDepens = req.body.motifDepense;
    let date = req.body.dateDpense;
    
    let sql = "insert into depense ( sommeDepense, motif, dateDepense ) values (?, ?, ?) ";

    db.query( sql, [ depenses, motifDepens, date ], ( err, result ) => {
        if (err) {
            console.log( err );
        } else {
            console.log(result);
            res.send( result );

        }
    })
})

//recuperation des donnée depuis la base de donnée 
//et envoi dans l'interface
router.get("/api/request", (req, res) => {
    let sql = "select sum( somme ) as somme, sum( sommeDepense ) as somme2 from entree, depense";

    db.query( sql, (err,result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

module.exports = router;