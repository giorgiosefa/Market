import Api from './Api'

export default {
  GetMarketsAll(){
    return Api().get('Market/GetAll');
  },  
  Markets(){
    return Api().get('Market');
  },
  MarketById(id){
    return Api().get('Market/' + id);
  },
  MarketAdd(request){
    return Api().post('Market/Add', request);
  },
  MarketChange(id, request){
    return Api().put('Market/' + id, request);
  },
  MarketDelete(id){
    return Api().delete('Market/' + id);
  }
}
