const mongoose = require('mongoose')
const User = require('../models/user');
const Specialist = require('../models/specialist');

// TODO configure to test apis

const initialUsers = [
  {
    name: 'Florencia',
    lastname: 'Peretti',
    email: 'florenperetti@gmail.com',
    password: '123145435',
    city: 'Córdoba',
    country: 'Argentina',
    phone: null,
  }
];

const initialSpecialists = [
  {
    description: 'Lorem ipsum',
    stars: 4,
    jobs: [
      {
        title: 'My specialty 1',
        photos: [
          'photoURL1',
        ],
        description: 'Specialty description',
        rate: '$123 / h',
      },
      {
        title: 'My specialty 2',
        photos: [
          'photoURL1',
          'photoURL2',
        ],
        description: 'Specialty description',
        rate: '$120 / h',
      },
    ],
  },
];

test('specialist is created', () => {
  const firstUser = initialUsers[0];
  const firstSpecialist = initialSpecialists[0];
  const userObject = new User(firstUser);
  const specialistObject = new Specialist({
    ...firstSpecialist,
    user: userObject._id,
  });
  expect(specialistObject.description).toBe(firstSpecialist.description);
  expect(specialistObject.jobs.length).toBe(2);
});
