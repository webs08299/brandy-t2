/* 
 * 網頁 UI/UX 系統規格書實作 - Qitchen Restaurant (Dark Minimal Style)
 * 核心互動邏輯
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 導覽列狀態變更 (Sticky Navbar) ---
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- 平滑滾動與進場動畫 (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // 當元件有 15% 進入視窗內即觸發
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // 觸發一次後解除觀察
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".fade-in-up");
    fadeElements.forEach((el) => {
        fadeObserver.observe(el);
    });

    // --- 移動端漢堡選單 (Mobile Menu) ---
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    // 切換選單
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        
        // 簡單的漢堡按鈕動畫
        const spans = menuBtn.querySelectorAll("span");
        if (mobileMenu.classList.contains("active")) {
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.transform = "rotate(-45deg)";
        } else {
            spans[0].style.transform = "none";
            spans[1].style.transform = "none";
        }
    });

    // 點擊移動端連結時，收起選單
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            const spans = menuBtn.querySelectorAll("span");
            spans[0].style.transform = "none";
            spans[1].style.transform = "none";
        });
    });

    // --- 錨點平滑滾動 (Smooth Scroll) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 扣除導覽列高度
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
});
