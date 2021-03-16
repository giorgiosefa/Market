import marketService from '../../services/market.service';

const state = {
    markets: []    
};

const getters = {
    Markets: state => state.markets 
};
const mutations = {
    AddMarkets: (state, markets) => state.markets = markets,
    Add: (state, markets) => state.markets.push(markets), 
    Change: (state, {id, data}) => state.markets[id] = data,
    Delete: (state, id) => {
        let index = state.markets.findIndex(market => market.id == id)
        state.markets.splice(index, 1)
    },
    ClearMarkets: (state) => state.markets = []        
};
const actions = { 
    clear:(context) => {
        context.commit('ClearMarkets'); 
        context.dispatch('alert/clear', null, { root: true });
    },   
    async GetMarketsAll(context){
        context.dispatch('clear');
        await marketService.GetMarketsAll().then((resp) => {
            if (resp.status == 200) {
              context.commit('AddMarkets', resp.data);
            }else{
                context.dispatch('alert/error', 'Get Markets All Faild', { root: true });
            }
          }).catch(error => {
                console.log(error.response)
                if(error.response && error.response.data)
                    context.dispatch('alert/error', error.response.data.message, { root: true });
                else
                    context.dispatch('alert/error', "Internal Error", { root: true });
          });
    },
    async GetMarkets(context){    
        await marketService.Markets().then((resp) => {
            if (resp.status == 200) {
              context.commit('AddMarkets', resp.data);
            }else{
                context.dispatch('alert/error', 'Get Markets Failed', { root: true });
            }
          }).catch(error => {
                console.log(error.response)
                if(error.response && error.response.data)
                    context.dispatch('alert/error', error.response.data.message, { root: true });
                else
                    context.dispatch('alert/error', "Internal Error", { root: true });
          });
    },
    async MarketAdd(context, req){      
        await marketService.MarketAdd(req).then((resp) => {
            if (resp.status == 200) {
                req.id = resp.data;                
                context.commit('Add', req);
                context.dispatch('alert/success', 'Add success', { root: true });
            }else{
                context.dispatch('alert/error', 'Add Markets Failed', { root: true });
            }
          }).catch(error => {
                console.log(error.response)
                if(error.response && error.response.data)
                    context.dispatch('alert/error', error.response.data.message, { root: true });
                else
                    context.dispatch('alert/error', "Internal Error", { root: true });
          });
    },
    async MarketChange(context, req){      
        let status = true;
        await marketService.MarketChange(req.id, req.data).then((resp) => {
            if (resp.status == 200) {
                let id = req.id;
                let data = req.data;
                data.id = req.id;
                context.commit('Change', {id , data});
                context.dispatch('alert/success', 'Add success', { root: true });
            }else{
                status = false;
                context.dispatch('alert/error', 'Add Markets Failed', { root: true });
            }
          }).catch(error => {
                status = false;
                console.log(error.response)
                if(error.response && error.response.data)
                    context.dispatch('alert/error', error.response.data.message, { root: true });
                else
                    context.dispatch('alert/error', "Internal Error", { root: true });
          });
          return status;
    }
    ,
    async MarketDelete(context, id){ 
        let status = true;   
        await marketService.MarketDelete(id).then((resp) => {
            if (resp.status == 200) {
                context.commit('Delete', id);
                context.dispatch('alert/success', 'Delete success', { root: true });
            }else{
                status = false;
                context.dispatch('alert/error', 'Delete Markets Failed', { root: true });
            }
          }).catch(error => {
                console.log(error.response)
                status = false;
                if(error.response && error.response.data)
                    context.dispatch('alert/error', error.response.data.message, { root: true });
                else
                    context.dispatch('alert/error', "Internal Error", { root: true });
          });
          return status;
    }
};

export const market = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};