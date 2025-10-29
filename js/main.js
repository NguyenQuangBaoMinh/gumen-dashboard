// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and tab contents
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the target tab id
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Smooth scroll to top of tab content
            document.querySelector('.tab-content-wrapper').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Keyboard navigation for tabs
    document.addEventListener('keydown', (e) => {
        const activeButton = document.querySelector('.tab-button.active');
        const currentIndex = Array.from(tabButtons).indexOf(activeButton);
        
        if (e.key === 'ArrowRight' && currentIndex < tabButtons.length - 1) {
            tabButtons[currentIndex + 1].click();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            tabButtons[currentIndex - 1].click();
        }
    });
    
    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.card, .situation-card, .competition-card, .proposal-item, .key-point-item, .principle-item'
    );
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Add hover effect to gallery images
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Console log for development
    console.log('Gumen Dashboard loaded successfully!');
    console.log('Total tabs:', tabButtons.length);
    console.log('Current active tab:', document.querySelector('.tab-button.active').getAttribute('data-tab'));
});

// Add smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Print functionality
function printDashboard() {
    window.print();
}

// Export to PDF functionality (requires additional library)
function exportToPDF() {
    alert('Chức năng xuất PDF đang được phát triển. Bạn có thể sử dụng Ctrl+P để in thành PDF.');
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printDashboard();
    }
    
    // Ctrl/Cmd + 1-5 for quick tab navigation
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const tabIndex = parseInt(e.key) - 1;
        const tabButtons = document.querySelectorAll('.tab-button');
        if (tabButtons[tabIndex]) {
            tabButtons[tabIndex].click();
        }
    }
});

// Add data tracking for analytics (if needed)
function trackTabSwitch(tabName) {
    console.log('Tab switched to:', tabName);
    // Add analytics code here if needed
    // Example: ga('send', 'event', 'Tab', 'Switch', tabName);
}

// Update tab switch function to include tracking
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.querySelector('.tab-title').textContent;
        trackTabSwitch(tabName);
    });
});