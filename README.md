## Vue + Vuex + Vue SSR + Firebase (Cloud Functions+Hosting) :fire: :fire: :fire:

> Boilerplate de implementación de creación de una WebAPP hecha en Vuejs con Server Side Rendering, lista para ser implementada como una cloud functions en Firebase pueden ver el demo en [Vuejs SSR + Firebase :fire:](https://vue-firebase-ssr.firebaseapp.com/) 

Inspirado en la ultima serie de videos de Server Side Rendering en cloud functions de firebase, decidí implementar una app con SSR. Basicamente, todo se reduce a crear una app basada en express con la documentación de [Vuejs SSR](https://ssr.vuejs.org/en/) y exportar la app de `express()` como una cloud functions `exports.ssrapp = functions.https.onRequest(app)`.

Adicional tomar todas las peticiones de nuestro hosting de Firebase y hacer redirecta nuestra funcion exportada: 

> firebase.json
```
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "function": "ssrapp"
      }
    ]
  }
}

```

## Indicaciones generales

Asumire que ya tienen instalado node, firebase-cli, así como también luego de clonar esta app ejecutar `firebase init` para inicializar los valores de su proyecto en firebase.

``` bash
# Clona este repo
git clone https://github.com/jqEmprendedorVE/vue-firebase-ssr.git 

# entra al directorio 
cd  vue-firebase-ssr

# instala las dependencias
npm install

# serve with hot reload at localhost:8080
npm run dev

# para servir la app con firebase serve para emular localmente los cambios hechos en dev
npm run start

# para desplegar la app, a firebase
npm run deploy

```

> ## Proximamente
> Una mejor explicación de como clonar este repo.
