// Promise.resolve()	返回一个大多数情况下是成功状态的 Promise 对象	ES 2015
// Promise.reject()	返回一个失败状态的 Promise 对象，参数作为失败的原因	ES 2015
// Promise.all()	所有 Promise 都执行成功才算成功；如果有一个失败，则整个 Promise 被拒绝	ES 2015
// Promise.allSettled()	不论成功与失败，把所有 Promise 的执行结果全部返回	ES 2020
// Promise.race()	Promise 集合中，返回第一个执行完成（无论成功与失败）的 Promise	ES 2015
// Promise.any()	Promise 集合中，返回第一个执行成功的 Promise，如果所有都失败则抛出 AggregateError 错误	  ES 2021
