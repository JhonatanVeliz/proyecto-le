const $ = (nodo, isAll, documento = document.body) => isAll ? documento.querySelectorAll(nodo) : documento.querySelector(nodo);
const contenedorProductos = $('.carrito-productos');
let contador = null;
const total = $('#total');

function createdProducto(name, precio, id, cantidad) {

    const valor = Number(precio.slice(1));
    const cantidadProducto = Number(cantidad);
    const valorCantidad = valor * cantidadProducto;

    const HTML = `
    <li class="item compras" id="${id}">

        <p><span class="item__cantidad">${cantidad}</span> ${name}</p>
        <p>₡${valor}</p>

        <div class="carrito__btns">
            <button class="item__btn item__btn-eliminar" onclick="eliminar(${id}, ${valorCantidad})">Eliminar</button>
        </div>

    </li>
    `
    contador += valorCantidad;

    total.innerText = `₡${contador}`;
    const dataProducto = {
        name,
        precio,
        id
    }
    // localStorage.setItem(id, JSON.stringify(dataProducto));
    contenedorProductos.insertAdjacentHTML('afterbegin', HTML)
}

function eliminar(id, precio) {
    const productoItem = document.getElementById(id);
    productoItem.remove();

    removerItem(id)

    contador = contador - precio;
    total.innerText = `₡${contador}`;
}

function removerItem(id) {
    try {
        const btnComprarItem = document.querySelector(`[data-id="${id}"]`);
        btnComprarItem.classList.remove('comprado');
    } catch (error) {}
}

const btnComprarCards = $('.comprar', true);

btnComprarCards.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        const id = getId();

        const target = e.target;
        target.setAttribute('data-id', id);
        target.classList.add('comprado');
        const producto = e.target.parentNode;
        const productoNombre = producto.querySelector('.card__titulo').innerText;
        const productoPrecio = producto.querySelector('.precio').innerText;
        const cantidad = producto.querySelector('.cantidad').value;
        const cantidadProducto = cantidad ? cantidad : 1;

        createdProducto(productoNombre, productoPrecio, id, cantidadProducto);
    })
});

function getId() {
    const id = new Date().getTime();
    return `${id}`;
}

const productosParaStorage = [];

const btnComprarTodo = $('#comprar-todo');
btnComprarTodo.addEventListener('click', () => {
    try {
        const productosComprar = document.querySelectorAll('.compras');
        
        productosComprar.forEach((producto)=>{
            productosParaStorage.push(producto.id)
        })
        // localStorage.setItem('productos', JSON.stringify(productosParaStorage));
    } catch (error) {}
})