const Document = require('../models').Document
const documentSeeds = require('./document-seeds');

const documents = [
  {
    title: 'Masterpiece',
    body: documentSeeds[0],
    category: 'essay',
    privacy: 'public',
    active: true,
    deadline: new Date('2017-04-27').toISOString().slice(0, 10),
    UserId: 2
  },
  {
    title: 'My Diary',
    body: documentSeeds[1],
    category: 'other',
    privacy: 'public',
    active: true,
    deadline: new Date('2017-03-14').toISOString().slice(0, 10),
    UserId: 1
  },
  {
    title: 'Puppies',
    body: documentSeeds[2],
    category: 'essay',
    privacy: 'public',
    active: true,
    deadline: new Date('2017-02-28').toISOString().slice(0, 10),
    UserId: 3
  },
  {
    title: 'Why Pizza was, and should still be, a vegetable',
    body: documentSeeds[3],
    category: 'essay',
    privacy: 'public',
    active: true,
    deadline: new Date('2017-04-19').toISOString().slice(0, 10),
    UserId: 3
  }
];

Document.sync()
.then(() => Document.bulkCreate(documents))
.catch((err) => console.log('DB Err!', err));
