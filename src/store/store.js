import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//let apiurl = "http://localhost:3000";

let apiurl = "http://54.165.31.135:3000";

export default new Vuex.Store({
    state: {
        isFetching : false,
        items: [],
        tracks: []
    },
    mutations: {
        SET_FETCHING(state, fstate){
           state.isFetching = fstate
        },
        SET_ITEMS(state, items){
            state.items = items
        },
        SET_TRACKS(state, tracks){
            state.tracks = tracks
        },         
    },
    actions: {
        setFetching({commit}, fstate){
            commit('SET_FETCHING', fstate)
        },
        getItems({commit}){
            commit('SET_FETCHING', true);
            axios.get(apiurl+"/api/Item").then(response =>
            {
               console.log(response);               
               commit('SET_FETCHING', false);
               commit('SET_ITEMS', response.data);
            });
        },
        selectItemsRangeBetween2DatesQuery({commit},dates){
            commit('SET_FETCHING', true);
            axios.get(apiurl+"/api/queries/selectItemsRangeBetween2Dates?date1="+dates.date1+"&date2="+dates.date2)
            .then(
                response =>
            {
               console.log(response);               
               commit('SET_FETCHING', false);
               commit('SET_ITEMS', response.data);
            });            
        },
        getItemsWithFilter({commit},query){
            commit('SET_FETCHING', true);
            axios.get(apiurl+"/api/transactItem?"+query)
            .then(
                response =>
            {
               console.log(response);               
               commit('SET_FETCHING', false);
               commit('SET_ITEMS', response.data);
            });            
        },
        getTracks({commit},epc){
            commit('SET_FETCHING', true);
            //axios.get("http://localhost:3000/api/transactItem?filter[where][item]=resource:org.apes.kardex.Item%23"+epc)
            axios.get(apiurl+"/api/transactItem?filter[where][epc]="+epc)
            .then(
                response =>
            {
               console.log(response);               
               commit('SET_FETCHING', false);
               commit('SET_TRACKS', response.data);
            });            
        }
    },
    getters: {

    }

})