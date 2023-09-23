
const test = [{name: 'Sam', birthday: '12/14/1986', cohort: 'PTRI9'}, 45, 'this is a clone!'];

function clone(value) {
  const {...shallowClone} = value;
  return shallowClone;
}

const cloneDeep = value => {
  const copy = new value.constructor;
  for (let key in value) {
    if (typeof value[key] === 'object') {
      copy[key] = cloneDeep(value[key]);
    } else {
      copy[key] = value[key];
    }
  }
  return copy;
}



const shallowCloneTest = clone(test);

const deepCloneTest = cloneDeep(test);




console.log(shallowCloneTest);

console.log(deepCloneTest);

console.log('original and shallowClone -> ', (shallowCloneTest === test))

console.log('original[0] and shallowClone[0] -> ', shallowCloneTest[0] === test[0])

console.log('original and deepClone -> ', deepCloneTest === test)

console.log('original[0] and deepClone[0] -> ', deepCloneTest[0] === test[0])

console.log('original[0].name and deepClone[0].name -> ', deepCloneTest[0].name === test[0].name)



