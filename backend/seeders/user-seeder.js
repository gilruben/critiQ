const User = require('../models').User;

User.sync({ force: true })
.then(() => {
  User.bulkCreate([
    { username: 'shakespeare_papi', email: 'cmart@gmail.com', password: 'password', bio: 'I\'m LIT!!!', rating: 350, level: 'other' },
    { username: 'edumacate', email: 'nhaque@gmail.com', password: 'password', bio: 'I have a phD in everythinG', rating: 2, level: 'post-grad' },
    { username: 'j.pushw', email: 'jwu@gmail.com', password: 'password', bio: 'Graduated state Penn', rating: 9001, level: 'other' },
    { username: 'ajaxRocky', email: 'ajaxwu@gmail.com', password: 'helloAjax', bio: 'Graduated from API academy', rating: 700, level: 'other' },
    { username: 'olddirtydom', email: 'dom@gmail.com', password: 'documentModel', bio: 'Documents are the best', rating: 40, level: 'post-grad' },
    { username: 'EnglishMaster', email: 'E.master@gmail.com', password: 'englishhhhhh', bio: 'English is the best language. I learned it well.', rating: 4000, level: 'other' },
  ]);
})
.catch(error => console.log(error));
