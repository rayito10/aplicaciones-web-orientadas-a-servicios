const categoria = document.getElementById('categoria');

fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(categorias => {
        categorias.forEach(categoria => {
            const tarjeta = document.createElement("option");
            console.log(categoria);
            categoria.innerHTML += `<option value="${categoria.slug}">${categoria.name}</option>`;
        })  
    })

const guardarProducto = () => {
    //Creamos las variables de los elementos con los que vamos a interacturar
    const titulo = document.getElementById("titulo").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const categoria  = document.getElementById("categoria").value;
    const descripcion = document.getElementById("descripcion").value;
    const resultado = document.getElementById("mensaje-exito");

    //Validamos que los elementos no esten vacios
    if (!titulo || !precio || !categoria || !descripcion) {
        resultado.textContent = "Por favor, complete todos los campos.";
        return;
    }

    //Creamos el objeto que se va por el body
    const producto = {
        title: titulo,
        price: precio,
        category: categoria,
        description: descripcion,
        thumbnail: "https://i.dummyjson.com/image/400x200/008080/ffffff?text=" + titulo
    };

    //Hacemos la petición POST con el método post
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
    .then(response => response.json())
    .then(data=>{
        console.log("Respuesta de la api: " + Object.entries(data));
        resultado.style.display = "block";
        resultado.innerHTML = `
            <strong>Producto guardado exitosamente!</strong><br>
            ID: ${data.id}
            Título: ${data.title}
            Precio: $${data.price}.00
        `;
    })
}