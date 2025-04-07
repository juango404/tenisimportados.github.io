// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado completamente');
    
    // Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = parseInt(urlParams.get('id'));
    console.log('ID del producto:', productoId);

    // Verificar si el array de productos está disponible
    if (typeof productos === 'undefined') {
        console.error('Error: El array de productos no está definido');
        return;
    }
    
    console.log('Productos disponibles:', productos);

    // Encontrar el producto
    const producto = productos.find(p => p.id === productoId);

    if (!producto) {
        console.error('Error: Producto no encontrado');
        window.location.href = 'index.html';
        return;
    }

    // Cargar información básica del producto
    document.getElementById('producto-nombre').textContent = producto.nombre;
    
    // Cargar precios
    document.getElementById('precio-original').textContent = `$${producto.precioOriginal}`;
    document.getElementById('precio-actual').textContent = `$${producto.precio}`;
    document.getElementById('descuento').textContent = `-${producto.descuento}`;
    
    // Cargar descripción
    document.getElementById('producto-descripcion').textContent = producto.descripcion;

    // Cargar imagen principal
    const imagenPrincipal = document.getElementById('imagen-principal');
    imagenPrincipal.src = producto.imagenes[0];
    imagenPrincipal.alt = producto.nombre;

    // Cargar miniaturas
    const miniaturasContainer = document.querySelector('.miniaturas');
    producto.imagenes.forEach((imagen, index) => {
        const miniatura = document.createElement('div');
        miniatura.classList.add('miniatura');
        if (index === 0) miniatura.classList.add('activa');
        
        miniatura.innerHTML = `<img src="${imagen}" alt="${producto.nombre} - Vista ${index + 1}">`;
        miniatura.addEventListener('click', () => {
            imagenPrincipal.src = imagen;
            document.querySelectorAll('.miniatura').forEach(m => m.classList.remove('activa'));
            miniatura.classList.add('activa');
        });
        
        miniaturasContainer.appendChild(miniatura);
    });

    // Cargar tallas
    const tallasContainer = document.getElementById('tallas-container');
    const tallas = [38, 39, 40, 41, 42, 43];
    
    tallas.forEach(talla => {
        const div = document.createElement('div');
        div.classList.add('talla');
        div.textContent = talla;
        div.addEventListener('click', () => {
            document.querySelectorAll('.talla').forEach(t => t.classList.remove('seleccionada'));
            div.classList.add('seleccionada');
        });
        tallasContainer.appendChild(div);
    });

    // Manejar el botón de agregar al carrito
    document.getElementById('agregar-carrito').addEventListener('click', () => {
        const tallaSeleccionada = document.querySelector('.talla.seleccionada');
        
        if (!tallaSeleccionada) {
            alert('Por favor, selecciona una talla');
            return;
        }

        const mensaje = `¡Hola! Me interesa comprar:\n\n` +
                       `${producto.nombre}\n` +
                       `Talla: ${tallaSeleccionada.textContent}\n` +
                       `Precio: $${producto.precio}\n` +
                       `Descuento: ${producto.descuento}`;

        const numeroWhatsApp = '+573028472620'; // Reemplaza con tu número
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsApp, '_blank');
    });
}); 