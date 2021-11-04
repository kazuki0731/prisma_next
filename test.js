const obj = {
  name: "kawa",
  age: 31,
};

const { name, age } = obj;

const newObj = {
  ...obj,
  age: 32,
};

console.log(newObj);
