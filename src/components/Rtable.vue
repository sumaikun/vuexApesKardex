<template>

   <v-container> 
    <v-dialog
      v-model="dialog"
      width="80%"
    >
      <v-card>
        <v-card-title class="headline">Trazabilidad del elemento</v-card-title>
        <v-card>       
        <v-card-text>
          <table class="table" style="width:100%; text-align:center;"  v-if="!isFetching">
            <thead>
              <tr>
                <th>Fecha</th>              
                <th>Estado</th>
                <th>Ubicación</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="track in tracks"  v-bind:key="track" >
                <td>{{ track.timefield }}</td>                
                <td>{{ track.state }}</td>
                <td>{{ track.ubication }}</td>
                <td>{{ track.action }}</td>
              </tr>
            </tbody>  
          </table>
        </v-card-text>
   
        </v-card>
        
       </v-card>
    </v-dialog>

    <div>
      <h3>Filtros del nodo</h3>
      <div>
          <v-flex xs2>
              <v-text-field                      
                      label="Sku"  
                      v-model="sku"                    
              ></v-text-field>
          </v-flex>         
      </div>
      <div style="display:flex;">

         <v-flex xs5>
            <v-date-picker v-model="picker"></v-date-picker>
          </v-flex>
          <v-flex xs5>
            <v-date-picker v-model="picker2"></v-date-picker>
          </v-flex>

      </div>
    </div>
     <br/>

    <div style="display:flex; justify-content:space-around">
     

      <v-btn color="primary" @click="filterFromNodeSkus()" x-large >Filtrar sku</v-btn>
   
      <v-btn color="primary" @click="filterFromNodeDates()" x-large >Filtrar por fechas</v-btn>
    
      <v-btn color="primary" @click="getItems()" x-large >Traer todos los datos</v-btn>

    </div>  
    <br/>
    <Loading/>
    <v-card>
        <v-card-title>
        Trazabilidad de items
        <div class="flex-grow-1"></div>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>        

        <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        >      
       

        <!-- table options -->
          <template v-slot:item.button_action="{ item }">
            <v-btn color="primary" @click="trackItem(item)" >traz.</v-btn>
          </template>

        
        </v-data-table>
    </v-card>
   </v-container>
</template>

<script>
  import Loading from './Loading';


  export default {
    components:{
      Loading
    },
    computed:{
      items(){
        return this.$store.state.items
      },
      isFetching(){
          return this.$store.state.isFetching
      },
      tracks(){
          return this.$store.state.tracks
      }
    },
    data () {
      return {
        search: '',
        dialog: false,
        headers: [
          { text: 'Cliente', value: 'customer' },
          { text: 'Epc', value: 'epc' },
          { text: 'Sku', value: 'sku' },
          { text: 'Ubicacion', value: 'ubication' },
          { text: 'Estado', value: 'state' },
          { text: 'Descripción', value: 'description' },
          { text: 'Fecha', value: 'timefield' },
          { text: 'Accion', value: 'action' },
          { text: 'Opciones', value: 'button_action', sortable: false }
        ],
        filters: {
          sku: [],
          state: []
        },
        //picker: new Date().toISOString().substr(0, 10),
        //picker2: new Date().toISOString().substr(0, 10),
        picker: null,
        picker2: null,
        sku:""
      }
    },
    methods:{
      getItems: function() {
        this.$store.dispatch('getItems');
      },
      trackItem(item)
      {
        console.log(item);
        this.dialog = true;
        this.$store.dispatch('getTracks',item.epc);
      },
      columnValueList(val) {
        return this.items.map(d => d[val])
      },
      filterFromNodeSkus(){
        console.log(this.sku);
        
        let query = "";
        
        if(this.sku)
        {
          console.log("enviar sku");
          query = "filter[where][sku]="+this.sku;
        }       

        if(query != "")
        {
          this.$store.dispatch('getItemsWithFilter',query);
        }        

      },
      filterFromNodeDates(){
        console.log(this.picker);
        console.log(this.picker2);
        this.$store.dispatch("selectItemsRangeBetween2DatesQuery",{ date1:this.picker,date2:this.picker2});
        
      }      
    },
    beforeMount(){
      this.getItems()
    },
   
    
  }
</script>