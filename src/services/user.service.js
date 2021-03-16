import Api from './Api'

export default {
  Login(request){
    return Api().post('Users/authenticate', request);
  }  
}
