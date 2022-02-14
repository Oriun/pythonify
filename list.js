const isIndex = function(prop){
    if(Number.isInteger(prop)) return true
    if(typeof prop === 'string') return /^-?\d+$/.test(prop)
    return false
}
const listProxyHandler = {
    get: function (list, prop) {
        if (isIndex(prop)) return list._array.at(prop)
        else if (prop in list) return list[prop]
        else if (prop in list._array) return list._array[prop]
        else return list._customGetter(prop)
    },
    set: function (list, prop, value) {
        if (isIndex(prop)) list._array[prop < 0 ? list._array.length + prop : prop] = value
        else if (prop in list._array) list._array[prop] = value
        else if (prop in list) return false
        else list._customSetter(prop)
        return true
    }
}

class ValueError extends Error {
    constructor(value) {
        super('ValueError: can\'t find value ' + value)
    }
}

class ListClass {
    _array = []
    constructor(arr = []) { this._array = arr }
    append(value) {
        this._array.push(value)
    }
    extend(iterable) {
        this._array.push(...iterable)
    }
    insert(index, value) {
        this._array.splice(index, 0, value)
    }
    pop(index) {
        if (index < this._array.length - 2) return this._array.splice(index, 1)
        return this._array.pop()
    }
    remove(value) {
        let index = this._array.indexOf(value)
        if (index === -1) throw new ValueError(value)
        this.pop(index)
    }
    clear() {
        this._array = []
    }
    index(value, start, end) {
        let index = this._array.indexOf(value, start)
        if (index === -1) throw new ValueError(value)
        let k = end < 0 ? this._array.length - end : end
        if (index < k) throw new ValueError(value)
        return index
    }
    count(value) {
        let last = -1, count = 0
        while (true) {
            last = this._array.indexOf(value, ++last)
            if (last === -1) return count
            count++
        }
    }
    sort() { }
    reverse() {
        this._array.reverse()
    }
    copy() {
        return List(this._array)
    }
    _customGetter(prop) {
        const [isSimplePattern, first, second] = /^(?<first>-?\d+)?:(?<second>-?\d+)?$/.exec(prop) ?? []
        if(isSimplePattern){
            return List(this._array.slice(first, second))
        }
        // else more to do here
    }
    _customSetter(prop) {
        const [isSimplePattern, first, second] = /^(?<first>-?\d+)?:(?<second>-?\d+)?$/.exec(prop) ?? []
        // if(isSimplePattern){
        //     if(Number.isInteger(first) && Number.isInteger(second)) 
        //     return List(this._array.slice(first, second))
        // }
        // else more to do here
    }
}

export const List = function (iterable = []) {
    if (!(Symbol.iterator in Object(iterable)))
        throw new Error('Can\'t create a list with a non iterable value')
    const obj = new ListClass(Array.from(iterable))
    return new Proxy(obj, listProxyHandler)
}