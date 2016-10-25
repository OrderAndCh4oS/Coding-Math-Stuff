window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        velocity = 10,
        particles = [],
        num = 100;

    for(var i = 0; i < num; i += 1) {
        particles.push(particle.create(width/2, height/3, Math.random()*7+2, Math.random() * Math.PI * 2, 0.1));
    }
    update();

    function update() {
        context.clearRect(0, 0, width, height);

        for(var i = 0; i < num; i += 1) {
            p = particles[i];
            p.update();

            context.beginPath();
            context.arc(p.position.getX(), p.position.getY(), 4, 0, Math.PI * 2, false);
            context.fill();
        }
        requestAnimationFrame(update);
    }
};

