// 后端模拟
const fileSystem = [
  '01.jpg',
  '02.jpg',
  '03.jpg',
  '04.jpg',
  '05.jpg',
  '06.jpg',
  '07.jpg',
  '08.jpg',
  '09.jpg',
  '10.jpg',
]

function getImage(path) {
  if (~fileSystem.indexOf(path)) {
    return {
      code: 200,
      data: path,
      msg: '图片请求成功',
    }
  }
  return {
    code: 404,
    data: null,
    msg: '图片请求失败',
  }
}

// 前端模拟
function requestImage(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = getImage(path)
      // 不论请求结果，只要能够正常的请求都会走 resolve，图片是否在后端存在不会影响整体的处理逻辑
      resolve(res)
      // 除非这个网络请求过程出现别的异常才会走 catch
    }, parseInt(1000 * Math.random() + 500))
  })
}

Promise.all([
  requestImage('01.jpg'),
  requestImage('02.jpg'),
  requestImage('103.jpg'),
  requestImage('04.jpg'),
  requestImage('05.jpg'),
  requestImage('106.jpg'),
  requestImage('07.jpg'),
  requestImage('08.jpg'),
  requestImage('09.jpg'),
  requestImage('10.jpg'),
]).then((res) => {
  console.log(res)
}).catch(((err) => {
  console.log('网络请求失败', err)
}))
