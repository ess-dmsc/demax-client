// generated by @ng-toolkit/universal
    const port = 8080;
    
    const server = require('./../server.js');
    
    server.app.listen(port, () => {
        console.log("Listening on: http://localhost:" + port );
    });
    