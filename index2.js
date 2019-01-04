const winston = require('winston');
const octokit = require('@octokit/rest')();


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'user-service'},
  transports: []
});




const request = require('request');

request({
    method: 'post',
    body: {
        query: `

query { 
  user(login: "Jacke") { 
    repositories(last:100) {
        edges {
        node {
          name,
          languages(last: 100) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
}`,
        variables: {
            name: "linux",
            owner: "torvalds"
        }
    },
    json: true,
    url: 'https://api.github.com/graphql',
    headers: {
        Authorization: 'Bearer d2e5891d336d14ae8215252052c616d19e6009e8',
        'User-Agent': 'My Application'
    }
}, function(error, response, body) {
    if (error) {
        console.error(error);
        throw error;
    }
    console.log(JSON.stringify(body, null, 2));
});


// Compare: https://developer.github.com/v3/repos/#list-organization-repositories
octokit.repos.listForOrg({
  org: 'octokit',
  type: 'public'


}).then(({ data, headers, status }) => {
//  console.log(data, headers, status);
});


octokit.paginate('GET /users/:username/repos', { username: 'Jacke' })
  .then(issues => {
  console.log(JSON.stringify(issues.map((a) => a.full_name), null, 4));
}).catch(error => {
  console.log('error', error);
});
