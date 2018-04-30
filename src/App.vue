<template>
  <div id="app">





      <transition
        name="custom-classes-transition"
        leave-active-class="animated fadeOutLeft"
        mode="out-in"

      >
        <page-flow key ="1" v-if="flowPage"  ></page-flow>

        <page-filtre key="2" v-if="pageFiltre"  ></page-filtre>

        <page-upload key="3" v-if="pageUpload"></page-upload>

        <page-connect key="4" v-if="!isConnect"></page-connect>

        <page-profil key="5" v-if="profilPage"></page-profil>
      </transition>



    <footer-menu v-if="isConnect"></footer-menu>




  </div>
</template>

<script>
import pageConnect from './components/pageConnect'
import pageProfil from './components/pageProfil'
import pageFlow from './components/pageFlow'
import pageUpload from './components/pageUpload'
import pageFiltre from './components/pageFiltre'
import footerMenu from './components/menu'




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
        categoryList : ['bras','main','poitrine','yeux','torse','bouche','cous','dos','epaule','fesses','jambe','pied'],
      show:true
    }
  },



  // liste des composants
  components: {
    pageConnect,
    pageProfil,
    pageFlow,
    pageUpload,
    pageFiltre,
    footerMenu

  },
  updated(){
      //alert("Attention, vous ne pourrez pas vous connecter si vous n'etes pas sur un vrai navigateur ");
    console.log('change', this.$children[0])
    this.$children[0].profil = this.profilPage

  },
  mounted: function () {

    let vm = this;

    let ref = firebase.database().ref('users/' + vm.user.uid );
    ref.on('value', function(snapshot) {
      let data = snapshot.val();
      vm.userTab =
        data;
    });
  }
}
</script>

<style>

  .fade-enter-active,
  .fade-leave-active {
    -webkit-transition: all ease 0.6s;
    -moz-transition: all ease 0.6s ;
    -ms-transition: all ease 0.6s ;
    -o-transition: all ease 0.6s ;
    transition: all ease 0.6s ;
    opacity: 1;
  }

  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */

  {
    opacity: 0
  }
*{
    transition: all ease 0.5s !important;
  -webkit-animation-duration: 0.5!important;
  -moz-animation-duration: 0.5s!important;
  -ms-transition-animation-duration: 0.5s!important;
  -vendor-animation-duration: 0.5s!important;
  -vendor-animation-delay: 0.5s !important;
  -vendor-animation-iteration-count: infinite !important;
  }

  .spinner {
    margin: 100px auto;
    width: 40px;
    height: 40px;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 41;
    bottom:80px;

    -webkit-animation: sk-rotate 2.0s infinite linear;
    animation: sk-rotate 2.0s infinite linear;
  }

  .dot1, .dot2 {
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #333;
    border-radius: 100%;

    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
  }

  .dot2 {
    top: auto;
    bottom: 0;
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
  @keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}

  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
  }
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
  padding-bottom: 70px;
  height: 100vh;
  box-sizing: border-box;
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
  .icon-flow:before {
    content: "\e90f";
    color: rgb(69, 28, 72);
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
  color: rgb(69, 28, 72);
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
