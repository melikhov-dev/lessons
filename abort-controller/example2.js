import fetch from "node-fetch";

const cancelFetch = new AbortController();

const promiseOne = fetch("http://123.123.123.132", {timeout: 3000, signal: cancelFetch.signal});

console.time("fetch");

const timeout = setTimeout(() => {
    console.log("Time is over");
    cancelFetch.abort();
    console.timeEnd("fetch");
}, 10000);

promiseOne.then((result) => {
    console.log("finished");
}).catch((e) => {
    console.log(e.message);
}).finally(() => {
    clearTimeout(timeout);
})



