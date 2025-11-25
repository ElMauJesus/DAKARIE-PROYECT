
(function(){
    const template = document.createElement('template');
    template.id = 'product-template';
    template.innerHTML = `
    <div class="product-card">
        <div class="card-top-badges"><span class="badge badge-sale"><span class="badge-text"></span></span><img src="../icons/mas-vendido.png" alt="Corona" class="badge-icon"></div>
        <div class="card-image-container"><img src="" alt="" class="product-image"></div>
        <div class="card-details">
            <p class="product-title"></p>
            <div class="product-rating"><span class="stars"></span><img src="../icons/favorites.png" alt="Guardar" class="bookmark-icon"></div>
            <div class="product-info-row"><span class="stock-info"></span><span class="product-price"></span></div>
            <div class="product-info-row small-text"><span class="warranty-info"></span><span class="days-info"></span><img src="../icons/carrito2.png" alt="Añadir al Carrito" class="cart-mini-icon"></div>
            <div class="original-price"><span class="original-price-text"></span></div>
        </div>
    </div>`;

function starsHtml(){ let s=''; for(let i=0;i<5;i++){ s += '<img src="../icons/estrella.png" alt="Estrella" class="star-icon">'; } return s; }

const bestData = [
    {img:'../imgs/img-home/Camisa.png', alt:'Sudadera Roja', title:'Sudadera Roja', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días'},
    {img:'../imgs/img-home/cerave.png', alt:'Crema Hidratante CeraVe', title:'CeraVe', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días'},
    {img:'../imgs/img-home/m.png', alt:'Caja de Regalo', title:'Caja Regalo', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días'},
    {img:'../imgs/img-home/laptop.png', alt:'Laptop', title:'Laptop', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días'},
    {img:'../imgs/img-home/cable.png', alt:'Hub USB', title:'Hub USB', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días'},
    {img:'../imgs/img-home/Camisa.png', alt:'Sudadera Roja', title:'Sudadera Roja', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días'},
    {img:'../imgs/img-home/cerave.png', alt:'Crema Hidratante CeraVe', title:'CeraVe', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días'},
];

const octubreData = [
    {img:'../imgs/img-home/octubre-1.png', alt:'Oct1', title:'Producto Octubre 1', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días', badge:''},
    {img:'../imgs/img-home/octubre-2.png', alt:'Oct2', title:'Producto Octubre 2', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días', badge:''},
    {img:'../imgs/img-home/octubre-3.png', alt:'Oct3', title:'Producto Octubre 3', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días', badge:''},
    {img:'../imgs/img-home/octubre-4.png', alt:'Oct4', title:'Producto Octubre 4', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días', badge:''},
    {img:'../imgs/img-home/octubre-5.png', alt:'Oct5', title:'Producto Octubre 5', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días', badge:''},
    {img:'../imgs/img-home/octubre-6.png', alt:'Oct6', title:'Producto Octubre 6', stock:'Existencia: 17', price:'18.50$', orig:'19.99$', warranty:'7 Años de Garantía', days:'26 - 30 Días', badge:''}
];

function populate(containerId, data){
    const container = document.getElementById(containerId);
    if(!container) return;
    data.forEach(function(item){
        const node = template.content.cloneNode(true);
        const img = node.querySelector('.product-image'); if(img){ img.src = item.img; img.alt = item.alt; }
        const badgeText = node.querySelector('.badge-text'); if(badgeText) badgeText.textContent = item.badge || '';
        const badgeImg = node.querySelector('.badge-icon'); 
        if(badgeImg && item.badgeIcon){ 
            badgeImg.src = item.badgeIcon; 
        }
        const title = node.querySelector('.product-title'); if(title) title.textContent = item.title;
        const stock = node.querySelector('.stock-info'); if(stock) stock.textContent = item.stock;
        const price = node.querySelector('.product-price'); if(price) price.textContent = item.price;
        const orig = node.querySelector('.original-price-text'); if(orig) orig.textContent = item.orig;
        const warranty = node.querySelector('.warranty-info'); if(warranty) warranty.textContent = item.warranty;
        const days = node.querySelector('.days-info'); if(days) days.textContent = item.days;
        const stars = node.querySelector('.stars'); if(stars) stars.innerHTML = starsHtml();
        container.appendChild(node);
    });
}

document.body.appendChild(template);

// Esperamos 50ms para asegurarnos de que el DOM ha procesado los elementos inyectados
setTimeout(() => {
    populate('bestSellers', bestData);
    populate('octubreSlider', octubreData);
}, 50);

document.querySelectorAll('.brand-card').forEach(function(el){ el.setAttribute('role','figure'); });
document.querySelectorAll('.info-card').forEach(function(el){ el.setAttribute('role','article'); });

})();
