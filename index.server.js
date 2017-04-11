import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import webpackConfig from './webpack.config.js'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongodb'
import routers from './server/routers/auth'
import api from './server/routers/api'
import flash from 'connect-flash'
import './server/config/passport'

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping? 3000 : process.env.PORT 
const app = express();
const compiler= webpack(webpackConfig);

mongoose.connect(`mongodb://localhost:27017/dbuser`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({
    secret: "Ilovecooffee",
    store: new MongoStore({
        url: 'mongodb://User31:q1w2e3@localhost:27017/dbuser'
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(webpackDevMiddleware(compiler,{
    stats:{
        colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
}));
app.use(webpackHotMiddleware(compiler));
app.use(flash());

app.use('/', routers);
app.use('/api', api);
app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, ()=>{
    console.log(`server is up on port: ${port}`)
})