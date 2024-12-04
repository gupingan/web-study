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

function moveAnimate(elem, target, step) {
  // 清除之前的定时器
  if (elem.timer) clearInterval(elem.timer)
  // 获取步长
  step = Math.abs(step) || 1
  // 判断目标位置和当前位置的差值，如果小于步长，直接到达目标位置
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

function newMoveAnimate(elem, target, step) {
  // 清除之前的定时器
  if (elem.timer) clearInterval(elem.timer);
  // 获取步长
  step = Math.abs(step) || 1;
  // 判断目标位置和当前位置的差值，如果小于步长，直接到达目标位置
  if (Math.abs(elem.offsetLeft - target) <= step) {
    elem.style.left = target + 'px';
    return;
  }
  // 判断方向
  const direction = elem.offsetLeft > target ? -1 : 1;
  // 开始运动
  function animate() {
    elem.style.left = elem.offsetLeft + step * direction + 'px';
    if (Math.abs(elem.offsetLeft - target) > step) {
      requestAnimationFrame(animate);
    } else {
      elem.style.left = target + 'px';
    }
  }

  requestAnimationFrame(animate);
}