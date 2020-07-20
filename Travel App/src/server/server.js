const app = require('./app')

// Setup Server
const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server start listening on port ${PORT}`);
});