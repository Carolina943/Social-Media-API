const dotenv = require('dotenv');
dotenv.config();
require('express-async-errors');

//Express
const express = require('express');
const app = express();

//rest of package
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

//database
const connectDB = require('./db/connect');

//routes
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const profileRouter = require('./routes/profileRoutes');
const followRouter = require('./routes/followRoutes');
const postRouter = require('./routes/postRoutes');
const replyRouter = require('./routes/replyRoutes');


//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(morgan('tiny'));

app.set('trust proxy', 1);
app.use(
   rateLimiter({
     windowMs: 15*60*1000,
     max: 60,
   })
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));
app.use(fileUpload());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/follow', followRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/reply', replyRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//PORT
const port = process.env.PORT

const start = async() =>{
  try{
    await connectDB()
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  }catch(error){
    console.log(error)
  }
}

start()