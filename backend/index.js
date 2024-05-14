//require("dotenv").config();
import 'dotenv/config';
import cors from 'cors';
import axios from 'axios';
import queryString from 'query-string';
import jwt from 'jsonwebtoken';
import express from "express";
import multer from "multer";
import cookieParser from  "cookie-parser";

const PORT = process.env.PORT || 8000

const config = {
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
	tokenUrl: 'https://oauth2.googleapis.com/token',
	redirectUrl: process.env.REDIRECT_URL,
	clientUrl: process.env.CLIENT_URL,
	tokenSecret: process.env.TOKEN_SECRET,
	tokenExpiration: 36000,
	postUrl: 'https://jsonplaceholder.typicode.com/posts',
}

const authParams = queryString.stringify({
	client_id: config.clientId,
	redirect_uri: config.redirectUrl,
	response_type: 'code',
	scope: 'openid profile email',
	access_type: 'offline',
	state: 'standard_oauth',
	prompt: 'consent',
});

const getTokenParams = (code) => 
	queryString.stringify({
		client_id: config.clientId,
		client_secret: config.clientSecret,
		code,
		grant_type: 'authorization_code',
		redirect_uri: config.redirectUrl,
	})

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
	origin: [config.clientUrl],
	credentials: true,
}));


app.use(multer().none());
const auth = (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) return res.status(401).json({message: 'Unauthorized' });
		jwt.verify(token, config.tokenSecret)
		return next()
	} catch (err) {
		console.error('Error: ', err);
		res.status(401).json({ message: 'Unauthorized' })
	}
}
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Server-side error!");
})

app.get('/auth/url', (_, res) => {
	res.json({
		url: `${config.authUrl}?${authParams}`,
	})
})
app.get('/auth/token', async (req, res) => {
	const { code } = req.query
	if (!code) return res.status(400).json({ message: 'Authorization code must be provided' })
	try {
		// Get all parameters needed to hit authorization server
		const tokenParam = getTokenParams(code)
		// Exchange authorization code for access token (id token is returned here too)
		const {
			data: { id_token },
		} = await axios.post(`${config.tokenUrl}?${tokenParam}`)
		if (!id_token) return res.status(400).json({ message: 'Auth error' })
		// Get user info from id token
		const { email, name, picture } = jwt.decode(id_token)
		const user = { name, email, picture }
		// Sign a new token
		const token = jwt.sign({ user }, config.tokenSecret, { expiresIn: config.tokenExpiration })
		// Set cookies for user
		res.cookie('token', token, { maxAge: config.tokenExpiration, httpOnly: true })
		// You can choose to store user in a DB instead
		res.json({
			user,
		})
	} catch (err) {
		console.error('Error: ', err)
		res.status(500).json({ message: err.message || 'Server error' })
	}
})

app.get('/auth/logged_in', (req, res) => {
	try {
		// Get token from cookie
		const token = req.cookies.token
		if (!token) return res.json({ loggedIn: false })
		const { user } = jwt.verify(token, config.tokenSecret)
		const newToken = jwt.sign({ user }, config.tokenSecret, { expiresIn: config.tokenExpiration })
		// Reset token in cookie
		res.cookie('token', newToken, { maxAge: config.tokenExpiration, httpOnly: true })
		res.json({ loggedIn: true, user })
	} catch (err) {
		res.json({ loggedIn: false })
	}
})

app.post('/auth/logout', (req, res) => {
	// clear cookie
	res.clearCookie('token').json({ message: 'Logged out' });
});

app.get('/user/posts', auth, async (_, res) => {
	try {
		const { data } = await axios.get(config.postUrl)
		res.json({ posts: data?.slice(0, 5) })
	} catch (err) {
		console.error('Error: ', err)
	}
})

app.get("/api/ai/test", async (req, res) => {
	let message = req.body.message;
	if (!message) {
		message = "hello, Gemini. Describe your self"
	}

	const {
		GoogleGenerativeAI,
		HarmCategory,
		HarmBlockThreshold,
	} = require("@google/generative-ai");

	const MODEL_NAME = "gemini-1.0-pro-001";
	const API_KEY = "AIzaSyCLQyY4qFOSDcBPNoEv3J1AN3lTkUhIeUY";

	async function runChat() {
		const genAI = new GoogleGenerativeAI(API_KEY);
		const model = genAI.getGenerativeModel({ model: MODEL_NAME });

		const generationConfig = {
			temperature: 0.9,
			topK: 1,
			topP: 1,
			maxOutputTokens: 2048,
		};

		const safetySettings = [
			{
				category: HarmCategory.HARM_CATEGORY_HARASSMENT,
				threshold: HarmBlockThreshold.BLOCK_NONE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
				threshold: HarmBlockThreshold.BLOCK_NONE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
				threshold: HarmBlockThreshold.BLOCK_NONE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
				threshold: HarmBlockThreshold.BLOCK_NONE,
			},
		];

		const chat = model.startChat({
			generationConfig,
			safetySettings,
			history: [
			],
		});

		const result = await chat.sendMessage(message);
		const response = result.response;
		console.log(response.text());
		return res.type('text/plain').send(response.text());
	}

	runChat();

});

app.listen(PORT, ()=> console.log('Server listening on port 8000!'));
