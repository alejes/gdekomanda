let api;

if (process.env.NODE_ENV === 'production') {
  api = {
    skills: '/api/skills'
  };
} else {
  api = {
    skills: '/mocks/skills.json'
  };
}

export default api
