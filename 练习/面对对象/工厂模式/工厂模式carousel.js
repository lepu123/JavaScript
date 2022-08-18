function createCarousel(images, renderEl) {
    // 用字面量的形式创建一个对象
    // 对象的属性跟方法都是服务于当前对自身,会使得我们的轮播图代码再次进行封装
    // 因为属性与方法的关系,函数内部的代码关联性将会更加紧密,逻辑将会更加清晰
    var carousel = {
        // box 整个轮播图的大盒子
        box: null,
        // 轮播图中存放图片的列表
        ul: null,
        // 轮播图小圆点
        dots: [],
        // 轮播图接受的图片数组
        images: images,
        // 轮播图显示第几张下标索引
        index: 0,
        // 自动轮播时的计时器id
        timer: null,
        // 定义了一个初始化方法,用于创建DOM元素,并绑定事件监听方法
        init: function () {
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
        },
        // 定义一个方法展示下一张图片
        next: function () {
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
        },
        // 定义一个方法用于自动轮播
        autoPlay: function () {
            var that = this
            this.timer = setInterval(function () {
                // 注意该函数内的this是window
                that.next()
            }, 1000)
        }

    }

    carousel.init()

    return carousel
}


