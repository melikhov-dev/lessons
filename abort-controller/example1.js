import fetch from "node-fetch";

const promiseOne = fetch("http://123.123.123.132", {timeout: 3000});

console.time("fetch");

promiseOne.then((result) => {
    console.log("finished");
}).catch((e) => {
    console.log(e.message);
}).finally(() => {
})

const promiseTwo = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Time is over");
        reject(new Error("Time is over"));
    }, 1000);
})

await Promise.race([promiseOne, promiseTwo])
    .catch((e) => {
        console.log(e.message);
    });
console.timeEnd("fetch");