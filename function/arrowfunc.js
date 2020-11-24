//  ES5
function result(params1, params2) {
  return params1 + params2;
}
console.log(result(5, 10));

//  ES6
// var 변수명 = (params) => {}

var result = (a, b) => a + b;

console.log(result(5, 10));

function result(name, age) {
  return "당신의 이름은 " + name + "이고 나이는 " + age + "입니다.";
}

var result = (name, age) => {
  return "당신의 이름은 " + name + "이고 나이는 " + age + "입니다.";
};

console.log(result());
