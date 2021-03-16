import companyService from '../../services/company.service';

const state = {
    companies: []    
};

const getters = {
    Companies: state => state.companies 
};
const mutations = {
    AddCompanies: (state, companies) => state.companies = companies ,
    Add: (state, companies) => state.companies.push(companies), 
    Change: (state, {id, data}) => state.companies[id] = data,
    Delete: (state, id) => {
        let index = state.companies.findIndex(company => company.id == id)
        state.companies.splice(index, 1)
    }      
};
const actions = {    
    async GetCompanies(context){ 
        context.dispatch('alert/clear', null, { root: true });       
        await companyService.GetCompanies().then((resp) => {
            if (resp.status == 200) {
              context.commit('AddCompanies', resp.data);
            }else{
                context.dispatch('alert/error', 'Get Comapnies Failed', { root: true });
            }
          }).catch(error => {
                console.log(error.response)
                if(error.response && error.response.data)
                    context.dispatch('alert/error', error.response.data.message, { root: true });
                else
                    context.dispatch('alert/error', "Internal Error", { root: true });
          });
    },    
    async CompanyAdd(context, req){ 
        context.dispatch('alert/clear', null, { root: true });       
        await companyService.CompanyAdd(req).then((resp) => {
            if (resp.status == 200) {
                req.id = resp.data;
                context.commit('Add', req);
                context.dispatch('alert/success', 'Add success', { root: true });
            }else{
                context.dispatch('alert/error', 'Change company Failed', { root: true });
            }
          }).catch(error => {
                console.log(error.response)
                if(error.response && error.response.data)
                    context.dispatch('alert/error', error.response.data.message, { root: true });
                else
                    context.dispatch('alert/error', "Internal Error", { root: true });
          });
    },
    async CompanyChange(context, req){ 
        context.dispatch('alert/clear', null, { root: true });
        let status = true;       
        await companyService.CompanyChange(req.id, req.data).then((resp) => {
            if (resp.status == 200) {
                let id = req.id;
                let data = req.data;
                data.id = req.id;
                context.commit('Change', {id , data});
                context.dispatch('alert/success', 'Change Success', { root: true });
            }else{
                status = false;
                context.dispatch('alert/error', 'Change Companies Failed', { root: true });
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
    },
    async CompanyDelete(context, id){ 
        let status = true; 
        context.dispatch('alert/clear', null, { root: true });       
        await companyService.CompanyDelete(id).then((resp) => {
            if (resp.status == 200) {
                context.commit('Delete', id);
                context.dispatch('alert/success', 'Delete success', { root: true });
            }else{
                status = false;
                context.dispatch('alert/error', 'Delete company Failed', { root: true });
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

export const company = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};