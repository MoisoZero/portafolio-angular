import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from './../interfaces/producto.interface';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cagarProductos();

  }

  private cagarProductos() {

    return new Promise((resolve, reject) => {

      this.http.get('https://angular-html-ea95a.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });

    });

  }

  getProducto(id: string) {

    return this.http.get(`https://angular-html-ea95a.firebaseio.com/productos/${id}.json`);

  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      // carga productos
      this.cagarProductos().then(() => {
        // ejecutar despues de tener los productos
        // aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // aplica filtro
      this.filtrarProductos(termino);
    }

    //  this.productosFiltrado = this.productos.filter( producto => {
    //    return true;
    //  });
    //  console.log(this.productosFiltrado);
  }

  private filtrarProductos(termino: string) {

    termino = termino.toLowerCase();

    // console.log(this.productosFiltrado);
    this.productosFiltrado = [];

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLowerCase();

      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
