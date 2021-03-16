import userService from '../../services/user.service';

const state = {
    isAuth: (JSON.parse(sessionStorage.getItem('isAuth')) != null) ? JSON.parse(sessionStorage.getItem('isAuth')) : false,      
    user: JSON.parse(sessionStorage.getItem('user')) != null ? JSON.parse(sessionStorage.getItem('user')) : null
};

const getters = {
    isAuth: state => state.isAuth 
};
const mutations = {
    AddUser: (state, user) => state.user = user,
    AddAuth: (state, auth) => state.isAuth = auth,
    Clear: (state) => {
        state.user = null;
        state.isAuth = false;
    },    
};
const actions = {
    addUser:(context, user)=>{
        context.commit('AddUser', user);
        sessionStorage.setItem('user', JSON.stringify(user));
    },
    addAuth:(context, auth)=>{
        context.commit('AddAuth', auth);
        sessionStorage.setItem('isAuth', auth);
    },
    async Login(context, userData){ 
        context.dispatch('alert/clear', null, { root: true });       
        await userService.Login(userData).then((resp) => {
            if (resp.status == 200) {
              context.dispatch('addUser', resp.data);
              context.dispatch('addAuth', true);
            }else{
                context.dispatch('alert/error', 'Login Faild', { root: true });
            }
          }).catch(error => {
                console.log(error.response)
                if(error.response && error.response.data)
                    context.dispatch('alert/error', error.response.data.message, { root: true });
                else
                    context.dispatch('alert/error', "Internal Error", { root: true });
          });
    },
    Logout(context) {        
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isAuth');
        context.commit('Clear');
    }
};

export const user = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};