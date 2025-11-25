document.addEventListener('DOMContentLoaded', function() {
    const accountNavItems = document.querySelectorAll('.account-nav__container--item a');
    const contentContainer = document.getElementById('content-container');
    const accountNavContainer = document.querySelector('.account-nav__container');
    
    // Duración de la transición en milisegundos (DEBE coincidir con el CSS: 0.3s)
    const TRANSITION_DURATION = 300; 

    // Función para limpiar cualquier CSS de opción cargado previamente.
    function removeExistingOptionStyles() {
        const existingStyles = document.querySelectorAll('link[data-option-style]');
        existingStyles.forEach(link => link.remove());
    }
    
    // Limpiar cualquier script dinámico cargado previamente.
    function removeExistingOptionScripts() {
        const existingScripts = document.querySelectorAll('script[data-dynamic-script]');
        existingScripts.forEach(script => script.remove());
    }

    // Función para centrar el elemento en la vista horizontal del contenedor
    function centerNavItem(navItemElement) {
        const containerWidth = accountNavContainer.offsetWidth;
        const itemWidth = navItemElement.offsetWidth;
        const itemLeft = navItemElement.offsetLeft;
        const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);

        accountNavContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    // Función para cargar el contenido de la página y su CSS con transición y centrado.
    async function loadContent(pageUrl, anchorElement) {
        if (!pageUrl) return;

        const navItemElement = anchorElement.parentElement; // Obtiene el <li>
        const baseName = pageUrl.split('/').pop().split('.')[0]; // Ej: 'compras'

        // 1. Iniciar el fundido de salida (Fade-out)
        contentContainer.classList.add('content-fading-out');

        // 2. Centrar el elemento del menú clicado (inicia el scroll suave)
        centerNavItem(navItemElement); 
        
        // 3. Limpiar scripts dinámicos anteriores
        removeExistingOptionScripts(); 

        // Esperar a que termine la transición de salida (300ms)
        await new Promise(resolve => setTimeout(resolve, TRANSITION_DURATION));
        
        // 4. Cargar el contenido HTML
        try {
            const response = await fetch(pageUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const htmlContent = await response.text();
            contentContainer.innerHTML = htmlContent;
        } catch (error) {
            console.error('Error al cargar el contenido de la página:', error);
            contentContainer.innerHTML = '<p style="text-align: center; color: red;">Error al cargar la página. Por favor, revisa la consola para más detalles.</p>';
            contentContainer.classList.remove('content-fading-out');
            return;
        }

        // 5. Cargar el CSS asociado
        removeExistingOptionStyles(); 
        const cssPath = `options/styles/${baseName}.css`; 

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        link.setAttribute('data-option-style', 'true');
        document.head.appendChild(link);

        // 🛑 6. CORRECCIÓN DE RUTA (Intento 2): Cargar el script específico si existe
        if (baseName === 'compras' || 'ventas') {
             // Usamos '../js/' porque los scripts estáticos en usuario.html usan esta ruta
            const script = document.createElement('script');
            script.src = 'options/js/compras-scripts.js'; // RUTA CORREGIDA (usando ../js/)
            script.setAttribute('data-dynamic-script', 'true');
            
            // Opcional: Agregar un evento para saber si el script se cargó
            script.onload = () => {
                console.log('compras-scripts.js cargado y ejecutado con éxito.');
            };

            document.body.appendChild(script); 
        }

        // 7. Actualizar la clase activa del menú
        document.querySelectorAll('.account-nav__container--item').forEach(item => {
            item.classList.remove('active');
        });
        navItemElement.classList.add('active'); 

        // 8. Finalizar el fundido de entrada (Fade-in)
        contentContainer.classList.remove('content-fading-out');
    }

    // Manejador de eventos para los enlaces del menú de navegación.
    accountNavItems.forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault(); 
            const pageUrl = this.getAttribute('data-page');
            loadContent(pageUrl, this); 
        });
    });

    // 9. Cargar la página 'Información' por defecto al cargar 'usuario.html'
    const defaultAnchor = accountNavContainer.querySelector('a[data-page="options/informacion.html"]');
    if (defaultAnchor) {
        const defaultPageUrl = defaultAnchor.getAttribute('data-page');
        loadContent(defaultPageUrl, defaultAnchor);
    }
});