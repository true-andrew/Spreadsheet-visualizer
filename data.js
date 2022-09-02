const data = [
  [
    {
      type: 'number',
      value: 1
    },
    {
      type: 'text',
      value: 'concat',
    },
    {
      type: 'textarea',
      value: 'Return new array by joining arrays a1 and a2 together'
    }
  ],
  [
    {
      type: 'number',
      value: 2
    },
    {
      type: 'text',
      value: 'join',
    },
    {
      type: 'textarea',
      value: 'Join all elements of array a1 into a string separated by separator arg'
    }
  ],
  [
    {
      type: 'number',
      value: 3
    },
    {
      type: 'text',
      value: 'slice',
    },
    {
      type: 'textarea',
      value: 'Extract a section from start to end of array a1 and return a new array'
    }
  ],
  [
    {
      type: 'number',
      value: 4
    },
    {
      type: 'text',
      value: 'indexOf',
    },
    {
      type: 'textarea',
      value: 'Return first index of obj within array a1'
    }
  ],
  [
    {
      type: 'number',
      value: 5
    },
    {
      type: 'text',
      value: 'lastIndexOf',
    },
    {
      type: 'textarea',
      value: 'Return last index of obj within array a1'
    }
  ],
  [
    {
      type: 'number',
      value: 6
    },
    {
      type: 'text',
      value: 'forEach',
    },
    {
      type: 'textarea',
      value: 'Calls function fn for each element in the array a1'
    }
  ],
  [
    {
      type: 'number',
      value: 7
    },
    {
      type: 'text',
      value: 'every',
    },
    {
      type: 'textarea',
      value: 'Return true if every element in array a1 satisfies provided testing function fn'
    }
  ],
  [
    {
      type: 'number',
      value: 8
    },
    {
      type: 'text',
      value: 'some',
    },
    {
      type: 'textarea',
      value: 'Return true if at least one element in array a1 satisfies provided testing function fn'
    }
  ],
  [
    {
      type: 'number',
      value: 9
    },
    {
      type: 'text',
      value: 'filter',
    },
    {
      type: 'textarea',
      value: 'Create a new array with all elements of array a1 which pass the filtering function fn'
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