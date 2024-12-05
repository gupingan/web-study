// 获取滚动条的位置
function scroll() {
  return {
    top:
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop,
    left:
      window.pageXOffset ||
      document.body.scrollLeft ||
      document.documentElement.scrollLeft,
  }
}

// 获取视口的大小
function viewport() {
  if (window.innerHeight !== undefined) {
    //ie9及其以上的版本的写法
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  } else if (document.compatMode === 'BackCompat')
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    }
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  }
}

// 滚动到指定为止
function scrollWindowTo(x, y) {
  if (document.compatMode === 'BackCompat') {
    document.body.scrollTo(x, y)
  } else {
    document.documentElement.scrollTo(x, y)
  }
}

function moveAnimate(elem, target, step) {
  // 清除之前的定时器
  if (elem.timer) clearInterval(elem.timer)
  // 获取步长
  step = Math.abs(step) || 1
  // 判断目标位置和当前位置的差值，如果小于步长
  if (Math.abs(elem.offsetLeft - target) <= Math.abs(step)) return
  // 判断方向
  let direction = elem.offsetLeft > target ? -1 : 1
  // 开始运动
  elem.timer = setInterval(() => {
    elem.style.left = elem.offsetLeft + step * direction + 'px'
    if (Math.abs(elem.offsetLeft - target) <= Math.abs(step)) {
      elem.style.left = target + 'px'
      clearInterval(elem.timer)
      elem.timer = null
    }
  }, 1)
}

function newMoveAnimate(elem, target, step, noInterfere) {
  // 设置标志位
  if (noInterfere && elem.isAnimating) return
  elem.isAnimating = true
  // 获取步长
  step = Math.abs(step) || 1
  // 判断目标位置和当前位置的差值，如果小于步长
  if (Math.abs(elem.offsetLeft - target) <= Math.abs(step)) return
  // 判断方向
  const direction = elem.offsetLeft > target ? -1 : 1
  // 开始运动
  function animate() {
    elem.style.left = elem.offsetLeft + step * direction + 'px'
    if (Math.abs(elem.offsetLeft - target) > step) {
      requestAnimationFrame(animate)
    } else {
      elem.style.left = target + 'px'
      elem.isAnimating = false
    }
  }

  requestAnimationFrame(animate)
}

// 封装：缓动动画移动函数(基于setInterval)
function easeAnimateMove(element, targetLeft, perStep, noInterfere) {
  if (noInterfere && element.easeAnimateMoving) return
  element.easeAnimateMoving = true

  if (element.easeAnimateMoveTimer) clearInterval(element.easeAnimateMoveTimer)

  if (targetLeft === undefined) return

  perStep = perStep > 0 ? perStep : 10

  element.easeAnimateMoveTimer = setInterval(function () {
    let step = (targetLeft - element.offsetLeft) / perStep
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    element.style.left = element.offsetLeft + step + 'px'

    if (Math.abs(targetLeft - element.offsetLeft) <= Math.abs(step)) {
      element.style.left = targetLeft + 'px'
      clearInterval(element.easeAnimateMoveTimer)
      element.easeAnimateMoveTimer = null
      element.easeAnimateMoving = false
    }
  }, 30)
}
