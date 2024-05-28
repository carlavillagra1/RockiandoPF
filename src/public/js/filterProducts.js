async function filtrarProductos(page = 1) {
    const categoria = document.getElementById('categoria-select').value;
    const limit = document.getElementById('limit-input').value || 5;
    const query = document.getElementById('query-input').value || '';
    const sort = document.getElementById('sort-select').value || '';
    
    // Actualizar la URL del navegador
    const newUrl = `/home?categoria=${categoria}&limit=${limit}&page=${page}&sort=${sort}&query=${query}`;
    history.pushState(null, '', newUrl);


    try {
        const response = await fetch(`/api/product/filtrar/${categoria}?limit=${limit}&page=${page}&sort=${sort}&query=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        const productosContainer = document.getElementById('productos');
        productosContainer.innerHTML = '';  // Limpiar contenedor

        if (result.docs.length === 0) {
            productosContainer.innerHTML = '<h1>No hay productos para mostrar</h1>';
            return;
        }

        // Generar HTML dinámicamente
        result.docs.forEach(producto => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('carts');
            
            const thumbnail = document.createElement('strong');
            thumbnail.classList.add('infoFoto');
            thumbnail.textContent = producto.thumbnail;
            productDiv.appendChild(thumbnail);

            const title = document.createElement('strong');
            title.classList.add('info');
            title.textContent = producto.title;
            productDiv.appendChild(title);

            const price = document.createElement('strong');
            price.classList.add('info');
            price.textContent = `Precio: $${producto.price}`;
            productDiv.appendChild(price);

            const detailsLink = document.createElement('a');
            detailsLink.href = `/api/views/productDetail/${producto._id}`;
            detailsLink.classList.add('btnDetail');
            detailsLink.textContent = 'Ver detalles';
            productDiv.appendChild(detailsLink);

            productosContainer.appendChild(productDiv);
        });

        // Paginación
        const paginateDiv = document.createElement('div');
        paginateDiv.classList.add('paginate');

        if (result.hasPrevPage) {
            const prevLink = document.createElement('a');
            prevLink.href = `#`;
            prevLink.textContent = '<< Anterior';
            prevLink.onclick = () => filtrarProductos(result.prevPage);
            paginateDiv.appendChild(prevLink);
        }

        const pageSpan = document.createElement('span');
        pageSpan.textContent = result.page;
        paginateDiv.appendChild(pageSpan);

        if (result.hasNextPage) {
            const nextLink = document.createElement('a');
            nextLink.href = `#`;
            nextLink.textContent = 'Siguiente >>';
            nextLink.onclick = () => filtrarProductos(result.nextPage);
            paginateDiv.appendChild(nextLink);
        }

        productosContainer.appendChild(paginateDiv);

    } catch (error) {
        console.error('Error al filtrar productos:', error);
        document.getElementById('productos').innerHTML = "<h1>Error al filtrar productos</h1>";
    }
}
