;(function ($) {
  const defaultOptions = {
    dataSrc: 'data-src',
  }
  $.readyImgs = []

  // 提供 setLazyloadOptions 接口设置参数
  $.fn.setLazyloadOptions = function (options) {
    if (typeof options !== 'object') return
    options = {
      ...defaultOptions,
      ...options,
    }
    $(this).data('lazyloadOptions', options)
  }

  // 提供 getLazyloadOptions 接口获取参数
  $.fn.getLazyloadOptions = function (options) {
    return $(this).data('lazyloadOptions')
  }

  // 提供 lazyload 接口注册需要懒加载的 img
  $.fn.lazyload = function (options) {
    const $self = $(this)
    $self.each(function () {
      const element = $(this)
      if (element.prop('tagName') === 'IMG') {
        element.setLazyloadOptions(options || {})
        if (!loadImageIfInView(element)) {
          $.readyImgs.push(element)
        }
      }
    })
  }

  // 判断是否出现在视口中，并显示
  function loadImageIfInView(jQElem) {
    const dataSrc = jQElem.getLazyloadOptions().dataSrc
    const src = jQElem.attr(dataSrc)
    if (src && isInViewport(jQElem)) {
      jQElem.attr('src', src).removeAttr(dataSrc)
      return true
    }
    return false
  }

  // 判断方法：考虑元素刚好完全在视口边缘外进行判断
  function isInViewport(jQElem) {
    const { top, bottom, left, right } = jQElem[0].getBoundingClientRect()
    const vh = $(window).outerHeight(true),
      vw = $(window).outerWidth(true)
    return bottom >= 0 && top <= vh && right >= 0 && left <= vw
  }

  // 监听滚动，检查已准备好的 img 元素并处理
  $(document).on('scroll', function () {
    // 增加防抖 醒来优化
    $.readyImgs.forEach(loadImageIfInView)
  })
})(jQuery)
