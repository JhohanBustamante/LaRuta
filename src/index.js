const app = require('./app');

app.listen(app.get('port'), () => {
    console.log("Funcionando, desde el puerto ", app.get("port"));
});