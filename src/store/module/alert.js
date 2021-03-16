//import userService from '../../services/user.service';

const state = {
    alert: {
        type: null,
        message: null
    }
};
  
const getters = {     
    alert: state => state.alert
};

const mutations = {
    success: (state, message) => {
        state.alert.type = 'alert-success';
        state.alert.message = message;
    },
    error:(state, message) => {
        state.alert.type = 'alert-danger';
        state.alert.message = message;
    },
    clear: (state) => {
        state.alert.type = null;
        state.alert.message = null;
    }
};

const actions = {
    success: (context, message) => {
        context.commit('success', message);
    },
    error(context, message) {
        context.commit('error', message);
    },
    clear(context) {
        context.commit('clear');
    }
};

export const alert = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  };

