var shipClass = {
    position: null,
    velocity: null,
    gravity: null,
    thrust: null,
    thrusting: false,
    mass: 1,
    radius: 0,
    bounce: -1,
    angle: 0,
    turning: false,
    direction: "left",
    turningCountdown: 0,
    thrustingCountdown: 0,

    create: function(x, y, speed, direction, gravity) {
        var obj = Object.create(this);
        obj.position = vector.create(x, y);
        obj.velocity = vector.create(0, 0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.gravity = vector.create(0, gravity || 0);
        return obj;
    },

    accelerate: function(accel) {
        this.velocity.addTo(accel);
    },

    update: function() {
        var thrust = vector.create(0, 0);

        if (this.thrustingCountdown === 0) {
            this.thrusting = false;
            if(Math.random() > 0.8) {
                this.thrusting = true;
                this.thrustingCountdown = Math.floor(Math.random() * 10) + 1;
            }
        }

        if (this.turningCountdown === 0) {
            this.direction = Math.random() < 0.5 ? "left" : "right";
            if(Math.random() > 0.7) {
                this.turningCountdown = Math.floor(Math.random() * 5) + 1;
            }
        } else {
            if (this.direction === "left ") {
                this.turnLeft();
            } else {
                this.turnRight();
            }
            thrust.setAngle(this.angle);
            this.turningCountdown--;
        }

        if (this.isThrusting()) {
            thrust.setLength(0.1);
            this.thrustingCountdown--;
        } else {
            thrust.setLength(0);
        }

        this.accelerate(thrust);

        this.velocity.addTo(this.gravity);
        this.position.addTo(this.velocity);
    },

    angleTo: function(p2) {
        return Math.atan2(
                p2.position.getY() - this.position.getY(),
                p2.position.getX() - this.position.getX()
                );
    },

    distanceTo: function(p2) {
        var dx = p2.position.getX() - this.position.getX(),
            dy = p2.position.getY() - this.position.getY();
        return Math.sqrt(dx * dx + dy * dy);
    },

    gravitateTo: function(p2) {
        var gravity = vector.create(0, 0),
            dist = this.distanceTo(p2);

        gravity.setLength(p2.mass / (dist * dist));
        gravity.setAngle(this.angleTo(p2));

        this.velocity.addTo(gravity);
    },

    toggleThrusting: function () {
      this.thrusting = !this.thrusting;
    },

    isThrusting: function() {
        return this.thrust !== null;
    },
    
    turnLeft: function () {
        this.angle -= 0.05;
        this.turning = true;
    },

    turnRight: function () {
        this.angle += 0.05;
        this.turning = true;
    },

    stopTurning: function () {
        this.turning = false;
    },
    
    isTurning: function () {
        return this.turning;
    }
};
