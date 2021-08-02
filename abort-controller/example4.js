const cancelLongOperation = new AbortController();

function someLongOperation(option = {}) {
    const {signal} = option;

    if (signal?.aborted) {
        return;
    }

    const interval = setInterval(() => {
        console.log("fire");
    }, 1000)

    signal && signal.addEventListener("abort", () => {
        console.log("aborted!");
        clearInterval(interval);
    }, {
        once: true
    })
}

someLongOperation({signal: cancelLongOperation.signal});

setTimeout(() => {
    cancelLongOperation.abort();
}, 3000);