class MatrixRain extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
            background: black;
            overflow: hidden;
          }
          canvas {
            display: block;
            width: 100%;
            height: 100%;
          }
        </style>
        <canvas></canvas>
      `;
      this.canvas = this.shadowRoot.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
  
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
  
      this.fontSize = 16;
      this.columns = this.canvas.width / this.fontSize;
      this.drops = Array.from({ length: this.columns }).fill(1);
  
      this.characters = 'アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロンabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      
      this.draw();
    }
  
    resizeCanvas() {
      this.canvas.width = this.offsetWidth;
      this.canvas.height = this.offsetHeight;
      this.columns = this.canvas.width / this.fontSize;
      this.drops = Array.from({ length: this.columns }).fill(1);
    }
  
    draw() {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#0F0';
      this.ctx.font = `${this.fontSize}px monospace`;
    
      for (let i = 0; i < this.drops.length; i++) {
        const text = this.characters[Math.floor(Math.random() * this.characters.length)];
        const x = i * this.fontSize;
        const y = this.drops[i] * this.fontSize;
        this.ctx.fillText(text, x, y);
    
        if (y > this.canvas.height && Math.random() > 0.975) {
          this.drops[i] = 0;
        }
    
        this.drops[i]++;
      }
      // updae every 0.3 secs
      setTimeout(() => requestAnimationFrame(() => this.draw()), 30); 
    }
  }
  // introducing a new html <matrix-rain></matrix-rain> tag
  customElements.define('matrix-rain', MatrixRain);
  