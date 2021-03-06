import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import Avatar from "../../components/headeravatar"
import SearchBar from "../../components/searchbar"
import HomeStore from "../home/store"
import Store from './store'
import Popover from './components/popover'
import List from './components/list'


class PageView extends React.Component {
	static connectStore(){
		return {homeStore:HomeStore,store:Store}
	}

  constructor(props) {
    super(props)
  }


  showPopver(e){
    this.props.store.headerPopoverConfig = {
      target:e.target,
      direction:"bottom"
    };
  }

  onRefresh(){}
  render() {

    return (<div>
      <Popover store={this.props.store}/>
    	<div className='qq-header'>
    		<Avatar homestore={this.props.homeStore}/>
        <span className='qq-title'>消息</span>
        <span className='qq-header-act' onClick={this.showPopver.bind(this)}>更多</span>
    	</div>
      <xz.ScrollView 
      onRefresh={this.onRefresh.bind(this)}
      className='qq-mes-scroll'>
        <SearchBar/>
      	<List store={this.props.store}/>
        </xz.ScrollView>
      </div>);
  }
}
export default PageView;
