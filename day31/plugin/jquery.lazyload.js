/**
 * jQuery Lazyload Plugin
 * @version 1.0.0
 * @description This plugin is designed to lazy-load images on a webpage, improving page load times and saving bandwidth by only loading images when they are in (or near) the viewport.
 * @author Gu Pingan
 * @copyright (c) 2023 Gu Pingan. All rights reserved.
 * @license MIT
 * @requires jQuery >=1.7.0
 *
 * Usage:
 * // Set option for lazyload [Optional]
 * $.lazyloadOption({ throttleTime: 200 });
 * $('img').lazyImgOption({ dataSrc: 'img-src' });
 *
 * // Register images for lazyloading
 * $('img').lazyload();
 *
 * // Note: This plugin automatically listens for scroll events and lazy-loads images as they come into the viewport.
 */

;(function ($) {
  const lazyloadOption = {
    throttleTime: 200,
  }
  const lazyImgOption = {
    dataSrc: 'data-src',
  }
  const readyJQImages = []

  // 设置/获取 配置参数
  $.lazyloadOption = function (option) {
    if (typeof option !== 'object') return lazyloadOption
    lazyloadOption = {
      ...lazyloadOption,
      ...option,
    }
  }

  // 设置/获取 图片配置参数
  $.fn.lazyImgOption = function (option) {
    const $self = $(this)
    if (typeof option !== 'object') return $self.data('lazyImgOption')
    option = {
      ...lazyImgOption,
      ...option,
    }
    $self.data('lazyImgOption', option)
    return $self
  }

  // 提供 lazyload 接口注册需要懒加载的 img
  $.fn.lazyload = function (option) {
    const $self = $(this)
    $self.each(function () {
      reigsterImage($(this), option)
    })
    return $self
  }

  // 注册需要懒加载的 img
  function reigsterImage(jQElem, option) {
    jQElem.lazyImgOption(option || {})
    if (jQElem.prop('tagName') === 'IMG' && !loadImageIfInView(jQElem)) {
      readyJQImages.push(jQElem)
    }
  }

  // 判断是否出现在视口中，并显示
  function loadImageIfInView(jQElem) {
    const dataSrc = jQElem.lazyImgOption().dataSrc
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
    const vh = $(document).outerHeight(true),
      vw = $(document).outerWidth(true)
    return bottom >= 0 && top <= vh && right >= 0 && left <= vw
  }

  // 节流措施
  function throttle(fn, wait) {
    let lastTime = 0
    return function (...args) {
      const now = Date.now()
      if (now - lastTime >= wait) {
        lastTime = now
        return fn.apply(this, args)
      }
    }
  }

  const throttleCheckImage = throttle(function () {
    readyJQImages.forEach(loadImageIfInView)
  }, lazyloadOption.throttleTime)

  // 监听滚动
  $(document).on('scroll', function () {
    throttleCheckImage()
  })
})(jQuery)
