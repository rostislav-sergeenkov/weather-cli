// Module that accepts CLI command args and returns args in form of an array
// node: node weather -s minsk -d wroclaw
// result: { s: 'minsk', d: 'wroclaw' }

const getArgs = (args) => {
  const res = {};

  // rest-синтаксис для массива: args = [executor, file]; все остальное в rest
  const [executor, file, ...rest] = args;

  rest.forEach((value, index, array) => {
    if (value.charAt(0) == '-') {
      if (index == array.length - 1) {
        res[value.substring(1)] = true;
      } else if (array[index + 1].charAt(0) != '-') {
        res[value.substring(1)] = array[index + 1];
      } else {
        res[value.substring(1)] = true;
      }
    }
  });

  return res;
}

export { getArgs };
