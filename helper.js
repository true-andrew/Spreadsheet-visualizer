export function createDOMElement(type, textContent, className, dataset) {
  const element = document.createElement(type);

  if (textContent !== undefined) {
    element.textContent = textContent;
  }

  if (className !== undefined) {
    element.classList.add(className);
  }

  if (dataset !== undefined) {
    const keys = Object.keys(dataset);
    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      element.dataset[key] = dataset[key];
    }
  }

  return element;
}

function compare(first, second) {
  let a;
  let b;
  if (first.type === 'date') {
    a = dateToNumber(first.value);
    b = dateToNumber(second.value);
  } else {
    a = first;
    b = second;
  }
  if (a === b) {
    return 0;
  }
  return a < b;
}

export function dateToNumber(date) {
  return Date.parse(date.split('.').reverse().join('-'));
}

export function insertSort(arr, order, colNumber) {
  let temp;
  for (let i = 1, len = arr.length; i < len; i++) {
    let j = i;
    temp = arr[i];
    while (j > 0 && compare(arr[j - 1][colNumber], temp[colNumber]) === order) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
}

function elFactory(type, attributes, children) {
  const el = document.createElement(type);

  const keys = Object.keys(attributes);
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    el.setAttribute(key, attributes[key]);
  }

  console.log(children);
  // for (let i = 0, len = arguments.length; i < len; i++) {
  //
  // }

  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child))
    } else {
      el.appendChild(child)
    }
  })

  return el;
}

// const markup = elFactory(
//   'div',
//   {
//     class: 'my-component ttt',
//   },
//   [elFactory('span', {}, ['Hello World!']),
//     'Thanks for reading my blog!']
// );
//
// console.log(markup)