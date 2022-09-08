const data = [
  [
    {
      type: 'header',
      value: 'Document ID',
    },
    {
      type: 'header',
      value: 'Document name',
    },
    {
      type: 'header',
      value: 'User',
    },
    {
      type: 'header',
      value: 'Size (Kb)',
    },
    {
      type: 'header',
      value: 'Date',
    }
  ],
  [
    {
      type: 'number',
      value: 1
    },
    {
      type: 'text',
      value: 'Operations',
    },
    {
      type: 'user',
      value: 'Andrew',
      additional: {
        tel: 79096754545
      },
    },
    {
      type: 'number',
      value: 432,
    },
    {
      type: 'date',
      value: '12.05.2022'
    }
  ],
  [
    {
      type: 'number',
      value: 2
    },
    {
      type: 'text',
      value: 'Taxes',
    },
    {
      type: 'user',
      value: 'Julia',
      additional: {
        tel: 7999444555
      },
    },
    {
      type: 'number',
      value: 221,
    },
    {
      type: 'date',
      value: '03.01.2021'
    }
  ],
  [
    {
      type: 'number',
      value: 3
    },
    {
      type: 'text',
      value: 'Example',
    },
    {
      type: 'user',
      value: 'Ivan',
      additional: {
        tel: 89651277775,
        email: 'fdkjnfdjknfd@gmail.com'
      },
    },
    {
      type: 'number',
      value: 1033,
    },
    {
      type: 'date',
      value: '08.06.2022'
    }
  ]
];

for (let i = 0, len = data.length; i < len; i++) {
  const row = data[i];
  for (let j = 0, len = row.length; j < len; j++) {
    data[i][j].idRow = i;
    data[i][j].idCol = j;
  }
}

export {data};