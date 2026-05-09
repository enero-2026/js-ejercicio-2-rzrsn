const productosPorDefecto = [
  { nombre: "Laptop", categoria: "Tecnología", precio: 999 },
  { nombre: "Playera", categoria: "Ropa", precio: 20 },
  { nombre: "Celular", categoria: "Tecnología", precio: 599 },
  { nombre: "Zapatos", categoria: "Ropa", precio: 80 },
  { nombre: "Audífonos", categoria: "Tecnología", precio: 150 },
  { nombre: "Pantalón", categoria: "Ropa", precio: 45 }
];

let todosLosProductos = [];
async function cargarProductos() {
  try {
    const respuesta = await fetch("https://fakestoreapi.com/products");
    const datos = await respuesta.json();
    todosLosProductos = datos;
    llenarCategorias();
    mostrarProductos(todosLosProductos);
  } catch (error) {
    console.log("error al cargar el api, usando productos locales");
    todosLosProductos = productosPorDefecto;
    llenarCategorias();
    mostrarProductos(todosLosProductos);
  }
}
function llenarCategorias() {
  const select = document.getElementById("selectCategoria");

  const categorias = [];
  for (let i = 0; i < todosLosProductos.length; i++) {
    const cat = todosLosProductos[i].category || todosLosProductos[i].categoria;
    if (!categorias.includes(cat)) {
      categorias.push(cat);
    }
  }

  for (let i = 0; i < categorias.length; i++) {
    const opcion = document.createElement("option");
    opcion.value = categorias[i];
    opcion.textContent = categorias[i];
    select.appendChild(opcion);
  }
}
function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedorProductos");
  const mensaje = document.getElementById("mensajeSinResultados");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    mensaje.style.display = "block";
    return;
  }

  mensaje.style.display = "none";

  for (let i = 0; i < lista.length; i++) {
    const producto = lista[i];

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const nombre = producto.title || producto.nombre;
    const categoria = producto.category || producto.categoria;
    const precio = producto.price || producto.precio;
    const imagen = producto.image || null;

    let imgHTML = "";
    if (imagen) {
      imgHTML = `<img src="${imagen}" alt="${nombre}">`;
    }

    tarjeta.innerHTML = `
      ${imgHTML}
      <h3>${nombre}</h3>
      <p class="categoria">${categoria}</p>
      <p class="precio">$${precio}</p>
    `;

    contenedor.appendChild(tarjeta);
  }
}
function filtrarProductos() {
  const textoBusqueda = document.getElementById("campoBusqueda").value.toLowerCase();
  const categoriaSeleccionada = document.getElementById("selectCategoria").value;

  const resultado = todosLosProductos.filter(function(producto) {
    const nombre = (producto.title || producto.nombre).toLowerCase();
    const categoria = producto.category || producto.categoria;

    const coincideNombre = nombre.includes(textoBusqueda);
    const coincideCategoria = categoriaSeleccionada === "" || categoria === categoriaSeleccionada;

    return coincideNombre && coincideCategoria;
  });

  mostrarProductos(resultado);
}

document.getElementById("campoBusqueda").addEventListener("input", filtrarProductos);
document.getElementById("selectCategoria").addEventListener("change", filtrarProductos);


cargarProductos();