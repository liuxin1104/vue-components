Function.prototype.myCall = function(context) {
  // `this`指定为`null`或`undefined`时会自动替换为指向全局对象即window
  // 当值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象
  if(typeof context === 'object') {
    if(context === null) context = window
  } else {
    if(context === undefined) context = window
    else context = Object(context)
  }
  context.fn = this // 将函数设为对象context的属性
  // 因为可以传参，且参数不定，因此需要遍历
  var args = []
  // i从1开始是因为第一个参数是this，所以需要忽略
  for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']') // 字符串拼接，即类似于es6语法的 `arguments[${i}]`
  }
  // eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码
  // 在eval中，args自动调用 args.toString()方法，因此最终的效果相当于
  // var result = context.fn(arguments[1], arguments[2], ...)
  var result = eval('context.fn(' + args +')') // 执行函数

  delete context.fn; // 删除函数
  return result // 返回结果
}


// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

console.log(bar.myCall(null))

console.log(bar.myCall(obj, 'kevin', 18))