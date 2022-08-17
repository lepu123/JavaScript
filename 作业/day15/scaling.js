function Scaling(images, renderEl) {


    this.small = null
    this.movie = null
    this.big = null
    this.images = images

    // 定义一个初始化方法，用于创建dom元素，并且绑定监听事件
    this.init = function () {
        this.small = document.createElement('div')
        this.movie = document.createElement('div')
        this.big = document.createElement('div')
        var img = document.createElement('img')

        this.small.className = 'small'
        this.movie.className = 'movie'
        this.big.className = 'big'

        img.src = this.images
        this.small.appendChild(img)
        this.small.appendChild(this.movie)

        renderEl.appendChild(this.small)
        renderEl.appendChild(this.big)

        var that = this
        // 初始化三个监听事件
        this.small.onmouseenter = function () {
            that.movie.style.display = 'block'
            that.big.style.display = 'block'
            that.small.onmousemove = function (evt) {
                console.log(evt.offsetX,evt.offsetY)
                that.movieBox(evt)
            }
        }



        this.small.onmouseleave = function () {
            that.movie.style.display = 'none'
            that.big.style.display = 'none'
        }

    }

    // 定义一个方法计算
    this.movieBox = function (e) {
        var that = this
        var movWidth = that.movie.getBoundingClientRect().width
        var movHeight = that.movie.getBoundingClientRect().height
        var x = e.clientX - that.small.offsetLeft - movWidth / 2
        var y = e.clientY - that.small.offsetTop - movHeight / 2



        if (x < 0) {
            x = 0
        } else if (x > that.small.clientWidth - movWidth) {
            x = that.small.clientWidth - movWidth
        }

        if (y < 0) {
            y = 0
        } else if (y > that.small.clientHeight - movHeight) {
            y = that.small.clientHeight - movHeight
        }

        that.movie.style.left = x + 'px'
        that.movie.style.top = y + 'px'

        that.big.style.backgroundPosition = (x / that.small.clientWidth) * 100 * 2 + '% ' + (y / that.small.clientHeight) * 100 * 2 + '%'

    }

    this.init();
}

