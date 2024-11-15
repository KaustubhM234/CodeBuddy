
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const vm = require('vm');
// const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require('./userSchema');
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
dotenv.config();

const PORT = 5000;


//Server
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.json({ success: "Hello World !" });
});

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('MongoDB connection failed');
    }
}

// Set up a route for /homepage
app.get('/homepage', (req, res) => {
    const filePath = path.join(__dirname, 'try', 'index.html');
    res.sendFile(filePath);
});
app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, 'try', 'login.html');
    res.sendFile(filePath);
});
app.get('/contact', (req, res) => {
    const filePath = path.join(__dirname, 'try', 'contact.html');
    res.sendFile(filePath);
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'try')));



// Load questions and answers from JSON file
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

app.post('/ask', (req, res) => {
    const { question } = req.body;
    //   console.log(question);
    let answer = 'I am sorry, I do not understand the question.';

    // Find question in the data
    const entry = data.questions.find(q => q.question.toLowerCase() === question.toLowerCase());
    //   console.log(entry)
    // If question found, retrieve the corresponding answer
    if (entry) {
        answer = entry.answer;
    }

    res.json({ answer });
});

app.post('/signupuser', async (req, res) => {

    const { name, email, password } = req.body;
    console.log(req.body)
    try {
        let user = null;
        user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        user = new User({
            name,
            email,
            password: hashPassword,
        });
        await user.save()
        console.log("saved")
        res.status(200).json({ success: true, message: 'User successfully created' })

    }
    catch (err) {
        console.log("Hii backend");
        res.status(500).json({ success: false, message: 'Internal Server error, Try again' })
    }
});

app.post('/loginuser', async(req,res) =>{
    const {email,password} = req.body

    try {
        console.log("server is hitting",req.body);
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(404).json({message:"User does not exist"});
        }
        const isPasswordMatch = await bcrypt.compare(
            password, 
            user.password
            );
        if(!isPasswordMatch){
            return res.status(400).json({message:"Invalide credentials"});
        }
        res
            .status(200)
            .json({status:true, message:"Successfully loged in"});

    } catch (err) {
        return res.status(500).json({message:"Failed to login"});
    }
});

//OpenAI api config
const config = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

//Chatbot endpoint
app.post("/chatbot", async (req, res) => {
    // const prompt="Write a c code for armstrong number"
    const { prompt } = req.body;
    // console.log(prompt);

    const response = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 2048,
        temperature: 1,
    });
    res.send(response.data.choices[0].text);
    console.log(response.data);

})



app.post("/analysis", async (req, res) => {
    // console.log("server hitting")

    const {code} = req.body
    const prompt = `You will provide analysis of the provided code in C.The reponse should be strictly in the following json format only :{"time_comp": "ans","space_comp":"ans","algo_type":"ans"  } ` + code;
    const response = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 2048,
        temperature: 1,
    });

    const responseData = JSON.parse(response.data.choices[0].text);

    //res.send(response.data.choices[0].text);
    res.send(responseData)
    //console.log(responseData.algo_type);
})



//Compiler code 
app.post("/run", async (req, res) => {
    const { language, code, arguments } = req.body;

    if (language === 'cpp') {
        if (code === "") {
            return res.status(400).json({ success: false, error: "Empty code body!" });
        }
        try {
            const filepath = await generateFile(language, code, arguments);
            const output = await executeCpp(filepath);
            return res.json({ output });
        } catch (err) {
            return res.status(500).json({ error: "Internal server error", details: err });
        }
    } else if (language === 'javascript') {
        try {
            // Execute JavaScript code and capture the output
            const jsOutput = executeJavaScript(code, []);
            console.log(jsOutput);
            // console.log(jsOutput); 
            return res.json({ jsOutput });

        } catch (err) {
            return res.status(500).json({ error: "JavaScript execution error", details: err });
        }
    } else {
        // alert('Please select a language');
        return res.status(400).json({ error: "Unsupported language" });
        // }
    }
    //  else {
    //   return res.status(400).json({ error: "Unsupported language" });
    // }
});


function executeJavaScript(jsCode, args) {
    try {
        // Create a sandbox to execute JavaScript code
        const sandbox = { console, require };
        const context = new vm.createContext(sandbox);

        // Optionally, you can provide additional context variables as needed

        // Execute the JavaScript code
        const script = new vm.Script(jsCode);
        const parser = script.runInContext(context);

        // Capture the output or return value from the executed code
        // Modify this part according to your requirements
        // const capturedOutput = context.capturedOutput;

        // Create an object to store the output
        const outputObject = { output: parser };

        return outputObject;

    } catch (error) {
        throw error;
    }
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

app.post('/api/send-email', (req, res) => {
    const { email, subject, message } = req.body;

    const mailOptions = {
        from: 'kaustubh.h.mhatre@gmail.com', // Sender's email address
        to: 'drraren245@gmail.com', // Admin's email address
        subject: subject,
        text: `Email: ${email}\n\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        }
    });
});

app.listen(PORT, () => {
    connectDB(),
    console.log(`Server listening to port : ${PORT}`);
});