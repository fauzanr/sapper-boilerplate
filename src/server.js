import sirv from 'sirv';
import express from 'express';
import session from 'express-session';
import compression from 'compression';
import * as sapper from '@sapper/server';

import api from './api/index'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express()

app.use(session({
  name: 'app',
  secret: 'rahasia_',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    sameSite: true,
    secure: NODE_ENV === 'production'
  }
}));

app.use('/api', api)

app.use(
	sapper.middleware({
		session: (req, res) => ({
			authenticated: req.session.authenticated
		})
	})
);

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
);

app.listen(PORT, err => {
		if (err) console.log('error', err);
	});
