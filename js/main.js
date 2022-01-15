
/* ----------------------------------------- Navigation Menu ----------------------------------------- */
(() => {

    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        navOptions = document.querySelector(".nav-options"),
        menuBranding = document.querySelector(".menu-branding"),
        navItem = document.querySelectorAll(".nav-item"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add("open");
        navOptions.classList.add("open");
        menuBranding.classList.add("open");
        navItem.forEach((item) => {
            item.classList.add("open");
        })
        bodyScrollingToggole();
    }
    function hideNavMenu() {
        navMenu.classList.remove("open");
        navOptions.classList.remove("open");
        menuBranding.classList.remove("open");
        navItem.forEach((item) => {
            item.classList.remove("open");
        })
        bodyScrollingToggole();
    }

    // Attach an event handler to document
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains('link-item')) {
            // Make sure event.target.hash has a value before overridding default behavior 
            if (event.target.hash !== "") {
                // Prevent default anchor click behavior
                event.preventDefault();
                const hash = event.target.hash;
                // Deactivating existing active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // Activating new 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // Deactivate existing  active navigation menu 'link-item'
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                /* If Clicked 'linded-item' is contained within the navigation menu */
                if (navMenu.classList.contains("open")) {
                    // Activate new navigation menu 'link-item'
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    // Hide Nvigation Menu
                    hideNavMenu();

                }
                else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                }
                // Add hash to URL 
                window.location.hash = hash;
            }
        }

    })
})();

/* ------------------------------------------ About Section Tabs ---------------------------------------------- */

(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        /* if event.target contains 'tab-item' class and not contains 'active' class */
        if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            // Deactivating existing active 'tab-item'
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // Activating new 'tab-item'
            event.target.classList.add("active", "outer-shadow");
            // Deactivating existing active 'tab-content'
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            // Activating new 'tab-content'
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

function bodyScrollingToggole() {
    document.body.classList.toggle("hidden-scrolling");
}

/* --------------------------------------------- Typing about Info --------------------------------------------- */

let textLength = 0;
function type() {
    let text = 'Hello ! My name is Shimanto Rehman. Im a 4th year undergraduate student at SUST, Sylhet pursuing BSc in Computer Science and Engineering. Im a passionate learner whos always willing to learn and work across technologies and domains. I love to explore new technologies and leverage them to solve real-life problems. Apart from that I also love to guide and mentor newbies. Im currently into Web Development and working on my Data Structures and Algorithms.';
    let textChar = text.charAt(textLength++);
    let paragraph = document.getElementById("typed");
    let charElement = document.createTextNode(textChar);
    paragraph.appendChild(charElement);
    if (textLength < text.length + 1) {
        setTimeout('type()', 50);
    } else {
        text = '';
    }
    text = '';
}

document.getElementById("about-type").onclick = function () {
    type();
};
document.getElementById("about-type1").onclick = function () {
    type();
};


/* ------------------------------------------ Portfolio filter & popup ---------------------------------------------- */
(() => {

    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    /* Filter Portfolio Items*/
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains("active")) {
            // Deactivating existing active "filter-item"
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // Activating new 'filter-item'
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            //Get the portfolioItem Index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // Convert Screenshots to Array
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggole();
    }
    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        /* Activate Loader Until The popupImg loaded */
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            //  Deactivate Loader after popupImg loaded
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }
    // Next Slide
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        popupSlideshow();
    })
    // Prev Slide
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        }
        else {
            slideIndex--;
        }
        popupSlideshow();
    })
    function popupDetails() {
        //if portfolio-item-details not exist
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            projectDetailsBtn.style.display = "none";
            return; /* End Function Execution */
        }

        projectDetailsBtn.style.display = "block";
        // Get the project details
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        // Set the Project Details
        popup.querySelector(".pp-project-details").innerHTML = details;
        // Get the Project Title
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        // Set Project Title
        popup.querySelector(".pp-title h2").innerHTML = title;
        // Get Project Category
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        // Set Project Category
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }
    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })
    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }
        else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

})();



/* ------------------------------------ Testimonial Slider ------------------------------------------ */

(() => {
    const sliderContainer = document.querySelector(".testi-slider-container"),
        slides = sliderContainer.querySelectorAll(".testi-item");
    slideWidth = sliderContainer.offsetWidth;
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
        nextBtn = document.querySelector(".testi-slider-nav .next");
    activeSlide = sliderContainer.querySelector(".testi-item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    // Set Width of All Slides
    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    })
    // Set Width of slideContainer
    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () => {
        if (slideIndex === slides.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        slider();
    })
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = slides.length - 1;
        }
        else {
            slideIndex--;
        }
        slider();
    })
    function slider() {
        // Deactivate existing active Slides
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        // Active New Slide
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();
})();




/* ----------------------------------- Hide All Sections Except Active ------------------------------------ */

(() => {

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })

})();


/* ------------------------------------------ Pre-Loader ---------------------------------------------- */

window.addEventListener("load", () => {
    // Preloader
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    }, 600)
})


/* -------------------------------------------- 3D profile pic --------------------------------------------*/
var moveForce = 14; // max popup movement in pixels
var rotateForce = 14; // max popup rotation in deg

$(document).mousemove(function (e) {
    var docX = $(document).width();
    var docY = $(document).height();

    var moveX = (e.pageX - docX / 2) / (docX / 2) * -moveForce;
    var moveY = (e.pageY - docY / 2) / (docY / 2) * -moveForce;

    var rotateY = (e.pageX / docX * rotateForce * 2) - rotateForce;
    var rotateX = -((e.pageY / docY * rotateForce * 2) - rotateForce);

    $('.popup')
        .css('left', moveX + 'px')
        .css('top', moveY + 'px')
        .css('transform', 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
});
