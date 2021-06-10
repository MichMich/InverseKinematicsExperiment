const pi = Math.PI

export default class KinematicsEngine {
  constructor (lengthA, lengthB) {
    this.lengthA = lengthA
    this.lengthB = lengthB

    this.angleA = 0
    this.angleB = 0
    this.targetX = 0
    this.targetY = 0
    this.targetReachable = false
  }

  setPosition (x, y) {
    this.targetX = x
    this.targetY = y

    const distanceFromBaseToTarget = Math.sqrt(x * x + y * y)
    const angleFromBaseToTarget = Math.atan2(x, y) * 180 / pi

    if (distanceFromBaseToTarget >= this.lengthA + this.lengthB) {
      this.angleA = angleFromBaseToTarget * -1
      this.angleB = 0
      this.targetReachable = false

      return
    }

    if (distanceFromBaseToTarget <= this.lengthA - this.lengthB) {
      this.angleA = angleFromBaseToTarget * -1
      this.angleB = angleFromBaseToTarget >= 0 ? 180 : -180
      this.targetReachable = false

      return
    }

    this.targetReachable = true

    // Inner angle alpha
    const cosAngleA = ((distanceFromBaseToTarget * distanceFromBaseToTarget) + (this.lengthA * this.lengthA) - (this.lengthB * this.lengthB)) / (2 * distanceFromBaseToTarget * this.lengthA)
    const angleA = Math.acos(cosAngleA) * 180 / pi

    // Inner angle beta
    const cosAngleB = ((this.lengthB * this.lengthB) + (this.lengthA * this.lengthA) - (distanceFromBaseToTarget * distanceFromBaseToTarget)) / (2 * this.lengthB * this.lengthA)
    const angleB = Math.acos(cosAngleB) * 180 / pi

    // So they work in Unity reference frame
    if (angleFromBaseToTarget >= 0) {
      this.angleA = (angleFromBaseToTarget - angleA) * -1
      this.angleB = (180 - angleB) * -1
    } else {
      this.angleA = (angleFromBaseToTarget + angleA) * -1
      this.angleB = (180 + angleB) * -1
    }

    if (this.angleA < -180) this.angleA += 360
    if (this.angleA > 180) this.angleA -= 360

    if (this.angleB < -180) this.angleB += 360
    if (this.angleB > 180) this.angleB -= 360
  }

  coordinatesA () {
    return {
      x: this.lengthA * Math.sin(this.angleA * pi / 180) * -1,
      y: this.lengthA * Math.cos(this.angleA * pi / 180)
    }
  }

  coordinatesB () {
    return {
      x: (this.lengthB * Math.sin((this.angleB + this.angleA) * pi / 180)) * -1 + this.coordinatesA().x,
      y: (this.lengthB * Math.cos((this.angleB + this.angleA) * pi / 180)) + this.coordinatesA().y
    }
  }

  data () {
    return {
      lengths: {
        lengthA: this.lengthA,
        lengthB: this.lengthB
      },
      angles: {
        angleA: this.angleA,
        angleB: this.angleB
      },
      target: {
        x: this.targetX,
        y: this.targetY,
        reachable: this.targetReachable
      },
      computedCoordinates: {
        A: this.coordinatesA(),
        B: this.coordinatesB()
      }
    }
  }
}
