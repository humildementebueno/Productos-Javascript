class Product{
    constructor(name,price,year){
        this.name=name;
        this.price=price;
        this.year=year;
    }
}

class UI{
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card-center-margin">
            <div class="card-body">
                <strong>Producto Nombre</strong>: ${product.name}
                <strong>Producto Precio</strong>: ${product.price}
                <strong>Producto Año</strong>: ${product.year}
                <a href="#" class="boton-delete-product" name="delete">Delete</a>
            </div>
        </div>
        `;
        productList.appendChild(element);
        
        
    }

    resetForm(){
        document.getElementById('product-form').reset();//este metodo reset resetea el formulario
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado Satisfactoriamente', 'green');
        }
    }
    showMessage(message, cssClass){
        const div=document.createElement('div');
        div.className = `alert alert ${cssClass}`;
        div.appendChild(document.createTextNode(message));
        //mostrando in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div,app);//aqui insertamos antes de la app
        setTimeout(function (){
            document.querySelector('.alert').remove();
        }, 3000);//sirve para que desaparesca lo anunciado en un breve tiempo
    }
}

//eventos dom
document.getElementById('product-form').addEventListener('submit', function (e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name,price,year);
    
    const ui = new UI();

//validando datos
    if(name === ''|| price === '' || year === ''){
       return ui.showMessage('Completa los campos POR FAVOR!!','background:red');
    }

    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Producto agregado satisfactoriamente',{color:"blue"});

    e.preventDefault();//sirve para cancelar el refresh de submit
});

document.getElementById('product-list').addEventListener('click',function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
});