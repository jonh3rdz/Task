const carrito = document.querySelector("#carrito")
const template = document.querySelector("#template")
const botones = document.querySelectorAll(".card button")
const fragment = document.createDocumentFragment()
const footer = document.querySelector("#footer")
const templateFooter = document.querySelector("#templateFooter")
const header = document.querySelector("#header")
const templateHeader = document.querySelector("#templateHeader")

let carritoArray = []

document.addEventListener("click", (e) => {
    if (e.target.matches(".card button")) {
        agregarCarrito(e)
    }

    if (e.target.matches("#btnAumentar")) {
        btnAumentar(e)
    }

    if (e.target.matches("#btnDisminuir")) {
        btnDisminuir(e)
    }
    if (e.target.matches("#btnFinalizar")) {
        btnFinalizar(e)
    }
});

const agregarCarrito = (e) => {
    console.log(e)
    let precio = parseInt(e.target.dataset.precio)
    //let cantidad = parseInt(e.target.dataset.cantidad)
    let precioTotal = e.target.id == "btnFinalizar" ? 0 : precio
    let cantidadTotal = e.target.id == "btnFinalizar" ? 0 : 1

    const producto = {
        id: e.target.dataset.id,
        titulo: e.target.dataset.bebida,
        cantidad: cantidadTotal,
        precio: precioTotal,
    }

    const index = carritoArray.findIndex((item) => item.id === producto.id)

    if (index === -1) {
        carritoArray.push(producto)
    } else {
        carritoArray[index].cantidad++
    }
    mostrarCarrito()
}

const mostrarCarrito = () => {
    carrito.textContent = ""
    carritoArray.forEach((item) => {
        const clone = template.content.cloneNode(true)
        clone.querySelector("#producto").textContent = item.titulo
        clone.querySelector("#cantidad").textContent = item.cantidad
        clone.querySelector("#total span").textContent = item.precio * item.cantidad
        clone.querySelector(".btn-success").dataset.id = item.id
        clone.querySelector(".btn-danger").dataset.id = item.id

        fragment.appendChild(clone)
    })
    carrito.appendChild(fragment)
    mostrarHeaderFooter()
}


const btnAumentar = (e) => {
    carritoArray = carritoArray.map((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++
        }
        return item
    })
    mostrarCarrito()
}
// testingApp
const btnDisminuir = (e) => {
    carritoArray = carritoArray.filter((item) => {
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--

                if (item.cantidad === 0) return

                return item
            }
        } else {
            return item
        }
    });
    mostrarCarrito()
};
const btnFinalizar = (e) => {
    const precioTotal = carritoArray.reduce((acc, current) => acc + current.precio * current.cantidad, 0)
    const cantidadTotal = carritoArray.reduce((a, b) => a + b.cantidad, 0)

    const producto = {

        cantidad: cantidadTotal,
        precio: precioTotal,
    };
    carritoArray.push(producto)

    carrito.textContent = ""

    carritoArray.forEach((item) => {

        const total = item.cantidad

        if (total != 0) {
            const clone = template.content.cloneNode(true)
            clone.querySelector("#producto").textContent = item.titulo
            clone.querySelector("#cantidad").textContent = item.cantidad
            clone.querySelector("#total span").textContent = item.precio
            clone.querySelector(".btn-success").dataset.id = item.id
            clone.querySelector(".btn-danger").dataset.id = item.id

            fragment.appendChild(clone)
            carrito.appendChild(fragment)

        }

    })

    document.querySelectorAll(".btn-success").forEach((e) => {
        e.disabled = true
    })
    document.querySelectorAll(".btn-danger").forEach((e) => {
        e.disabled = true
    })
    document.querySelectorAll(".btn-primary").forEach((e) => {
        e.disabled = true
    })

};
const mostrarHeaderFooter = () => {
    header.deleteTHead()
    footer.textContent = ""
    const total = carritoArray.reduce((acc, current) => acc + current.precio * current.cantidad, 0)
    const cloneHeader = templateHeader.content.cloneNode(true)
    const cloneFooter = templateFooter.content.cloneNode(true)
    cloneFooter.querySelector("p span").textContent = total
    header.appendChild(cloneHeader)
    footer.appendChild(cloneFooter)
};






// elDemio/