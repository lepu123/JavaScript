/**
 * @param images
 * @param {String[]} images
 * @param render
 * @param {Element}render
 * @constructor
 */



function Carousel(images, render) {

    this.render = render
    this.images = images
    this.index = 0
    this.boxWidth = 0
    this.box = null
    this.timer = null
    this.ul = null
    this.init()
}

Carousel.prototype.init = function () {
    var box = document.createElement('div')
    box.className = 'box'
    this.ul = document.createElement('ul')
    this.ul.className = 'ul'


    for (var i = 0; i < images.length; i++) {
        var li = document.createElement('li')
        li.className = 'item'
        var img = document.createElement('img')
        img.src = this.images[i]
        li.appendChild(img)
        this.ul.appendChild(li)
    }

    box.appendChild(this.ul)
    this.render.appendChild(box)
    this.boxWidth = parseInt(getComputedStyle(box, null).width)
    this.startMove()
}

Carousel.prototype.startMove = function () {
    var self = this

    this.timer = setInterval(function () {
        self.nextPage()
    }, 3000)

}

Carousel.prototype.nextPage = function () {
    this.index++
    console.log(-this.boxWidth * this.index)
    var x = -this.boxWidth * this.index
    if (this.index < this.images.length) {
        animation(this.ul, {left: x})
    } else {
        this.index = 0
        animation(this.ul, {left: 0})
    }

}
