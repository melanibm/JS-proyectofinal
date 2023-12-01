let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
                <img class="carrito-producto-imagen" src="${
                  producto.imagen
                }" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                
            `;
      contenedorCarritoProductos.append(div);
    });
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }

  actualizarBotonesEliminar();
  actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
  botonesEliminnar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminnar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  Swal.fire({
    title: "¿Estas seguro?",
    icon: "question",
    html: `Se van a borrar todos tu productos`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `Si`,
    cancelButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      productosEnCarrito.length = 0;
      localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosEnCarrito)
      );
      cargarProductosCarrito();
    }
  });
}

function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  contenedorTotal.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );

  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.remove("disabled");

  const formularioCompraContainer = document.getElementById(
    "formulario-compra-container"
  );
  formularioCompraContainer.classList.remove("disabled");
}

document.addEventListener("DOMContentLoaded", function () {
  const formularioCompra = document.getElementById("formulario-compra");

  formularioCompra.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const formaPago = document.getElementById("forma-pago").value;

    console.log("Información del Cliente:");
    console.log("Nombre:", nombre);
    console.log("Apellidos:", apellidos);
    console.log("Correo electrónico:", correo);
    console.log("Teléfono:", telefono);
    console.log("Forma de Pago:", formaPago);

    formularioCompra.reset();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const formularioCompra = document.getElementById("formulario-compra");

  formularioCompra.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const formaPago = document.getElementById("forma-pago").value;

    const montoTotal = calcularMontoTotal();

    const fechaCompra = new Date().toLocaleDateString();

    const compra = {
      nombre,
      apellidos,
      correo,
      telefono,
      formaPago,
      fechaCompra,
      montoTotal,
    };

    guardarCompraEnHistorial(compra);

    formularioCompra.reset();
  });

  function calcularMontoTotal() {
    const productosEnCarrito = obtenerProductosEnCarrito();
    const montoTotal = productosEnCarrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
    return montoTotal;
  }

  function obtenerProductosEnCarrito() {
    const productosEnCarrito = localStorage.getItem("productos-en-carrito");
    return JSON.parse(productosEnCarrito) || [];
  }

  function guardarCompraEnHistorial(compra) {
    const historialCompras = obtenerHistorialCompras();
    historialCompras.push(compra);
    localStorage.setItem("historial-compras", JSON.stringify(historialCompras));
  }

  function obtenerHistorialCompras() {
    const historialCompras = localStorage.getItem("historial-compras");
    return JSON.parse(historialCompras) || [];
  }
});
