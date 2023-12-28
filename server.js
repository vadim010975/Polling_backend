const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const getUnreadMesages = require('./getUnreadMesages');
const Router = require('koa-router');

const app = new Koa;

const router = new Router();

app.use(koaBody({
  urlencoded: true,
}));

app.use((ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*' };

  if (ctx.request.method !== 'OPTIONS') {
    console.log('not OPTIONS');
    ctx.response.set({ ...headers });
    try {
      return next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }
  
  if (ctx.request.get('Access-Control-Request-Headers')) {
    ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
  }
  ctx.response = 204;
});

router.get('/messages/unread', async (ctx, next) => {
  ctx.response.body = getUnreadMesages();
});

app.use(router.routes()).use(router.allowedMethods());

const port = 7070;

const server = http.createServer(app.callback());

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server is listening to ' + port);
});
