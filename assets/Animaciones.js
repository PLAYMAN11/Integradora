function Animacion() {
    document.addEventListener('DOMContentLoaded', () => {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const value = bar.style.getPropertyValue('--bar-value');
            setTimeout(() => {
                bar.style.width = value;
            
            },);
        });
    });
}
Animacion();



