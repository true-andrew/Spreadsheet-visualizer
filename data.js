const documents = [
  [1, 'Operations', {name: 'Andrew', additional: {tel: 79096754545}}, 432, '12.05.2022'],
  [2, 'Taxes', {name: 'Julia', additional: {role: 'Developer', tel: 74956968585}}, 221, '03.01.2021'],
  [3, 'Example', {name: 'Ivan', additional: {email: 'ivanivan@gmail.com'}}, 553, '08.06.2022'],
  [1, 'Operations', {name: 'Andrew', additional: {tel: 79096754545}}, 432, '12.05.2022'],
  [2, 'Taxes', {name: 'Julia', additional: {role: 'Developer', tel: 74956968585}}, 221, '03.01.2021'],
  [3, 'Example', {name: 'Ivan', additional: {email: 'ivanivan@gmail.com'}}, 553, '08.06.2022'],
  [1, 'Operations', {name: 'Andrew', additional: {tel: 79096754545}}, 432, '12.05.2022'],
  [2, 'Taxes', {name: 'Julia', additional: {role: 'Developer', tel: 74956968585}}, 221, '03.01.2021'],
  [3, 'Example', {name: 'Ivan', additional: {email: 'ivanivan@gmail.com'}}, 553, '08.06.2022'],
]
export const TABLE_DATA_TYPES = {
  NUMBER: 'number',
  USER: 'user',
  DATE: 'date',
  TEXT: 'text',

}
export const documentsModel = {
  name: 'Documents',
  columns: [
    {
      type: 'number',
      name: 'ID',
    },
    {
      type: 'text',
      name: 'Document name',
    },
    {
      type: 'user',
      name: 'User',
    },
    {
      type: 'number',
      name: 'Size',
    },
    {
      type: 'date',
      name: 'Date',
    }
  ],
  data: documents,
};


const users = [
  [{name: 'First', additional: {role: 'test user', id: "4123434"}}, '12.10.2021', 'First User'],
  [{name: 'Second', additional: {role: 'sefnjks', id: "789789"}}, '09.09.2022', 'Second User'],
  [{name: 'Third', additional: {note: 'development', email: 'rrr@fkf.com'}}, '26.04.2020', 'Third User'],
]

export const usersModel = {
  name: 'Users',
  columns: [
    {
      type: 'user',
      name: 'Username',
    },
    {
      type: 'date',
      name: 'Registration date',
    },
    {
      type: 'text',
      name: 'Description',
    }
  ],
  data: users,
};


function addIdToData(data) {
  for (let i = 0, len = data.length; i < len; i++) {
    const row = data[i];
    for (let j = 0, len = row.length; j < len; j++) {
      data[i][j].idRow = i;
      data[i][j].idCol = j;
    }
  }
}

// addIdToData(documentsArr);
// addIdToData(usersArr);
// addIdToData(noDate);

export const dataSets = {
  'Documents': documentsModel,
  'Users': usersModel,
}

function getData(dataName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataSets[dataName]);
    }, 1000);
  })
}

export {getData};