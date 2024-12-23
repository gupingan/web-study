function fun1(callback) {
  setTimeout(function() {
    console.log('即将执行回调函数')
    callback && callback()
  },1000)
}

function callback() {
  console.log('回调函数执行中')
}

// fun1(callback)

function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
    console.log('promise 即将执行回调函数')
    resolve()
    }, 1000)
  })
}

fn2().then(()=>{
  console.log('promise 回调函数执行1')
})