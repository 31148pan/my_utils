/* 方法目录
 * DOM相关》》
 * getElementsByClassName  通过class类名获取dom节点，返回值为 HTMLCollection 对象。兼容IE8.
 * addEventListener  添加监听事件，兼容IE8
 * removeEventListener 移除监听事件，兼容IE8
 * getComputedStyle  获取元素css样式，返回值为字符串，兼容IE8。
 * hasClass   判断元素是否含有某个类型。返回值为Boolean。兼容IE8.
 * addClass   添加类名，兼容IE8.
 * removeClass   移除类名，兼容IE8.
 * stop   阻止事件冒泡，兼容IE8.
 * prevent   阻止事件默认行为，兼容IE8.
 * 
 * JS相关》》
 *
 * typeof 判断数据类型，返回值为Boolean。兼容IE8.
 * uniqueArray。数组去重。无法去重对象及空对象。不兼容IE8.
 * unique。数组去重，任意数据类型都可去重。不兼容IE8.
 * resetArr  随机打乱数组顺序。不兼容IE8.
 * browserInfo 手机浏览器类型判断，返回值boolean。若都不符合返回浏览器 userAgent 字段。
 * getCookie 获取cookie,返回值为字符串.
 * randomNum 随机生成指定范围数字，返回值Number类型。
 * 
 * 性能优化
 * debounce 防抖函数，用于高频触发事件，减少请求
 * throttle 节流函数
 * 
 * 
 * 移动端bug解决方法总结
 * 问题描述：IOS系统 input输入框失去焦点，软键盘关闭后，被撑起的页面无法回退到原来正常的位置，导致弹框里的按钮响应区域错位
     *解决方案 给输入框绑定 onblur 事件，让页面自动滚动到顶部
 function(){
      setTimeout(function() {
          var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
           window.scrollTo(0, Math.max(scrollHeight - 1, 0));
     }, 100);
  }
 *问题描述： Android 弹出的键盘挡住输入框
     *解决方法 绑定focus事件
     function (){
         let  u = navigator.userAgent,app=navigator.appVersion;
         let isAndroid = u.toLowerCase().indexOf('android')>-1 ||  u.toLowerCase().indexOf('linux')>-1;
         if(isAndroid){
           serTimeout(function(){
             document.activeElement.scrollIntoViewIfNeeded();
             document.activeElement.scrollIntoView();
           })
         }
     }
 * 
 */
module.exports = {
  getCookie: (name) => {
    /* 参数一 为获取cookie的键值，字符串形式 */
    const arr = document.cookie.replace(/\s+/g, "").split(";");
    for (let i = 0; i < arr.length; i++) {
      const newArr = arr[i].split("=");
      if (newArr[0] == name) {
        return decodeURIComponent(newArr[1]);
      }
    }
    return '';
  },
  randomNum: (min, max) => {
    return Math.ceil(min + Math.random() * (max - min))
  },
  getElementsByClassName: (element, className) => {
    /* 参数一 目标对象，数据类型为dom元素对象 参数二 类名，数据类型为字符串
       解决思路
       首先判断当前浏览器是否支持该方法，支持则直接使用，不支持，则通过标签名获取所有dom节点
       遍历这个节点列表通过className属性获取对应的属性值（形如:' a b c'），并使用字符串 split() 方法将其转为数组，
       遍历这个数组，如果找到与之相符的类名，就将当前节点存进新数组中
    */
    if (element.getElementsByClassName) {
      return element.getElementsByClassName(className);
    } else {
      const filterArr = [];
      const elements = element.getElementsByTagName("*");
      for (let i = 0; i < elements.length; i++) {
        let nameArr = elements[i].className.split(" ");
        for (let j = 0; j < nameArr.length; j++) {
          if (nameArr[j] === className) {
            filterArr.push(elements[i]);
            break;
          }
        }
      }
      return filterArr
    }
  },
  addEventListener: (element, type, handler) => {
    /*
      参数一 监听的dom对象
      参数二 监听的事件类型
      参数三 事件处理函数
    */
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (window.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  removeEventListener: (element, type, handler) => {
    /*
    参数一 移除监听的对象
    参数二 移除的事件类型
    参数三 移除的事件处理函数
  */
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },
  getComputedStyle: (element, styleName) => {
    /* 参数一 表示要获取样式的dom对象，
       参数二 表示要获取的样式属性名（字符串形式）
    */
    return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(styleName) : element.currentStyle[styleName];
  },
  hasClass: (obj, classStr) => {
    /* 
      参数一 dom节点对象
      参数二 获取的类名 
     */
    if (obj.className && obj.className.replace(/\s+/g, "") !== "") {
      var arr = obj.className.split(/\s+/);
      return (arr.indexOf(classStr) == -1) ? false : true;
    } else {
      return false;
    }
  },
  addClass: (obj, classStr) => {
    if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
      for (var i = 0, len = obj.length; i < len; i++) {
        if (!this.hasClass(obj[i], classStr)) {
          obj[i].className += " " + classStr;
        }
      }
    } else {
      if (!this.hasClass(obj, classStr)) {
        obj.className += " " + classStr;
      }
    }
  },
  removeClass: (obj, classStr) => {
    if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
      for (var i = 0, len = obj.length; i < len; i++) {
        if (this.hasClass(obj[i], classStr)) {
          var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
          obj[i].className = obj[i].className.replace(reg, '');
        }
      }
    } else {
      if (this.hasClass(obj, classStr)) {
        var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
      }
    }
  },
  replaceClass: (obj, newName, oldName) => {
    this.removeClass(obj, oldName);
    this.addClass(obj, newName);
  },
  stop: (e) => {
    if (e && e.stopPropagation)
      e.stopPropagation();
    else
      window.event.cancelBubble = true;
  },
  prevent: (e) => {
    if (e && e.preventDefault)
      e.preventDefault();
    else
      window.event.returnValue = false;
    return false;
  },
  typeof: (obj, type) => {
    /*
     参数一 表示传入要判断的数据对象；对象形式。
     参数二 表示要做比较的数据类型。字符串形式。
    */
    if (type) {
      var _type = type.toLowerCase();
    }
    switch (_type) {
      case 'string':
        return Object.prototype.toString.call(obj) === '[object String]';
      case 'number':
        return Object.prototype.toString.call(obj) === '[object Number]';
      case 'boolean':
        return Object.prototype.toString.call(obj) === '[object Boolean]';
      case 'undefined':
        return Object.prototype.toString.call(obj) === '[object Undefined]';
      case 'null':
        return Object.prototype.toString.call(obj) === '[object Null]';
      case 'function':
        return Object.prototype.toString.call(obj) === '[object Function]';
      case 'array':
        return Object.prototype.toString.call(obj) === '[object Array]';
      case 'object':
        return Object.prototype.toString.call(obj) === '[object Object]';
      case 'nan':
        return isNaN(obj);
      case 'elements':
        return Object.prototype.toString.call(obj).indexOf('HTML') !== -1
      default:
        return Object.prototype.toString.call(obj)
    }
  },
  trim: (str, type) => {
    /*
     参数一 表示要处理的字符串
     参数二 表示去除空格的类型等级 
         1 、去除全部空格
         2、去除左右空格
         3、去除前空格
         4、去除后空格
         其他，返回原始值。
     */
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  },
  uniqueArray: (arr) => {
    return arr.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });
  },
  unique: (arr) => {
    var obj = {};
    return arr.filter(function (item, index, arr) {
      // 防止key重复
      let newItem = item + JSON.stringify(item)
      return obj.hasOwnProperty(newItem) ? false : obj[newItem] = true
    })
  },
  resetArr: (arr) => {
    return arr.sort(() => {
      return Math.random() - 0.5
    });
  },
  browserInfo: (type) => {
    const userAgent = navigator.userAgent.toLowerCase();
    switch (type) {
      case 'android':
        return userAgent.indexOf('android') !== -1;
      case 'iphone':
        return userAgent.indexOf('iphone') !== -1;
      case 'ipad':
        return userAgent.indexOf('ipad') !== -1;
      case 'weixin':
        return userAgent.indexOf('micromessenger') !== -1;
      default:
        return userAgent
    }
  },
  debounce: (fn, delay = 500, rightnow) => {
    /*防抖(触发事件后，在n秒内函数只能执行一次，如果在 n 秒内重复触发了事件，则会重新计算函数执行时间。)
      参数一 需要防抖的函数
      参数二 防抖的时间间隙，在此间隙内防抖函数不会执行，单位毫秒
      参数三 触发事件后是否立即执行,类型为Boolean。
    */
    let timer = null;
    return function (event) {
      const event = event || window.event
      const _this = this;
      if (timer) {
        clearTimeout(timer)
      } //判断定时器是否运行，有定时器则说明当前正在一个计时过程中，即又触发了相同事件。所以取消当前计时，重新开始计时
      if (rightnow) {
        fn.call(this, event)
      }
      timer = setTimeout(function () {
        fn.call(_this, event);
        rightnow = false;
      }, delay)
    }
  },
  throttle: (fn, delay = 500) => {
    /*节流功能函数（触发事件后,n秒后只会执行一次），这里第一次和最后一次都会执行*/
    //参数一为回调函数 参数二为延时的事件
    var last = 0,
      now,
      leftTime,
      _this,
      timer = null;
    return function (e) {
      _this = this;
      now = Date.now();
      leftTime = delay - (now - last); //触发事件剩余时间
      if (leftTime <= 0) { //小于0表示事件可以执行
        if (timer) {
          clearTimeout(timer);
        }
        fn.apply(_this, [e]);
        last = now;
      } else if (!timer) { //确保第一次和最后一次能够执行
        timer = setTimeout(function () {
          last = now;
          fn.apply(_this, [e]);
        }, delay)
      }
    };
  }
}