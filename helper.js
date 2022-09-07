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

function compare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b;
}

export function insertSort(arr, order, colNumber) {
  let temp;
  for (let i = 2, len = arr.length; i < len; i++) {
    let j = i;
    temp = arr[i];
    while (j > 1 && compare(arr[j - 1][colNumber].value, temp[colNumber].value) === order) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
}