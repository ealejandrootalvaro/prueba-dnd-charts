npm install


npm start


### 1. Ajustar Codigo

const ul = document.querySelector('ul');

const setColumn = (column) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            ul.innerHTML += `<li>${column}</li>`
            resolve()
        }, Math.random() * 5000);
    })

}

const columns = ['Columna SKT_ID', 'Columna Amount', 'Columna Getway', 'Columna Date', 'Columna Issuer', 'Columna User_id'];

async function showColumns() {
    for(let col = 0; col < columns.length; col++) {
        await setColumn(columns[col]);
    }
}

showColumns();


### Preguntas:

¿Porque no debería usar la libreria ​JQuery​, ​si estoy usando ​ReactJS​?

El uso de librerias o funciones que modifican el DOM directamente pueden generar inconsistencias cuando se usa ReactJS. ReactJS utiliza una representación en memoria del DOM (virtual DOM) y continuamente sincroniza con el DOM.

Si se hace un cambio directamente al DOM se pueden generar problemas con la representación que tiene react de este.

¿Porque usarias ​Hooks ​de las nuevas versiones de ​ReactJS, ​en lugar de ​class component​?

Los hooks permiten reusar logica entre componentes. Antes de los hooks era necesario hacer uso de patrones como High Order Componentes o render props, pero estos patrones tienen ventajas de desventajas.

Adicional a esto los ciclos de vida de los class component dificultan las pruebas y la división a componentes mas pequeños (la logica esta mezclada en los diferentes ciclos de vida). Los hooks resuelven este problema al permitir separar cada componente en pequeñas funciones (hooks o custom hooks)

¿Que es un archivo ​JSX​?

JSX es una extensión de javascript que permite combinar Javascript y HTML. Su principal motivación es permitir que la logica de renderizado este agrupada con la logica de los elementos de la interface grafica. Le da a html todo el poder de javascript.

¿Que diferencia hay entre una ​function ​y una ​arrow function​ de Javascript?

En las funciones normales de Javascript su contexto (el lugar donde apunta this) se afecta dependiendo de la forma en la que se llaman. Este comportamiento obliga a hacer cambios de referencia, ejemplo: var self = this, para conservar el "contexto" que se quiere.

Con las arro function el contexto se define al declararlas. Independiente de como se llamen siempre conservan el contexto (this) del lugar donde fueron declaradas

¿Que es ​Redux​​ y cómo nos ayuda en los proyectos?

Redux es una libreria de Javascript que permite controlar el estado de las aplicaciones. Redux evita que se hagan cambios directos en el estado y la unica forma de hacer las modificaciones es atraves de acciones. El historial de acciones siempre produce el mismo estado lo que facilita hacer debugs, implementar caracteristicas de time travel (deshacer cambios o devolver la aplicación a un estado anterior) y escalar la arquitectura de datos.

¿Que nos permite hacer la siguiente declaración?

const ​anyFunction = (​param_1​) => (​param_2​) =>​​param_1 ​+​​param_2

La declaración anterior hace uso de una tecnica de programación funcional llamada currying. Currying es un proceso que permite transformar una funcion con multiples argumentos en una secuencia de funciones que retornan otras funciones.

Esta transformación permite crear funciones reutilizables, evitar llamar funciones siempre con el mismo argumento, que permiten hacer procesos usando composición de funciones. Esta composición de funciones facilita las pruebas y el desarrollo de nuevas funcionales sobre bloques desacoplados

