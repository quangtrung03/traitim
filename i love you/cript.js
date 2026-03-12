document.addEventListener('DOMContentLoaded', () => {
    // === XỬ LÝ LỚP PHỦ CHÀO MỪNG ===
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const birthdayMusic = document.getElementById('birthdayMusic');
    const musicBtn = document.getElementById('musicBtn');
    let musicPlaying = false;

    welcomeOverlay.addEventListener('click', () => {
        welcomeOverlay.classList.add('hidden');
        startBirthdayEffects();
        // Tự động phát nhạc khi bắt đầu
        playMusic();
    });

    // === XỬ LÝ NHẠC ===
    function playMusic() {
        birthdayMusic.play().then(() => {
            musicPlaying = true;
            musicBtn.textContent = '🎵 Tắt Nhạc';
            musicBtn.classList.add('playing');
        }).catch(err => {
            console.log('Không thể phát nhạc tự động:', err);
        });
    }

    function stopMusic() {
        birthdayMusic.pause();
        musicPlaying = false;
        musicBtn.textContent = '🎵 Bật Nhạc';
        musicBtn.classList.remove('playing');
    }

    musicBtn.addEventListener('click', () => {
        if (musicPlaying) {
            stopMusic();
        } else {
            playMusic();
        }
    });

    // === TẠO BÓNG BAY ===
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        const colors = ['#ff6b9d', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = randomColor;
        
        const randomLeft = Math.random() * 100;
        balloon.style.left = randomLeft + '%';
        
        const randomDelay = Math.random() * 5;
        balloon.style.animationDelay = randomDelay + 's';
        
        const randomDuration = 8 + Math.random() * 4;
        balloon.style.animationDuration = randomDuration + 's';
        
        document.getElementById('balloons').appendChild(balloon);
        
        // Xóa bóng bay sau khi animation kết thúc
        setTimeout(() => {
            balloon.remove();
        }, (randomDuration + randomDelay) * 1000);
    }

    // === PHÁO HOA/CONFETTI ===
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiPieces = [];

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function initConfetti() {
        for (let i = 0; i < 100; i++) {
            confettiPieces.push(new Confetti());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        requestAnimationFrame(animateConfetti);
    }

    // === BẮT ĐẦU CÁC HIỆU ỨNG ===
    function startBirthdayEffects() {
        // Bắt đầu confetti
        initConfetti();
        animateConfetti();

        // Tạo bóng bay liên tục
        setInterval(createBalloon, 500);

        // Burst confetti ban đầu
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                confettiPieces.push(new Confetti());
            }, i * 30);
        }
    }

    // === XỬ LÝ THỔI NẾN ===
    const cake = document.querySelector('.cake');
    const flame = document.querySelector('.flame');
    const cakeText = document.querySelector('.cake-text');

    let canBlowOut = true;

    cake.addEventListener('click', () => {
        if (canBlowOut) {
            flame.style.opacity = '0';
            cakeText.textContent = '🎊 Chúc mừng! Ước gì đã thành sự thật! 🎊';
            cakeText.style.color = '#ffe66d';
            canBlowOut = false;

            // Tạo burst confetti khi thổi nến
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    confettiPieces.push(new Confetti());
                }, i * 10);
            }

            // Đặt lại nến sau 5 giây
            setTimeout(() => {
                flame.style.opacity = '1';
                cakeText.textContent = 'Thổi nến đi nào! 🎉';
                cakeText.style.color = 'white';
                canBlowOut = true;
            }, 5000);
        }
    });

    // === XỬ LÝ RESIZE ===
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // === HIỆU ỨNG SPARKLE CHO ẢNH ===
    const photoFrame = document.querySelector('.photo-frame');
    
    photoFrame.addEventListener('mouseenter', () => {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.position = 'absolute';
                sparkle.style.width = '5px';
                sparkle.style.height = '5px';
                sparkle.style.background = 'white';
                sparkle.style.borderRadius = '50%';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.animation = 'sparkle 1s forwards';
                photoFrame.appendChild(sparkle);

                setTimeout(() => sparkle.remove(), 1000);
            }, i * 50);
        }
    });

    // Thêm animation sparkle vào CSS động
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 1;
                transform: scale(0);
            }
            50% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('🎉 Trang sinh nhật đã sẵn sàng! 🎂');
});