/*
// End only
for (let i of range(8)) {
    console.log(i)
}
// Start and end
for (let i of range(2,8)) {
    console.log(i)
}
// Start, end and step
for (let i of range(2,8,3)) {
    console.log(i)
}
*/
export const range = function (...args) {
    const start = args.length > 1 ? args[0] : 0,
        stop = args.length > 1 ? args[1] : args[0],
        step = args.length > 2 ? args[2] : 1
    return new Array((stop - start) / step).fill().map((_, i) => i * step + start)
}
