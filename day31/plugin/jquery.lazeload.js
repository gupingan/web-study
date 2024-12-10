;(function ($) {
  var defaultOptions = {
    dataSrc: 'data-src',
  }
  $.readyImgs = []

  // 提供 setLazyloadOptions 接口设置参数
  $.fn.setLazyloadOptions = function (options) {
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
    var $self = $(this)
    $self.each(function () {
      var element = $(this)
      if (element.prop('tagName') === 'IMG') {
        element.setLazyloadOptions(options)
        // 如果检测不在视口内，加载失败，就添加到懒加载数组中
        if (!showImgForInner(element)) {
          $.readyImgs.push(element)
        }
      }
    })
  }

  // 判断是否出现在视口中，并显示
  function showImgForInner(jQElem) {
    var dataSrc = jQElem.getLazyloadOptions().dataSrc
    if (jQElem.attr(dataSrc) && isInViewport(jQElem)) {
      jQElem.attr('src', jQElem.attr(dataSrc)).removeAttr(dataSrc)
      return true
    }
    return false
  }

  // 判断方法：考虑元素刚好完全在视口边缘外进行判断
  function isInViewport(jQElem) {
    var { top, bottom, left, right } = jQElem[0].getBoundingClientRect()
    var vh = $(window).outerHeight(true),
      vw = $(window).outerWidth(true)
    return bottom >= 0 && top <= vh && right >= 0 && left <= vw
  }

  // 监听滚动，检查已准备好的 img 元素并处理
  $(document).on('scroll', function () {
    $.readyImgs.forEach(showImgForInner)
  })
})(jQuery)
