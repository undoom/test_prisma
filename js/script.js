function initMenuToggle() {
    const toggles = document.querySelectorAll(".menu-toggle");

    console.log(toggles);

    if (!toggles) { return; }


    toggles.forEach((toggle) => {
        toggle.addEventListener("click", function () {
            let parentNavTag = toggle.parentNode;

            if (parentNavTag.tagName != "NAV") {
                do {
                    parentNavTag = parentNavTag.parentNode;
                } while (parentNavTag.tagName != "NAV");
            }

            parentNavTag.classList.toggle("active");

            if (toggle.getAttribute("aria-expanded") === 'false') {
                toggle.setAttribute("aria-expanded", "true");
            } else {
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    });
}

class Parallax {
    constructor(element, speed = 60) {
        this.element = element;
        this.speed = speed;
        this.windowHeight = window.innerHeight;
        this.scrollPosition = 0;

        let elementComputedStyles = window.getComputedStyle(this.element);
        let initialPosition = elementComputedStyles.getPropertyValue("background-position").split(" ");
        this.basePosition = parseInt(initialPosition[1], 10);

        const throttledParallax = throttle(() => this.handleScroll(), 10);

        window.addEventListener('scroll', () => throttledParallax());
        window.addEventListener('touchmove', () => throttledParallax());
    }

    handleScroll() {
        this.scrollPosition = this.element.getBoundingClientRect().top;
        const newPosition = this.basePosition - ((this.scrollPosition * this.speed) / this.windowHeight);
        this.element.style.backgroundPosition = `50% ${newPosition}%`;
    }
}

class keepInViewport {
    constructor(element) {
        this.element = element;
        this.container = this.element.parentNode;
        this.topPosition = 0;

        let elementComputedStyles = window.getComputedStyle(this.container);
        this.initialPadding = parseInt(elementComputedStyles.getPropertyValue("padding-top"), 10);
        this.maxTop = this.container.getBoundingClientRect().height - this.element.getBoundingClientRect().height - this.initialPadding;

        const throttledKeepInView = throttle(() => this.keepInView(), 10);
        window.addEventListener('scroll', throttledKeepInView);
    }

    keepInView() {
        console.log(this.container.getBoundingClientRect().top);
        if (this.container.getBoundingClientRect().top + this.initialPadding < 0) {
            this.topPosition = -(this.container.getBoundingClientRect().top + this.initialPadding)
            if (this.topPosition < this.maxTop) {
                this.element.style.top = this.topPosition + "px";
            }
        }
    }
}

function initAds() {
    let ads = document.querySelectorAll(".ads");
    let adsInitiated = [];

    ads.forEach((ad) => {
        adsInitiated.push(new keepInViewport(ad));
    });
}

function throttle(fn, wait) {
    var time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initMenuToggle();

    initAds();

    const parallaxHeader = new Parallax(document.querySelector("header"), 100);
    const parallaxLogo = new Parallax(document.querySelector("header .logo"), 60);

    const parallaxBanner1 = new Parallax(document.querySelector(".banner.killoren"), 50);
    const parallaxBanner2 = new Parallax(document.querySelector(".banner.stormtroopers"));

});
