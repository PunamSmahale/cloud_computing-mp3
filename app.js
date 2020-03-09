const express = require('express');
const bodyParser = require('body-parser');
const k8s = require('@kubernetes/client-node');
const yaml = require('js-yaml');
const fs   = require('fs');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const coreApi = kc.makeApiClient(k8s.CoreV1Api);




const k8sApi = kc.makeApiClient(k8s.BatchV1Api);

// Create a new instance of express
const app = express();
let database = [];


app.use(bodyParser.json()); // support json encoded bodies
// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  coreApi.listPodForAllNamespaces()
    .then((result) => {
  console.log('Wonder Woman!!');
  const allPods = result.body.items.map(x => {
        console.log("**********************************************");
        console.log("name " + x.metadata.name);
        console.log("namespace " + x.metadata.namespace);
        console.log("ip " + x.status.podIP);
        console.log("node " + x.status.hostIP);
        console.log("status " + x.status.phase);
        return {
          node: x.status.hostIP,
          ip: x.status.podIP,
          namespace: x.metadata.namespace,
          name: x.metadata.name,
          status: x.status.phase
        }
    });
    const response = { pods : allPods }
    res.send(response);
    })
    .catch((err) => {
        console.log(err);
    });
});


app.post('/img-classification/free', function (req, res) {
  var namespace = 'free-service';
  var job = yaml.safeLoad(fs.readFileSync('free-service.yaml', 'utf8'));

  k8sApi.createNamespacedJob(namespace, job).then(
      (response) => {
          console.log("Success creating Job in namespace " + namespace);
          console.log(response.body);
          res.sendStatus(200);
      },
      (err) => {
          console.log("Error creating Job in namespace " + namespace);
          console.log(err);
          res.sendStatus(500);
          process.exit(1);
      },
  );
});

app.post('/img-classification/premium', function (req, res) {
  var namespace = 'default';
  var job = yaml.safeLoad(fs.readFileSync('premium-service.yaml', 'utf8'));

  k8sApi.createNamespacedJob(namespace, job).then(
      (response) => {
          console.log("Success creating Job in namespace " + namespace);
          console.log(response.body);
          res.sendStatus(200);
      },
      (err) => {
          console.log("Error creating Job in namespace " + namespace);
          console.log(err);
          res.sendStatus(500);
          process.exit(1);
      },
  );
});

// Tell our app to listen on port 3000
app.listen(3000, function (err) {
  if (err) {
    throw err
  }
  console.log('Server started on port 3000')
});