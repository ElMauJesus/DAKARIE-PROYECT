
const bestData = [
    {img: 'imgs/img-home/1.png', badge: 'OFERTA', title: 'Case Gamer RGB', stock: 'En Stock', price: '$45.99', orig: '$55.99', warranty: '1 Año', days: '30 Días', alt: 'SSD 500GB'},
    {img: 'imgs/img-home/2.png', badge: 'NUEVO', title: 'Case Gamer RGB', stock: 'En Stock', price: '$69.99', orig: '', warranty: '2 Años', days: '15 Días', alt: 'Teclado RGB'},
    {img: 'imgs/img-home/3.png', badge: 'TOP', title: 'Ryzen 7 5800x3d', stock: 'Pocas Unidades', price: '$29.99', orig: '', warranty: '6 Meses', days: '7 Días', alt: 'Mouse Gamer'},
    {img: 'imgs/img-home/4.png', badge: 'NUEVO', title: 'Motherboard amd elitegroup ecs b650am5-m', stock: 'Agotado', price: '$249.99', orig: '$300.00', warranty: '3 Años', days: '60 Días', alt: 'Monitor Curvo'},
    {img: 'imgs/img-home/5.png', badge: 'OFERTA', title: 'Teclado Gamer', stock: 'Agotado', price: '$249.99', orig: '$300.00', warranty: '3 Años', days: '60 Días', alt: 'Monitor Curvo'},
    {img: 'imgs/img-home/6.png', badge: 'OFERTA', title: 'Audifonos Gamer Onikuma', stock: 'Agotado', price: '$249.99', orig: '$300.00', warranty: '3 Años', days: '60 Días', alt: 'Monitor Curvo'},
];

const octubreData = [
    {img: 'imgs/img-home/octubre-1.png', badge: '', title: 'Webcam HD 1080p', stock: 'En Stock', price: '$19.99', orig: '', warranty: '1 Año', days: '30 Días', alt: 'Webcam'},
    {img: 'imgs/img-home/octubre-2.png', badge: 'OFERTA', title: 'Tarjeta Gráfica RTX 3060', stock: 'En Stock', price: '$399.99', orig: '$450.00', warranty: '3 Años', days: '15 Días', alt: 'RTX 3060'},
    {img: 'imgs/img-home/octubre-3.png', badge: 'OFERTA', title: 'Tarjeta Gráfica RTX 3060', stock: 'En Stock', price: '$399.99', orig: '$450.00', warranty: '3 Años', days: '15 Días', alt: 'RTX 3060'},
    {img: 'imgs/img-home/octubre-4.png', badge: 'OFERTA', title: 'Tarjeta Gráfica RTX 3060', stock: 'En Stock', price: '$399.99', orig: '$450.00', warranty: '3 Años', days: '15 Días', alt: 'RTX 3060'},
    {img: 'imgs/img-home/octubre-5.png', badge: 'OFERTA', title: 'Tarjeta Gráfica RTX 3060', stock: 'En Stock', price: '$399.99', orig: '$450.00', warranty: '3 Años', days: '15 Días', alt: 'RTX 3060'},
    {img: 'imgs/img-home/octubre-6.png', badge: 'OFERTA', title: 'Tarjeta Gráfica RTX 3060', stock: 'En Stock', price: '$399.99', orig: '$450.00', warranty: '3 Años', days: '15 Días', alt: 'RTX 3060'},
];

// =================================================================
// 3. LÓGICA DE RENDERIZADO (Sin cambios)
// =================================================================

// Plantilla de Producto (Product Template)
const template = document.createElement('template'); 
template.id = 'product-template'; 
template.innerHTML = `
    <div class="product-card">
        <div class="card-top-badges"><span class="badge badge-sale"><span class="badge-text"></span></span><img src="icons/mas-vendido.png" alt="Corona" class="badge-icon"></div>
        <div class="card-image-container"><img src="" alt="" class="product-image"></div>
        <div class="card-details">
            <p class="product-title"></p>
            <div class="product-rating"><span class="stars"></span><img src="icons/favorites.png" alt="Guardar" class="bookmark-icon"></div>
            <div class="product-info-row"><span class="stock-info"></span><span class="product-price"></span></div>
            <div class="product-info-row small-text"><span class="warranty-info"></span><span class="days-info"></span><img src="icons/carrito2.png" alt="Añadir al Carrito" class="cart-mini-icon"></div>
            <div class="original-price"><span class="original-price-text"></span></div>
        </div>
    </div>`;

function starsHtml(){ 
    let s=''; 
    for(let i=0;i<5;i++){ 
        s += '<img src="icons/estrella.png" alt="Estrella" class="star-icon">'; 
    } 
    return s; 
} 

function renderizarProductos(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return; 
    
    container.innerHTML = ''; 
    const productTemplate = template.content.querySelector('.product-card');

    items.forEach(item => {
        const node = productTemplate.cloneNode(true);
        
        // Rellenar la plantilla con los datos del item
        const img = node.querySelector('.product-image'); if(img){ img.src = item.img || ''; img.alt = item.alt || item.title || ''; }
        const badgeText = node.querySelector('.badge-text'); if(badgeText) badgeText.textContent = item.badge || '';
        const badgeImg = node.querySelector('.badge-icon'); if(badgeImg){ if(item.badgeIcon){ badgeImg.src = item.badgeIcon; badgeImg.style.display=''; } else { badgeImg.style.display = item.badge ? '' : 'none'; } }
        const title = node.querySelector('.product-title'); if(title) title.textContent = item.title || 'Producto sin nombre';
        const stock = node.querySelector('.stock-info'); if(stock) stock.textContent = item.stock || '';
        const price = node.querySelector('.product-price'); if(price) price.textContent = item.price || '';
        const orig = node.querySelector('.original-price-text'); if(orig) orig.textContent = item.orig || '';
        const warranty = node.querySelector('.warranty-info'); if(warranty) warranty.textContent = item.warranty || '';
        const days = node.querySelector('.days-info'); if(days) days.textContent = item.days || '';
        const stars = node.querySelector('.stars'); if(stars) stars.innerHTML = starsHtml();
        
        container.appendChild(node);
    });
}

// =================================================================
// 4. INICIALIZACIÓN
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Es importante que la plantilla esté en el DOM para que la función la use
    if (!document.getElementById(template.id)) {
        document.body.appendChild(template);
    }
    
    // 🚀 Renderizamos con los datos estáticos
    renderizarProductos('bestSellers', bestData);
    renderizarProductos('octubreSlider', octubreData);
});