

<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>APES</span>
        <span class="font-weight-light">KARDEX</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href=""        
      >
        <span class="mr-2">Prueba de concepto</span>
      </v-btn>
    </v-app-bar>

    <v-content>     
        <Rtable />
        
        <!--<div class="text-center">
          <v-btn color="primary" @click="test()" >Button</v-btn>
        </div>-->

    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
//import Loading from './components/Loading';
import Rtable from './components/Rtable';



export default {
  name: 'App',
  components: {
    //Loading,
    Rtable,
  },
  data: () => ({
    //
  }),
  methods:{
    test(){
      this.$store.dispatch('setFetching', true)
    }
  },
};
</script>
