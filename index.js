const express = require('express');
const app = express();
const morgan = require('morgan');
const client = require('prom-client');

const register = new client.Registry();

register.setDefaultLabels({
  app: 'node-app',
});

const healthApiCounter = new client.Counter({
  name: 'health_api_counter',
  help: 'Total number of requests',
});

const successFullRequestCounter = new client.Counter({
  name: 'success_full_request_counter',
  help: 'Total number of success full requests',
});

register.registerMetric(healthApiCounter);
register.registerMetric(successFullRequestCounter);

client.collectDefaultMetrics({ register });

app.get('/metrics', async (req, res) => {
  res.set('Content-type', register.contentType);
  res.end(await register.metrics());
});

app.get('/health', (req, res) => {
  res.send('OK');
  counter.inc();
});

app.use(express.json());
app.use(morgan('common'));

app.get('/', (req, res) => {
  healthApiCounter.inc();
  res.send('Hello World');
  Math.random() > 0.5 ? successFullRequestCounter.inc() : null;

});

app.listen(4000, () => console.log('Server started on port 3000'));
