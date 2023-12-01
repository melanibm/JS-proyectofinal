document.addEventListener('DOMContentLoaded', function () {
    const inputBusqueda = document.getElementById('inputBusqueda');
    const historialComprasContainer = document.getElementById('historialCompras');


    mostrarHistorialCompras();

    inputBusqueda.addEventListener('input', mostrarHistorialCompras);

    function mostrarHistorialCompras() {
    
        const historialCompras = obtenerHistorialCompras();

        const terminoBusqueda = inputBusqueda.value.toLowerCase();

        const historialFiltrado = historialCompras.filter(compra =>
            Object.values(compra).some(valor => typeof valor === 'string' && valor.toLowerCase().includes(terminoBusqueda))
        );

        mostrarHistorialEnInterfaz(historialFiltrado);
    }

    function mostrarHistorialEnInterfaz(historial) {
        
        historialComprasContainer.innerHTML = '';

        historial.forEach(compra => {
            const divCompra = document.createElement('div');
            divCompra.classList.add('col-md-4', 'mb-3');
            console.log('Compra:', compra);


            divCompra.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${compra.nombre} ${compra.apellidos}</h5>
                        <p class="card-text">Fecha: ${compra.fechaCompra}</p>
                        <p class="card-text">Monto Total: $${compra.montoTotal.toFixed(2)}</p>
                        
                    </div>
                </div>
            `;

            historialComprasContainer.appendChild(divCompra);
        });
    }

    function obtenerHistorialCompras() {
       
        const historialCompras = localStorage.getItem('historial-compras');
        return JSON.parse(historialCompras) || [];
    }
});

