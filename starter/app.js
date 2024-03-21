const express=require("express");
const app=express();

//SECUIRTY PAACKAGES
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


//swagger ui
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


const PORT=process.env.PORT||3500;
app.set('trust-proxy',1);
app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );
app.use(express.json());

app.use(helmet());
app.use(cors());
app.use(xss());


require("./db/connection");
const authenticateuser=require("./midleware/authentication")
const authRouter=require("./routes/auth")
const jobsRouter=require("./routes/jobs")
// const register=require("./controller/auth")
// const login=require("./controller/jobs")

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateuser,jobsRouter);

app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(PORT,console.log(`server is listening on port${PORT}`))