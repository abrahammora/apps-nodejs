const { Router } = require('express');
const route = Router();

const mysqlConnection = require('../database');

// GET ALL
route.get('/',(req,res) => {
    mysqlConnection.query('SELECT * FROM employees', (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.error(err);
        }
    });
});

// GET BY ID
route.get('/:id',(req,res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM employees where id = ?',[id], (err,rows,fields) => {
        if(!err){
            if(rows.length > 0)
                res.json(rows[0]);
            else
                res.json({Status:"We cannot find that id"});

        }else{
            console.error(err);
        }
    });
});

// ADD DATA
route.post('/',(req,res) => {
    const { id, name, salary} = req.body;
    const query = `        
        CALL employeeAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, salary], (err,rows,fields) => {
        if(!err){
            res.json({Status: 'Employee Saved'});
        }else{
            console.error(err);
        }
    });
});

//  UPDATE DATA
route.put('/:id', (req,res) => {
    const { name ,salary } = req.body;
    const { id } = req.params;
    const query = 'CALL employeeAddOrEdit(?, ? ,?)';
    mysqlConnection.query(query, [id, name ,salary], (err,rows,fields) => {
        if(!err){
            res.json({Status: 'Employee Updated'});
        }else{
            console.error(err);
        }
    });
});

route.delete('/:id', (req,res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (err,rows,fields) =>{
        if(!err){
            res.json({Status: 'Employee Deleted'});
        }
        else{
            console.error(err);
        }
    });
});
module.exports = route;