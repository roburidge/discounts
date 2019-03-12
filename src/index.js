import _ from "lodash";

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };

console.log(x);
console.log(y);
console.log(z, x);

let n = { x, y, ...z };
console.log(n);

function component() {
  let element = document.createElement("div");

  // Lodash is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
