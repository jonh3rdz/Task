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
    if (e.target.matches("#btnFinalizar")) {
        btnFinalizar(e)
    }
});

const agregarCarrito = (e) => {
    console.log(e)
    let precio = parseInt(e.target.dataset.precio)
    let cantidad = parseInt(e.target.dataset.cantidad)
    let precioT = e.target.id == "btnFinalizar" ? 0 : precio
    let cantidadT = e.target.id == "btnFinalizar" ? 0 : cantidad

    const producto = {
        cantidad: cantidadT,
        precio: precioT,
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
        clone.querySelector("#cantidad").textContent = item.cantidad
        clone.querySelector("#total span").textContent = item.precio * item.cantidad
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
    const precioT = carritoArray.reduce((acc, current) => acc + current.precio * current.cantidad, 0)
    const cantidadT = carritoArray.reduce((a, b) => a + b.cantidad, 0)
    const producto = {
        cantidad: cantidadT,
        precio: precioT,
    };
    carritoArray.push(producto)
    carrito.textContent = ""
    carritoArray.forEach((item) => {
        const total = item.cantidad

        if (total != 0) {
            const clone = template.content.cloneNode(true)
            clone.querySelector("#cantidad").textContent = item.cantidad
            clone.querySelector("#total span").textContent = item.precio
            fragment.appendChild(clone)
            carrito.appendChild(fragment)
        }
    })

    //Deshabilita los botones al finalizar la compra
    // document.querySelectorAll(".btn-success").forEach((e) => {
    //     e.disabled = true
    // })
    // document.querySelectorAll(".btn-danger").forEach((e) => {
    //     e.disabled = true
    // })
    document.querySelectorAll(".btn-primary").forEach((e) => {
        e.disabled = true
    })
    document.querySelectorAll(".btn-outline-primary").forEach((e) => {
        e.disabled = true
    })

    //Oculta los botones al finalizar la compra
    document.querySelectorAll(".btn-success").forEach((e) => {
        e.style.display = "none"
    })
    document.querySelectorAll(".btn-danger").forEach((e) => {
        e.style.display = "none"
    })
    // document.querySelectorAll(".btn-primary").forEach((e) => {
    //     e.style.display = "none"
    // })

    // document.querySelectorAll(".btn-outline-primary").forEach((e) => {
    //     e.style.display = "none"
    // })
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
