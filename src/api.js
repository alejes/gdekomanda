let api;

if (process.env.NODE_ENV === 'production') {
  api = {
    skills: 'http://40.118.61.147/api/skills',
    participant: 'http://40.118.61.147/api/participant',
    capitan: 'http://40.118.61.147/api/capitan',
    messages: '/mocks/messages.json'
  };
} else {
  api = {
    skills: 'http://40.118.61.147/api/skills',
    participant: 'http://40.118.61.147/api/participant',
    capitan: 'http://40.118.61.147/api/capitan',
    messages: '/mocks/messages.json'
  };
}

export default api
