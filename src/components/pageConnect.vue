<template>

 <main>

     <div class="container">
       <!--
       <button @click.prevent="google"class="input-file" id='change' ></button>
       <label tabindex="0" for="change" class="input-file-trigger">google connect</label>-->
       <a @click.prevent="facebook"class="btn">
         Se connecter avec Facebook</a>
       <a @click.prevent="google"class="btn">
         Se connecter avec google</a>
     </div>


 </main>



</template>



<script>
export default {
  name: 'pageConnect',

  methods: {

      google : function () {
        let that = this;
        let vm = that.$parent.$parent;
        let parent = that.$parent;
        firebase.auth().signInWithPopup(vm.provider.google).then(function(result) {

          let token = result.credential.accessToken;
          let user = result.user;

          let checkUser = function () {
            firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
              let  data = snapshot.val();
              if (data == null){

                let createUser = function(userId, name){

                  firebase.database().ref('users/' + userId).set({
                    username: name,


                  }).then(function () {
                    console.log("new user", name, 'created')
                    parent.isConnect = true;
                    parent.profilPage = true;
                    parent.user = user;
                  })
                };
                createUser(user.uid, user.displayName);
              }else{
                console.log("compte déjà en db");
                console.log(parent.isConnect)
                parent.isConnect = true;
                parent.profilPage = true;
                parent.user = user;
              }


            });
          };
          checkUser(user.uid);
          console.log('object google:', user);
          //createUser(user.uid, user.displayName);

        });
      },
    facebook : function () {
      let that = this;
      let vm = that.$parent.$parent;
      let parent = that.$parent;
      vm.provider.facebook.setCustomParameters({
        'display': 'popup'
      });
      vm.provider.facebook.addScope('email');
      firebase.auth().signInWithPopup(vm.provider.facebook).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;

        // ...
        firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
          let  data = snapshot.val();
          if (data == null){

              firebase.database().ref('/users/' + user.uid).set({
                username: user.displayName,
                mail : user.email,
                isPhoto : false,


              }).then(function () {
                console.log("new user", name, 'created');

                parent.isConnect = true;
                parent.profilPage = true;
                parent.user = user;
              })

          }else{
            console.log("compte déjà en db");
            console.log(parent.isConnect);

            parent.isConnect = true;
            parent.profilPage = true;
            parent.user = user;
          }


        });
      });
      /*firebase.auth().signInWithRedirect(vm.provider.facebook);
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          let token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        let user = result.user;
        console.log(user);


      }).then(function(result) {

        let token = result.credential.accessToken;
        let user = result.user;
        let checkUser = function () {
          firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
            let  data = snapshot.val();
            if (data == null){

              let createUser = function(userId, name){

                firebase.database().ref('users/' + userId).set({
                  username: name,


                }).then(function () {
                  console.log("new user", name, 'created');

                  parent.isConnect = true;
                  parent.profilPage = true;
                  parent.user = user;
                })
              };
              createUser(user.uid, user.displayName);
            }else{
              console.log("compte déjà en db");
              console.log(parent.isConnect);

              parent.isConnect = true;
              parent.profilPage = true;
              parent.user = user;
            }


          });
        };
        checkUser(user.uid);
        console.log('object google:', user);
        //createUser(user.uid, user.displayName);

      });
    }*/
  }
  }
}


</script>


<style scoped>
  .container{
    position: fixed;
    bottom: 25vh;
    left: 0;
    right: 0;
    margin: auto;
  }
  main{
    background-image: url("../assets/Shade_logo_blanc.jpg");
    background-size: cover;
    background-position: 50% 50%;
    height:100vh;
    width: 100%;
    position: fixed;
  }

  .btn {
    background: -moz-linear-gradient(left, #e26a84 0%, #e5244e 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,#e26a84 0%,#e5244e 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,#e26a84 0%,#e5244e 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#e5244e',GradientType=1 ); /* IE6-9 */
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    font-family: Arial;
    color: #ffffff;
    font-size: 16px;
    padding: 13px 20px 13px 20px;
    text-decoration: none;
    margin: 20px;
    display:inline-block;
  }




</style>


