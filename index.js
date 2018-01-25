const express = require('express'),
    bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var idc=1;

var astronauts = [{id: 0, name: "John", surname: "Smith", iSpace: true}];

// restiruisco tutti gli astronauti
app.get('/astronauts', function(req, res) {
    res.status('200');
	res.json(astronauts);
});

// inserire astronauta passato in post

app.post('/astronauts', function(req, res)  {
    const  item = req.body;
    item.id = idc;
    astronauts.push(item);
    idc++;
    res.status('200');
    res.json(item);
    

});

// restituire l'astronauta richiesto del id
app.get('/astronauts/:id', function(req, res) {
    var id = req.params.id;
    var t=0;
    for (var i=0; i< astronauts.length; i++)
    {
        if(astronauts[i].id == id){
            res.json(astronauts[i]);
            t=1;
            break;
        } 
    }
    if(t == 0) {
        res.json('non trovato');
    }
    

});
// modifico l'astronauto del parametro id col json che passo col body
app.put('/astronauts/:id', function(req, res) {
    var id = req.params.id;
    var modif = req.body;
    var t=0;
    for (var i=0; i< astronauts.length; i++)
    {
        if(astronauts[i].id == id){
            
            astronauts[i].name = modif.name;
            astronauts[i].surname = modif.surname;
            astronauts[i].iSpace = modif.iSpace;
            res.status('200');
            res.json('utente modificato : '+astronauts[i]);

            t=1;
            break;
        } 
    }
    if(t ==0){
        res.status('404');
        res.json('non trovato nessuno da modificare');
    }
    
    

});








app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app

