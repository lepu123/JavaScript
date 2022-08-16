// 工厂模式对项目中不同的模块,不同业务逻辑可以进行面向对象封装,
// 但是同一个工厂模式生成多个对象之间并没有代码层面的联系

// 为了解决这个问题,js提供了构造函数模式
// 构造函数模式,看起来与普通函数相同(本质上就是一个普通函数)
// 使用者同关键字 new 调用构造函数

// 注意: 在js中为了区分普通函数和构造函数,我们约定所有构造函数首字母大写
function Carousel(images, renderEl) {
    // 构造函数模式中,我们使用this关键字作为当前构造函数生成的实例对象

    this.box = null
    // 轮播图中存放图片的列表
    this.ul = null
    // 轮播图小圆点
    this.dots = []
    // 轮播图接受的图片数组
    this.images = images
    // 轮播图显示第几张下标索引
    this.index = 0
    // 自动轮播时的计时器id
    this.timer = null
    // 定义了一个初始化方法,用于创建DOM元素,并绑定事件监听方法
    this.init = function () {
        this.box = document.createElement('div')
        this.box.className = 'carousel'

        this.ul = document.createElement('ul')
        this.box.appendChild(this.ul)
        // 后续代码无需使用 pageControl 所以就不创建一个属性给他
        var pageControl = document.createElement('div')
        pageControl.className = 'page-control'
        this.box.appendChild(pageControl)

        for (var i = 0; i < this.images.length; i++) {
            var li = document.createElement('li')
            var img = document.createElement('img')
            img.src = this.images[i]
            li.appendChild(img)

            var dot = document.createElement('span')
            dot.className = 'dot'

            this.ul.appendChild(li)

            pageControl.appendChild(dot)

            this.dots.push(dot)
        }

        renderEl.appendChild(this.box)

        var that = this

        // 初始化监听两个事件
        this.box.onmouseenter = function () {
            // 这里的this 是 box
            clearInterval(that.timer)
        }

        this.box.onmouseleave = function () {
            // 这里的this 是 box
            that.autoPlay()
        }
        // 初始化时自动开启轮播    
        that.autoPlay()
    }
    // 定义一个方法展示下一张图片
    this.next = function () {
        // 展示下一张图
        this.index++
        // 如果最后一张回到第一张
        this.index = this.index % this.images.length

        for (var i = 0; i < this.images.length; i++) {
            this.dots[i].className = 'dot'
        }
        // ul偏移显示对应的图片    
        this.ul.style.left = this.index * (-460) + 'px'
        this.dots[this.index].className = 'dot active'
    }
    // 定义一个方法用于自动轮播
    this.autoPlay = function () {
        var that = this
        this.timer = setInterval(function () {
            // 注意该函数内的this是window
            that.next()
        }, 1000)
    }

    this.init()
}
