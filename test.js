const alice = {
  apiVersion: 'batch/v1',
  kind: 'Job',
  metadata: {
    generateName: 'free-service-img-'
  },
  spec: {
    backoffLimit: 5,
    template: {
      spec: {
        containers: [
          {name : 'mp3-classify'},
          {image: 'pmahale2/mp3:public'},
          {env: {
            name: ['DATASET'],
            value: 'mnist'
          }},
          {resources: {
            limits: {
              cpu: '0.9'
            }
          }}
        ],
        restartPolicy: 'Never'
      }
    }
  }
  // languages: [
  //   'python',
  //   'haskell',
  //   'c++',
  //   '68k assembly', // Alice is cool like that!
  // ],
};

// Instruct to write the alice object as a YAML file.
export default [
  { value: alice, file: `developers/${alice.apiVersion.toLowerCase()}.yaml` },
];