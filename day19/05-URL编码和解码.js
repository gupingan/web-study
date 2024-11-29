// URI (Uniform ResourceIdentifiers,通用资源标识符)进行编码，以便发送给浏览器。有效的URI中不能包含某些字符，
// 例如空格。而这URI编码方法就可以对URI进行编码，它们用特殊的UTF-8编码替换所有无效的字符，从而让浏览器能够接受和理解
// encodeURIComponent() //把字符串作为 URI 组件进行编码
// decodeURIComponent() //把字符串作为 URI 组件进行解码
let url = 'https://www.cnblogs.com/gupingan/'
console.log(encodeURIComponent(url))
// https%3A%2F%2Fwww.cnblogs.com%2Fgupingan%2F
console.log(decodeURIComponent(encodeURIComponent(url)))
// https://www.cnblogs.com/gupingan/