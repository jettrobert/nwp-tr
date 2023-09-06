const GhostContentAPI = require('@tryghost/content-api');

const api = new GhostContentAPI({
  url: 'https://new-world-person.ghost.io',
  key: '5f5af69c17c4d313d982e0f3c0',
  version: 'v3'
});

export default api;
