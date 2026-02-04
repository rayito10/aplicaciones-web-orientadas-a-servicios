const baseDeDatosCloud = [
    { nombre: "Amazon EC2", tipo: "IaaS", estado: "Activo", costo: 35.00 },
    { nombre: "Google Drive Enterprise", tipo: "SaaS", estado: "Activo", costo: 12.50 },
    { nombre: "Heroku App Server", tipo: "PaaS", estado: "Inactivo", costo: 0.00 },
    { nombre: "Azure Virtual Machines", tipo: "IaaS", estado: "Activo", costo: 40.00 }
];

const cargarServicios = () => {
    // Limpiar el contenido actual del contenedor
    const contenedor = document.getElementById('contenedor-servicios');
    contenedor.innerHTML = '';
    
    // Recorrer el arreglo usando forEach
    baseDeDatosCloud.forEach(servicio => {
        //  Determinar la clase CSS según el estado
        let claseEstado = '';
        if (servicio.estado === 'Activo') {
            claseEstado = 'activo';
        } else {
            claseEstado = 'inactivo';
        }
        
        // Crear el HTML de cada tarjeta usando Template Strings
        const tarjetaHTML = `
            <div class="card">
                <h3>${servicio.nombre}</h3>
                <p class="tipo">Tipo: ${servicio.tipo}</p>
                <p class="${claseEstado}">Estado: ${servicio.estado}</p>
                <p>Costo mensual: $${servicio.costo.toFixed(2)} USD</p>
            </div>
        `;
        
        // Inyectar la tarjeta en el contenedor
        contenedor.innerHTML += tarjetaHTML;
    });
};

