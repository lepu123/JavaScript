function animation(el, styleObj, cb) {
    clearInterval(el.timer)

    el.timer = setInterval(function () {
        var finish = true

        for (var attr in styleObj) {
            // 获取元素的当前值
            var value = parseInt(getComputedStyle(el,null)[attr])
            // console.log(value);

            // 定义一个速度
            // styleObj[attr] 目标
            //
            var speed = (styleObj[attr] - value) / 10

            // console.log(speed);

            if (speed !== 0) {
                finish = false
                //  speed > 0 运动正向运动
                // speed < 0 运动反向运动
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
                // speed = speed > 0 ? 1 : -1
                el.style[attr] = value + speed + 'px'
            }
        }

        if (finish) {
            clearInterval(el.timer)
        }

    }, 20);

}