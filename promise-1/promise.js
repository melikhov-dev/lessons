const statuses = {
  pending: "PENDING",
  fulfilled: "FULFILLED",
  rejected: "REJECTED",
};

class MyPromise {
  #status;
  #thenFn = () => {};
  #catchFn = () => {};
  constructor(fn) {
    this.#status = statuses.pending;
    return fn(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(data) {
    if (this.#status === statuses.pending) {
      this.#status = statuses.fulfilled;
      setTimeout(() => {
        try {
          this.#thenFn(data);
        } catch (e) {
          this.#status = statuses.rejected;
          this.#catchFn(e);
        }
      }, 0);
    }
  }

  #reject(err) {
    if (this.#status === statuses.pending) {
      this.#status = statuses.rejected;
      setTimeout(() => {
        return this.#catchFn(err);
      }, 0);
    }
  }

  then(onResolved, onRejected) {
    if (onResolved) {
      this.#thenFn = onResolved;
    }
    if (onRejected) {
      this.#catchFn = onRejected;
    }
    return this;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

const promiseTimeout = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Time is over");
    reject(new Error("Error"));
  }, 1000);
});

promiseTimeout
  .then((data) => {
    console.log(data);
    throw new Error("Error!");
  })
  .catch((err) => console.log(err.message ? err.message : err));
