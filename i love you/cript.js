document.addEventListener('DOMContentLoaded', () => {
    const ui = document.getElementById('ui');
    const numElements = 200;
    const scale = 15;
    const elements = [];
    // Tạo các phần tử một lần
    for (let i = 0; i < numElements; i++) {
        const container = document.createElement('div');
        container.className = 'love_horizontal';
        container.style.setProperty('--i', i);
        const word = document.createElement('div');
        word.className = 'love_word';
        word.textContent = 'I Love You';
        container.appendChild(word);
        ui.appendChild(container);
        elements.push(container);
    }

    // Sử dụng thời gian thực tế để hiệu ứng luôn mượt
    let startTime = null;
    const speed = 0.00015; // tốc độ quay, chỉnh nhỏ hơn để chậm hơn
    function animateHeart(now) {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const tOffset = elapsed * speed;
        for (let i = 0; i < numElements; i++) {
            const t = ((i / numElements) * 2 * Math.PI + tOffset) % (2 * Math.PI);
            const x = scale * 16 * Math.pow(Math.sin(t), 3);
            const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            elements[i].style.left = `calc(50% + ${x}px)`;
            elements[i].style.top = `calc(50% + ${y}px)`;
        }
        requestAnimationFrame(animateHeart);
    }
    requestAnimationFrame(animateHeart);
});