import express from 'express';

const app = express();
const PORT = 8999;
console.log("Server starting !")
app.get('/', (req, res) => {
    res.send('Bonjour maxi, je suis cofdsfntant!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
