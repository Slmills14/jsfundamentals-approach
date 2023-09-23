const throttle = (f, t) => {
  let lastCall = Date.now()
  function sendCake() {
    const currentCall = Date.now()
    const timeElapsed = currentCall - lastCall
    if (timeElapsed > t) {
      lastCall = currentCall
      return f()
    }
    return 'Too early to receive more cake.'
  }
  return sendCake
}
const test = throttle(() => 'Have some cake', 5000) // invoke and store throttle with function that returns 'Have some cake' with a delay of 5000 ms
console.log(test()) // try to invoke the function immediately, should return 'Too early to receive more cake.' (0 seconds elapsed)
setTimeout(() => console.log(test()), 6000) // 'Have some cake' (6 seconds elapsed, 6 seconds after last call, lastCall now set to 6 seconds)
setTimeout(() => console.log(test()), 7000) // 'Too early...' (7 seconds elapsed, 1 second after last call)
setTimeout(() => console.log(test()), 10000) // 'Too early...' (10 seconds elapsed, 4 seconds after lastCall)
setTimeout(() => console.log(test()), 13000) // 'Have some cake' (13 seconds elapsed, 7 seconds after lastCall, lastCall now set to 13 seconds)
setTimeout(() => console.log(test()), 19000) // 'Have some cake' (20 seconds elapsed, 6 seconds after lastCall, lastCall now set to 19 seconds)

const throttled = (func, delay) => {
  //on the first call, you are allowed to call the function (canCall is true)
  //for request, I was playing around with whether it should be true or false to start. 
  let canCall = true
  let request = false;

  return function helperFunc() {
    request = true;
    /*if you have a request AND canCall the function, you do. Then both are set to false because you cant call the function
    yet and there is not an unfilled request.
    */
    if (canCall && request) {
      /*We then start our timer - setTimeout says that after the delay, we can do whatever is in our function.
      In this case, we canCall our function again, so it is set to true. Then if we have a request that was made
      before the timer, we invoke our function again.*/

      setTimeout(() => {
        canCall = true
        if (request) func()
      }, delay)

      func()
      canCall = false
      request = false
      return 'it worked!'
    } else {
      /*If we make a request during the timer, we set request to true - storing that we want to invoke our function automatically
      when the timer is done */
      request = true
      console.log('cant call the function yet!')
      return 'try again later'
    }
  }
}

const fingersCrossed = throttled(() => {
  console.log('throttled function was called')
}, 5000)

console.log(fingersCrossed())

console.log(fingersCrossed())

console.log(fingersCrossed())

console.log(fingersCrossed())

setTimeout(() => {
  console.log(fingersCrossed())
}, 9000)





//here is another example - I didnt write this one - I dont love the gun references. 
const throttle2 = (f, t) => {
  // "ready" refers to whether the gun is overheated or not. A ready gun is not
  // overheated, and can shoot immediately.
  let ready = true;
  // "loaded" refers to whether the gun has a bullet in it
  let loaded = false;

  // function that represents shooting the gun
  const shoot = () => {
    ready = false; // gun overheats upon shot
    loaded = false; // gun has no bullet in it after being shot

    // ensure that after cooling down, the gun should shoot if it's loaded
    setTimeout(() => {
      if (loaded)
        shoot();
      else
        ready = true;
    }, t);

    // gun fires!
    f();
  };

  // This is our main function. If the gun is ready (non-overheated) shoot it.
  // Otherwise, just load the gun with a bullet (if it is not loaded already).
  return () => {
    if (ready) {
      shoot();
      return true;
    }
    else
      loaded = true;
  };
};