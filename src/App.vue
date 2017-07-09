<template>
  <div id="app">
    <page-connect v-if="!isConnect"></page-connect>
    <page-profil v-if="profilPage"></page-profil>
    <page-flow v-if="flowPage"></page-flow>
    <page-upload v-if="pageUpload"></page-upload>
    <page-filtre v-if="pageFiltre"></page-filtre>

  </div>
</template>

<script>
import pageConnect from './components/pageConnect'
import pageProfil from './components/pageProfil'
import pageFlow from './components/pageFlow'
import pageUpload from './components/pageUpload'
import pageFiltre from './components/pageFiltre'




export default {
  name: 'app',



  data: function () {
    return{
        isConnect : false, // boloolean pour savoir si l'utilisateur est connecté
        user :false, // objet user que renvoie google ou facebook auth
        profilPage:false,
        flowPage:false,
        pageFiltre:false,
        pageUpload:false,
        blob : false,
        userTab : false,
      // add each list in pagefiltre
        categoryList : ['bras','main','poitrine','pied','pouet','pop']
    }
  },



  // liste des composants
  components: {
    pageConnect,
    pageProfil,
    pageFlow,
    pageUpload,
    pageFiltre

  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  background-color: #e7dee8;
  padding-bottom: 200px;
}
@font-face {
  font-family: 'icomoon';
  src:  url('./assets/fonts/icomoon.eot?l8rcxw');
  src:  url('./assets/fonts/icomoon.eot?l8rcxw#iefix') format('embedded-opentype'),
  url('./assets/fonts/icomoon.ttf?l8rcxw') format('truetype'),
  url('./assets/fonts/icomoon.woff?l8rcxw') format('woff'),
  url('./assets/fonts/icomoon.svg?l8rcxw#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-arrow-left2:before {
  content: "\e902";
}
.icon-photo:before {
  content: "\e900";
}
.icon-like:before {
  content: "\e901";
}
.icon-user:before {
  content: "\e904";
}
.icon-x:before {
  content: "\e903";
}

</style>
