import {observable, autorun} from 'mobx';
import {fetch} from "../../../index"
class IndexStore {
	
    @observable searchBarStatus = 'init';// show hide
    @observable searchBarIsOpacity = true;
    @observable mainLoadingStatus = "loading";
    @observable listLoadingStatus = "loading";
    @observable drawLayoutConfig = {};
    @observable isShowSelector =false;

    @observable ListDataSource = [{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
    isInLoading = false;

    loadMoreData(){
    	if(this.isInLoading){
    		return;
    	}
    	this.isInLoading = true;
    	setTimeout(()=>{
    		this.ListDataSource = this.ListDataSource.concat([{},{},{},{},{}]);
    		this.isInLoading = false;
    	},2000)
    }
}

export default IndexStore;

