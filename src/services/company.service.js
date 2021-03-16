import Api from './Api'

export default {
  GetCompanies(){
    return Api().get('Company');
  },
  CompanyByMarkedId(marketId){
      return Api().get('Company/' + marketId);
  },
  CompanyAdd(request){
    return Api().post('Company/Add', request);
  },
  CompanyChange(id, request){
    return Api().put('Company/' + id, request);
  },
  CompanyDelete(id){
    return Api().delete('Company/' + id);
  }
}
