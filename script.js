// ---------------------------script for loading screen and light mode toggle---------------------------
document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    if (!sessionStorage.getItem('hasVisited')) {
        // Create and add loader only on first visit
        const loaderHTML = `
            <div id="loader-wrapper">
                <div class="container">
                    <div class="loader"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        
        const loader = document.getElementById("loader-wrapper");
        
        // Hide loader after content is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Mark that user has visited
                    sessionStorage.setItem('hasVisited', 'true');
                }, 500);
            }, 2500);
        });
    }


    const modeToggle = document.querySelector(".mode-change i");

    modeToggle.addEventListener("click", () => {
        // Toggle light mode class on the body
        document.body.classList.toggle("light-mode");

        // Apply or remove light-mode class from specific elements
        document.querySelector(".header").classList.toggle("light-mode");
        document.querySelectorAll(".navbar li").forEach(item => {
            item.classList.toggle("light-mode");
        });
        document.querySelector(".tooltip").classList.toggle("light-mode");

        // Change icon and tooltip text dynamically
        if (document.body.classList.contains("light-mode")) {
            modeToggle.classList.replace("fa-sun", "fa-moon");
            modeToggle.nextElementSibling.textContent = "Dark Mode";
        } else {
            modeToggle.classList.replace("fa-moon", "fa-sun");
            modeToggle.nextElementSibling.textContent = "Light Mode";
        }
    });
});


// --------------------------go to top ----------------------------
document.addEventListener("DOMContentLoaded", () => {
    const goToTopButton = document.getElementById("go-to-top");
    const footer = document.querySelector("footer");

    if (goToTopButton && footer) {
        // Detect when the footer is visible in the viewport
        window.onscroll = function () {
            const footerPosition = footer.getBoundingClientRect();
            const isFooterVisible = footerPosition.top <= window.innerHeight && footerPosition.bottom >= 0;

            if (isFooterVisible) {
                goToTopButton.style.display = "flex";
            } else {
                goToTopButton.style.display = "none";
            }
        };

        // Scroll to Top Functionality
        goToTopButton.onclick = function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
    } else {
        console.error("Go to Top button or footer not found in the DOM.");
    }
});


// ------------------------------ dynamic navbar color and scroll indicator in home page ---------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Get all sections and nav links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Function to update active nav link
    const updateActiveLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    };

    // Function to check which section is in view
    const handleScroll = () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY;
            
            // Add some offset for better UX
            if (scrollPosition >= (sectionTop - sectionHeight/3)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        updateActiveLink(currentSection);
    };

    // Handle click events for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active state
                updateActiveLink(targetId);
            }
        });
    });

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Call handleScroll initially to set active state on page load
    handleScroll();

    // Optional: Add intersection observer for better performance
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});


// ---------------------------------- for about me tabs --------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    
    const experienceContent = `
        <div class="experience-content active">
            <div class="experience-item">
                <div class="experience-date">2021 - Current</div>
                <div class="experience-title">ML Developer</div>
                <div class="experience-company">Current Company</div>
            </div>
        </div>
    `;
    
    const educationContent = `
        <div class="education-content">
            <div class="experience-item">
                <div class="experience-date">2017 - 2021</div>
                <div class="experience-title"> Computer Science</div>
                <div class="experience-company">University Name</div>
            </div>
        </div>
    `;

    // Function to update content based on selected tab
    function updateContent(selectedTab) {
        const contentContainer = document.querySelector('.tab-content');
        const currentActive = contentContainer.querySelector('.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        
        switch (selectedTab) {
            case 'Experience':
                contentContainer.innerHTML = experienceContent;
                contentContainer.querySelector('.experience-content').classList.add('active');
                break;
            case 'Education':
                contentContainer.innerHTML = educationContent;
                contentContainer.querySelector('.education-content').classList.add('active');
                break;
        }
    }

    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Update content based on selected tab
            updateContent(tab.textContent.trim());
        });
    });

    // Set initial content (Experience tab)
    updateContent('Experience');
});