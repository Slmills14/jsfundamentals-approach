//memoize uses closure to store the cache 
const memoize = (func) => {
  const cache = {};

  //the anonymous function takes in the argument, checks the cache for that argument - 
  return (arg) => {
    //if it does not exist, it stores the result of passing the arg into the function, then adds the arg:result property to the cache
    if (!cache[arg]) {
      const result = func(arg);
      cache[arg] = result;
    }
    //if the arg is in the cache (or after we add it to the cache), we return the value of that property from the cache
    console.log('cache -> ', cache)
    return cache[arg];
  }
}


function memoBetter(func) {
  //same cache as previous memo function. 
  const cache = {};

  return (...args) => {
    //results array does not have to be used - i added that to get the return I wanted from running fib in the memo function
    const results = [];
    //iterate over args array, if arg is not in cache, pass element into func, push result into cache
    for (let i = 0; i < args.length; i++) {
      if (!cache[args[i]]) cache[args[i]] = func(args[i]);
      //push cached value for each arg into results array
      results.push(cache[args[i]])
    }
    //return results array
    console.log('cache -> ', cache)
    return results;
  }
}

const memoize2 = func => {
  const cache = {};
  return (...args) => {
    // stringify list of argmuments
    const key = JSON.stringify(args);
    // if there isn't a cached result for the current args, calculate it and cache it
    if (!cache[key]) cache[key] = func(...args);
    //return the cached value for the current arguments
    return cache[key];
  }
}

const memoFib = (num) => {

  if (num < 2) return num;
  return memoFib(num - 1) + memoFib(num - 2);
}


const memoTest = memoize(memoFib);
//these will only return the result for the first argument because memoize isnt optimized to take in more than one argument
console.time('memoized fib');
console.log(memoTest(12, 20, 40));
console.timeEnd('memoized fib');

const memoTestBetter = memoBetter(memoFib);

//these will return all results from all arguments in a results array
console.time('memoized fib better (values calculated and then cached)');
console.log(memoTestBetter(12, 20, 40));
console.timeEnd('memoized fib better (values calculated and then cached)');

//this demonstrates the time difference between returning values before they are cachedusing a cache 
console.time('memoized fib better (values start off in the cache)');
console.log(memoTestBetter(12, 20, 40));
console.timeEnd('memoized fib better (values start off in the cache)');