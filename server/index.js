// we will run the app object in here. - instance of the express.
import app from './app';


app.listen(process.env.PORT || 3300, () => {
    console.log('Running in port', process.env.PORT);
});
