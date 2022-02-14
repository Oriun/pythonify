**Forgive me**

# Pythonify

Some Pythonsyntax in JS

```javascript
import { range, List, len } from './len.js'

for (let i in range(4))
    console.log("Index", i)
/*
 * Prints :
 *  Index 0
 *  Index 1
 *  Index 2
 *  Index 3
 */

/*
 * works with start, end and step parameters
 * ex: range(2,10,3) => [2,5,8]
 */

const list = List()

list.append(1)              // [1]
list.append(2)              // [1,2]
list.append(3)              // [1,2,3]

list.pop()                  // [1,2]
list.insert(len(list),3)    // [1,2,3]
list.append(3)              // [1,2,3,3]
list.count(3)               // 2
list.remove(3)              // [1,2,3]

list[2]         // 3
list[-1]        // 3
list['1:']      // [2,3]
list[':2']      // [1,2]
list['0:2']     // [1,2]
list['0:-1']    // [1,2]
list['0:-2']    // [1]
list[':']       // [1,2,3]


len(list)       // 3
let a_map = new Map([[1, 2], [3, 4], ['ok', 'bye'], ['why', 'you'], ['did', 'this']])
len(a_map)      // 5
len([0,3,4])    // 3

const listFromIterable = List(a_map) // [[1, 2], [3, 4], ['ok', 'bye'], ['why', 'you'], ['did', 'this']]

```