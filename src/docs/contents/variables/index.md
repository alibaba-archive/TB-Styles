---
title: Variables
---

## Overview
在 [CSS Style Guide](https://github.com/teambition/standard/blob/master/css-style-guide.md#mixin--variable) 中提到关于 Variable 的建议：
- Mixin 与 Variable 采用驼峰命名法
- Variable 名字使用 $ 作为前缀

框架中充满大量（50 个）全局的 Mixin 与 Variable，是应该被反对的  
如果想让变量具有语义，欢迎放到局部作用域中

## Variables List

### Colors
Check out [TB-Colors](http://teambition.github.io/TB-Colors) to see all colors.  
在 [GitHub](https://github.com/teambition/TB-Colors) 上可以找到 TB-Colors 的使用方式，分类与所有变量  
Brand Colors 可以在 `_variables/colors.styl` 中查看与定义

### Layout
```
$screenXS    = 480px
$screenSM    = 768px
$screenMD    = 992px
$screenLG    = 1200px
$screenXSMax = ($screenSM - 1)
$screenSMMax = ($screenMD - 1)
$screenMDMax = ($screenLG - 1)
```

### Shadows
```
$shadowTB = 0 7px 21px rgba(0, 0, 0, .1)
```

### Time
```
$time = 218ms
```

### _deprecated
The variables collection is deprecated, converted from Less.
