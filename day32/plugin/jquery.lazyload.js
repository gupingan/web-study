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

  const throttleCheckImage = throttle((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const jQElem = $(entry.target)
        const src = jQElem.attr(jQElem.lazyImgOption().dataSrc)
        jQElem.attr('src', src)
        io.unobserve(entry.target)
      }
    })
  }, lazyloadOption.throttleTime)

  const io = new IntersectionObserver(throttleCheckImage)

  // 设置/获取 配置参数
  $.lazyloadOption = function (option)  {
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
    if (jQElem.prop('tagName') === 'IMG') {
      io.observe(jQElem[0])
    }
  }

  // 节流函数
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
})(jQuery)