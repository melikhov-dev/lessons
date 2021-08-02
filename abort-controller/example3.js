import fetch from "node-fetch";
import { setTimeout } from "timers/promises"

const cancelFetch = new AbortController();
const cancelTimeout = new AbortController();

console.time("fetch");

const promiseOne = fetch("http://123.123.123.132", {timeout: 3000, signal: cancelFetch.signal});

promiseOne.then((result) => {
    console.log("finished");
}).catch((e) => {
}).finally(() => {
})

const timeout = async () => {
  await setTimeout(1000, void 0, {signal: cancelTimeout.signal});
    console.log("Time is over");
    cancelFetch.abort();
}

await Promise.race([promiseOne, timeout()])
    .catch((e) => {
        console.log(e.message);
    });
console.timeEnd("fetch");
