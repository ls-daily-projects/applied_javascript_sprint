/* If You've gotten this far, you're on your own! Although we will give you some hints:
    1. You will need to grab a reference to the carousel, and in it grab the left and right buttons
    2. You will need to grab a reference to all of the images
    3. Create a current index
    4. Those buttons are gonna need some click handlers.
    5. Think of how you would animate this compoennt. Make the cards slide in and out, or fade. It's up to you!
    6. Have fun!
*/

class Carousel {
    constructor() {
        this.$ = document.querySelector(".carousel")
        this.$track = this.$.querySelector(".carousel-track")
        this.$leftBtn = this.$.querySelector(".left-button")
        this.$rightBtn = this.$.querySelector(".right-button")
        this.$images = this.$track.querySelectorAll("img")

        this.currentImageIndex = 0
        // Assumes all imagse are the same width
        this.imagesWidth = this.$images[this.currentImageIndex].clientWidth

        this.$leftBtn.addEventListener("click", this.goLeft.bind(this))
        this.$rightBtn.addEventListener("click", this.goRight.bind(this))
    }

    goLeft() {
        this.currentImageIndex++

        if (this.currentImageIndex >= this.$images.length) {
            this.currentImageIndex = 0
        }

        this.$track.style.left = `-${this.imagesWidth *
            this.currentImageIndex}px`
    }

    goRight() {
        this.currentImageIndex--

        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.$images.length - 1
        }

        this.$track.style.left = `-${this.imagesWidth *
            this.currentImageIndex}px`
    }
}

const carousel = new Carousel()
