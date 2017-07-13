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
        categoryList : ['bras','main','poitrine','yeux','torse','bouche','cous','dos','epaule','fesses','jambe','pied']
    }
  },



  // liste des composants
  components: {
    pageConnect,
    pageProfil,
    pageFlow,
    pageUpload,
    pageFiltre

  },
  created(){
      //alert("Attention, vous ne pourrez pas vous connecter si vous n'etes pas sur un vrai navigateur ");

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
  src:  url('./assets/fonts/icomoon.eot?7ekcem');
  src:  url('./assets/fonts/icomoon.eot?7ekcem#iefix') format('embedded-opentype'),
  url('./assets/fonts/icomoon.ttf?7ekcem') format('truetype'),
  url('./assets/fonts/icomoon.woff?7ekcem') format('woff'),
  url('./assets/fonts/icomoon.svg?7ekcem#icomoon') format('svg');
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

.icon-camera:before {
  content: "\e900";
  color: #fff;
}
.icon-edit:before {
  content: "\e901";
  color: #3c1042;
}
.icon-Facebook:before {
  content: "\e902";
  color: #fff;
}
.icon-Flash_desactivé:before {
  content: "\e903";
  color: #fff;
}
.icon-Google:before {
  content: "\e904";
  color: #fff;
}
.icon-jeux_chrono:before {
  content: "\e905";
  color: #fff;
}
.icon-jeux_donnant:before {
  content: "\e906";
  color: #fff;
}
.icon-like-blc:before {
  content: "\e907";
  color: #fff;
}
.icon-like:before {
  content: "\e908";
}
.icon-Profil:before {
  content: "\e909";
  color: #fff;
}
.icon-reglages:before {
  content: "\e90a";
  color: #3c1042;
}
.icon-retour-blc:before {
  content: "\e90b";
  color: #fff;
}
.icon-retour:before {
  content: "\e90c";
  color: #3c1042;
}
.icon-Tchat:before {
  content: "\e90d";
  color: #3c1042;
}
.icon-validation:before {
  content: "\e90e";
  color: #3c1042;
}

</style>
