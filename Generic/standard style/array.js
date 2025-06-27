

function stringsLike(arr, match) {
    var results = []
    arr.forEach(str => {
        if (str.includes(match)) {
            results.push(str)
        }
    })
    return results
}

function getPrefix(arr, n) {
    var results = []
    arr.forEach(str => {
        let slice = str.slice(0, n)
        if (!results.includes(slice)) {
            results.push(slice)
        }
    })
    return results
}