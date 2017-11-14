var Arm = Arm || {
    x: 0,
    y: 0,
    length: 100,
    angle: 0,
    parent: null,

    create: function (x, y, length, angle) {
        var obj = Object.create(this)
        obj.init(x, y, length, angle)
        return obj
    },

    init: function (x, y, length, angle) {
        this.x = x
        this.y = y
        this.length = length
        this.angle = angle
    },

    parentAngles: function () {
        var angle = this.angle,
            parent = this.parent
        while (parent) {
            angle += parent.angle
            parent = parent.parent
        }
        return angle
    },

    getEndX: function () {
        return this.x + Math.cos(this.parentAngles()) * this.length
    },

    getEndY: function () {
        return this.y + Math.sin(this.parentAngles()) * this.length
    },

    render: function (context) {
        context.strokeStyle = '#000000'
        context.lineWidth = 1
        context.beginPath()
        context.moveTo(this.x, this.y)
        context.lineTo(this.getEndX(), this.getEndY())
        context.stroke()
    },
}