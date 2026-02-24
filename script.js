// VIBE CODING - Portfolio Website
console.log('VIBE CODING - Portfolio loaded');

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling behavior
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add navigation logic here if needed
        });
    });

    // Add hover effects for work cards
    const workCards = document.querySelectorAll('.other-work-card');
    workCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.opacity = '0.9';
            this.style.transition = 'opacity 0.3s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });

    // Sync hover effects between work items and images
    const workItems = document.querySelectorAll('.work-item');
    const workImageLinks = document.querySelectorAll('.work-image-link');

    workItems.forEach(item => {
        const workNumber = item.getAttribute('data-work');
        const correspondingImage = document.querySelector(`.work-image-link[data-work="${workNumber}"]`);

        if (correspondingImage) {
            item.addEventListener('mouseenter', function() {
                const baseImg = correspondingImage.querySelector('.work-image-base');
                const overlayImg = correspondingImage.querySelector('.work-image-overlay');
                if (baseImg) baseImg.style.opacity = '0';
                if (overlayImg) overlayImg.style.opacity = '1';
            });

            item.addEventListener('mouseleave', function() {
                const baseImg = correspondingImage.querySelector('.work-image-base');
                const overlayImg = correspondingImage.querySelector('.work-image-overlay');
                if (baseImg) baseImg.style.opacity = '1';
                if (overlayImg) overlayImg.style.opacity = '0';
            });
        }
    });

    // Also handle hover on image links themselves
    workImageLinks.forEach(link => {
        const workNumber = link.getAttribute('data-work');
        const correspondingItem = document.querySelector(`.work-item[data-work="${workNumber}"]`);

        if (correspondingItem) {
            link.addEventListener('mouseenter', function() {
                const baseImg = this.querySelector('.work-image-base');
                const overlayImg = this.querySelector('.work-image-overlay');
                if (baseImg) baseImg.style.opacity = '0';
                if (overlayImg) overlayImg.style.opacity = '1';
            });

            link.addEventListener('mouseleave', function() {
                const baseImg = this.querySelector('.work-image-base');
                const overlayImg = this.querySelector('.work-image-overlay');
                if (baseImg) baseImg.style.opacity = '1';
                if (overlayImg) overlayImg.style.opacity = '0';
            });
        }
    });

    // Hero section animation
    const heroMove = document.querySelector('.hero-move');
    const heroIntro = document.querySelector('.hero-intro');
    const cubeMover = document.querySelector('.cube-mover');
    const cubeRotator = document.querySelector('.cube-rotator');
    const cubeVideos = document.querySelectorAll('.cube-video');

    // Start cube videos (autoplay)
    if (cubeVideos.length > 0) {
        cubeVideos.forEach(function(video) {
            video.play().catch(function(error) {
                console.log('Video autoplay prevented:', error);
            });
        });
    }

    if (heroMove && heroIntro) {
        // Set initial position 75px to the right (95px - 20px = 75px)
        heroMove.style.transform = 'translateX(75px)';
        
        // Start animation after page load
        setTimeout(function() {
            // Move the hero-move group 318px to the left from initial position (75px - 318px = -243px)
            heroMove.style.transform = 'translateX(-243px)';
            
            // Rotate the cube as it moves
            // Rotate along Y-axis (vertical axis parallel to the page)
            // Rotate 180 degrees in opposite direction
            if (cubeRotator) {
                cubeRotator.style.transform = `rotateY(-180deg)`;
            }
            
            // Show intro after animation completes (2 seconds)
            setTimeout(function() {
                heroIntro.classList.add('visible');
            }, 2000);
        }, 100);
    }

    // Experience page expand/collapse functionality
    const expandButtons = document.querySelectorAll('.section-expand');
    
    expandButtons.forEach(button => {
        const section = button.closest('.experience-section');
        const projectItems = section.querySelectorAll('.project-item');
        
        // Initially hide all project items
        projectItems.forEach(item => {
            item.style.maxHeight = '0';
            item.style.overflow = 'hidden';
            item.style.opacity = '0';
            item.style.transition = 'max-height 0.4s ease, opacity 0.3s ease';
        });
        
        button.addEventListener('click', function() {
            const isExpanded = button.textContent === '-';
            
            if (isExpanded) {
                // Collapse
                projectItems.forEach(item => {
                    item.style.maxHeight = '0';
                    item.style.opacity = '0';
                });
                button.textContent = '+';
            } else {
                // Expand
                projectItems.forEach(item => {
                    item.style.maxHeight = item.scrollHeight + 'px';
                    item.style.opacity = '1';
                });
                button.textContent = '-';
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        function toggleBackToTop() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }

        // Update button position on scroll to keep it centered vertically
        function updateButtonPosition() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Keep button at 50% of viewport height (centered)
            backToTopButton.style.top = '50%';
        }

        // Scroll to top function
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Event listeners
        window.addEventListener('scroll', function() {
            toggleBackToTop();
            updateButtonPosition();
        });

        backToTopButton.addEventListener('click', scrollToTop);

        // Initial check
        toggleBackToTop();
        updateButtonPosition();
    }

    // Dynamic image positioning and page height calculation for project pages
    function updateImagePositionAndPageHeight(descriptionSelector, imagesSelector, pageBody) {
        const description = document.querySelector(descriptionSelector);
        const imagesSection = document.querySelector(imagesSelector);
        const body = pageBody ? document.querySelector(pageBody) : document.body;
        
        if (description && imagesSection && body) {
            function updatePosition() {
                // Position images section after description with 50px gap
                const descriptionTop = description.offsetTop;
                const descriptionHeight = description.offsetHeight;
                const imagesTop = descriptionTop + descriptionHeight + 50;
                imagesSection.style.top = imagesTop + 'px';
                
                // Calculate content bottom (bottom of images section)
                const imagesTopPos = imagesSection.offsetTop;
                const imagesHeight = imagesSection.offsetHeight;
                const contentBottom = imagesTopPos + imagesHeight;
                
                // Set page min-height = content bottom + 120px
                const pageHeight = contentBottom + 120;
                body.style.minHeight = pageHeight + 'px';
                
                // Set footer position: footer bottom should be 20px from page bottom
                // footer top = page height - footer height (72px) - 20px
                const footer = body.querySelector('.footer');
                if (footer) {
                    const footerTop = pageHeight - 72 - 20;
                    footer.style.top = footerTop + 'px';
                }
            }
            
            // Update on load and resize
            updatePosition();
            window.addEventListener('resize', updatePosition);
            
            // Also update after fonts load and images load (to account for text/image reflow)
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(function() {
                    setTimeout(updatePosition, 100);
                });
            }
            
            // Update after all images load
            const images = imagesSection.querySelectorAll('img');
            let loadedImages = 0;
            if (images.length > 0) {
                images.forEach(img => {
                    if (img.complete) {
                        loadedImages++;
                    } else {
                        img.addEventListener('load', function() {
                            loadedImages++;
                            if (loadedImages === images.length) {
                                setTimeout(updatePosition, 100);
                            }
                        });
                    }
                });
                if (loadedImages === images.length) {
                    setTimeout(updatePosition, 100);
                }
            } else {
                setTimeout(updatePosition, 100);
            }
        }
    }
    
    // Apply to all project pages
    updateImagePositionAndPageHeight('.pj1-description', '.pj1-images-section', 'body.pj1-page');
    updateImagePositionAndPageHeight('.pj2-description', '.pj2-images-section', 'body.pj2-page');
    updateImagePositionAndPageHeight('.pj3-description', '.pj3-images-section', 'body.pj3-page');
    updateImagePositionAndPageHeight('.ow1-description', '.ow1-images-section', 'body.ow1-page');
    updateImagePositionAndPageHeight('.ow2-description', '.ow2-images-section', 'body.ow2-page');
    updateImagePositionAndPageHeight('.ow3-description', '.ow3-images-section', 'body.ow3-page');
    
    // Generic function to update page height and footer position
    function updatePageHeightAndFooter(pageBody, lastContentSelector) {
        const body = typeof pageBody === 'string' ? document.querySelector(pageBody) : pageBody;
        const lastContent = typeof lastContentSelector === 'string' ? document.querySelector(lastContentSelector) : lastContentSelector;
        
        if (body && lastContent) {
            function updatePosition() {
                const contentBottom = lastContent.offsetTop + lastContent.offsetHeight;
                const pageHeight = contentBottom + 120;
                body.style.minHeight = pageHeight + 'px';
                
                const footer = body.querySelector('.footer');
                if (footer) {
                    const footerTop = pageHeight - 72 - 20;
                    footer.style.top = footerTop + 'px';
                }
            }
            
            updatePosition();
            window.addEventListener('resize', updatePosition);
            
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(function() {
                    setTimeout(updatePosition, 100);
                });
            }
            
            // Update after images load
            const images = lastContent.querySelectorAll('img');
            if (images.length > 0) {
                let loadedImages = 0;
                images.forEach(img => {
                    if (img.complete) {
                        loadedImages++;
                    } else {
                        img.addEventListener('load', function() {
                            loadedImages++;
                            if (loadedImages === images.length) {
                                setTimeout(updatePosition, 100);
                            }
                        });
                    }
                });
                if (loadedImages === images.length) {
                    setTimeout(updatePosition, 100);
                }
            }
        }
    }
    
    
    // For works page, use the last section (works-section-second)
    const worksPage = document.querySelector('body.works-page');
    if (worksPage) {
        const lastSection = worksPage.querySelector('.works-section-second') || worksPage.querySelector('.works-section:last-child');
        if (lastSection) {
            updatePageHeightAndFooter(worksPage, lastSection);
        }
    }
    
    // For experience page, footer follows the last content-text in "技能语言" section
    const experiencePage = document.querySelector('body');
    if (experiencePage && experiencePage.querySelector('.experience-page')) {
        const experienceBody = experiencePage.querySelector('.experience-body');
        if (experienceBody) {
            // Find the "技能语言" section
            const allSections = experienceBody.querySelectorAll('.experience-section');
            let skillSection = null;
            allSections.forEach(section => {
                const title = section.querySelector('.section-title');
                if (title && title.textContent.trim() === '技能语言') {
                    skillSection = section;
                }
            });
            
            if (skillSection) {
                // Find the last content-text in the skill section (the one with "交互设计：...")
                const contentTexts = skillSection.querySelectorAll('.content-text');
                const lastContentText = contentTexts[contentTexts.length - 1];
                
                if (lastContentText) {
                    function updateExperiencePage() {
                        // Get the bottom position of the last content-text
                        const textBottom = lastContentText.offsetTop + lastContentText.offsetHeight;
                        
                        // Footer follows the text with 20px gap
                        const footer = experiencePage.querySelector('.footer');
                        if (footer) {
                            const footerTop = textBottom + 20;
                            footer.style.top = footerTop + 'px';
                        }
                        
                        // Page height = text bottom + 120px
                        const pageHeight = textBottom + 120;
                        experiencePage.style.minHeight = pageHeight + 'px';
                    }
                    
                    updateExperiencePage();
                    window.addEventListener('resize', updateExperiencePage);
                    
                    if (document.fonts && document.fonts.ready) {
                        document.fonts.ready.then(function() {
                            setTimeout(updateExperiencePage, 100);
                        });
                    }
                }
            }
        }
    }
});
