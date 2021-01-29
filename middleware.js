const ExpressError = require('./utils/ExpressError');
const spawn = require('child_process').spawn;

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must login first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.processFile = (req, res, next) => {
    if (req.file) {
        const destination = req.file.destination;
        const filename = req.file.filename;

        const pythonProcess = spawn('python', ['./chunks.py', destination, filename]);

        pythonProcess.stdout.on('data', (data) => {
            myjson = JSON.parse(data);
            console.log(myjson);
        })

        pythonProcess.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        })
    }
    next();
}