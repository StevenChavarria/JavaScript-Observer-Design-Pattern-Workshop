class MousePositionObservable {
    constructor() {
        this.subscriptions = [];
        window.addEventListener('mousemove', this.handleMouseMove)
    }

    subscribe(callback) {
        this.subscriptions.push(callback);

        return () => {
            this.subscriptions = this.subscriptions.filter(cb => cb !== callback);
        }
    }
    handleMouseMove = (e) => {
        this.subscriptions.forEach(sub => sub(e.clientX, e.clientY));
    }
}

let x, y;

const mousePositionObservable = new MousePositionObservable();

const unsubscribeBox = mousePositionObservable.subscribe((x, y) => {
    console.info('Mouse cursor position', x, y);
    document.querySelector('.mouse-position .position').innerHTML = `
         <p>ClientX: ${x}</p>
         <p>ClientY: ${y}</p>
    `
});

const unsubscribeMouse = mousePositionObservable.subscribe((x, y) => {
    console.info('MouseCursorPosition', x, y);
    const circle = document.querySelector('.circle');
    window.setTimeout(() => {
        circle.style.transform = `translate(${x}px, ${y}px)`;
    }, 1000);
});


document.querySelector('.container').addEventListener('click', unsubscribeMouse);
document.querySelector('.mouse-position').addEventListener('click', (e) => {
  e.stopPropagation();
  unsubscribeBox();
});