// Definir los productos antes de cualquier otra lógica
const productos = [
  {
    id: 1,
    nombre: "Nike ballelli unisex",
    precioOriginal: 199900,
    precio: 159900,
    descuento: "17%",
    imagenes: [
      "img/zapato1-1.jpg",
      "img/zapato1-2.jpg",
      "img/zapato1-3.jpg",
      "img/zapato1-4.jpg",
    ],
    descripcion:
      "se combina innovación y elegancia ofreciendo durabilidad y un ajuste impecable con un diseño deportivo y casual para brindar la máxima plenitud día a día..",
  },
  {
    id: 2,
    nombre: "Balance XC",
    precioOriginal: 230000,
    precio: 170000,
    descuento: "18%",
    imagenes: [
      "img/zapato2-1.jpg",
      "img/zapato2-2.jpg",
      "img/zapato2-3.jpg",
      "img/zapato2-4.jpg",
    ],
    descripcion:
      "¡Perfectos para ti! Que te gusta vestir cómodo y&nbsp; te gusta el zapato deportivo para actividades diarias, marcando siempre un estilo único y diferente..",
  },
  {
    id: 3,
    nombre: "New Fuelcell",
    precioOriginal: 235000,
    precio: 159900,
    descuento: "18%",
    imagenes: [
      "img/zapato3-1.jpg",
      "img/zapato3-2.jpg",
      "img/zapato3-3.jpg",
      "img/zapato3-4.jpg",
    ],
    descripcion:
      "La tecnología de entre suela que tiene los New Fuelcel, permite una amortiguación óptima y ligera en cada pisada, convirtiéndolos en los aliados perfectos para actividades deportivas..",
  },
  {
    id: 4,
    nombre: "Adidas Extreme run Dama",
    precioOriginal: 185000,
    precio: 130000,
    descuento: "18%",
    imagenes: [
      "img/zapato4-1.jpg",
      "img/zapato4-2.jpg",
      "img/zapato4-3.jpg",
      "img/zapato4-4.jpg",
    ],
    descripcion:
      "suela confortable y ligera y con una capacidad amplia de absorción en cada pisada y un resultado de amortiguación excelente..",
  },
  {
    id: 5,
    nombre: "Lacoste",
    precioOriginal: 230000,
    precio: 159900,
    descuento: "19%",
    imagenes: [
      "img/zapato5-1.jpg",
      "img/zapato5-2.jpg",
      "img/zapato5-3.jpg",
      "img/zapato5-4.jpg",
    ],
    descripcion: "Zapatillas deportivas urbanas con estilo moderno y máxima comodidad.",
  },
  {
    id: 6,
    nombre: "Nike Balleli Galaxy Dama",
    precioOriginal: 245000,
    precio: 169900,
    descuento: "21%",
    imagenes: [
      "img/zapato6-1.jpg",
      "img/zapato6-2.jpg",
      "img/zapato6-3.jpg",
      "img/zapato6-4.jpg",
    ],
    descripcion: "Marca tu estilo propio con los nuevos Balleli Galaxy y tu proximo paso hazlo con comodidad.",
  },
];

const carrito = [];

// Mostrar productos en la página principal solo si estamos en index.html
if (document.getElementById("productos")) {
  const productosContainer = document.getElementById("productos");

  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
            <img src="${producto.imagenes[0]}" width="150">
            <h3>${producto.nombre}</h3>
            <div class="precios">
                <span class="precio-original">$${producto.precioOriginal}</span>
                <span class="precio-actual">$${producto.precio}</span>
                <span class="descuento">-${producto.descuento}</span>
            </div>
            <button onclick="window.location.href='producto.html?id=${producto.id}'">Ver Detalles</button>
        `;
    productosContainer.appendChild(div);
  });
}

// Función global para agregar al carrito (necesaria para producto.js)
function agregarAlCarrito(producto) {
  console.log("Producto agregado al carrito:", producto);
  // Aquí puedes implementar la lógica del carrito
}

// Actualizar carrito
function actualizarCarrito() {
  const carritoContainer = document.getElementById("contenido-carrito");
  carritoContainer.innerHTML = "";
  carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
    carritoContainer.appendChild(div);
  });
  document.getElementById("cantidad-carrito").textContent = carrito.length;
}

// Eliminar del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Mostrar/ocultar carrito
document.getElementById("carrito-btn").addEventListener("click", () => {
  document.getElementById("carrito").classList.toggle("oculto");
});

// Vaciar carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
});

// Slider de imágenes
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const dotsContainer = document.querySelector(".slider-dots");

let currentSlide = 0;
let slideInterval;

// Crear puntos de navegación
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  const offset = -currentSlide * 100;
  slider.style.transform = `translateX(${offset}%)`;

  // Actualizar puntos activos
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(currentSlide);
}

// Event listeners para los botones
prevBtn.addEventListener("click", () => {
  clearInterval(slideInterval);
  prevSlide();
  startAutoSlide();
});

nextBtn.addEventListener("click", () => {
  clearInterval(slideInterval);
  nextSlide();
  startAutoSlide();
});

// Auto-slide cada 5 segundos
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 5000);
}

// Iniciar auto-slide
startAutoSlide();
