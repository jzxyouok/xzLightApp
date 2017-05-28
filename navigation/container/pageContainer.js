
import React from 'react'
import PageView from './pageview'

import LazyLoadPage from "./lazyLoadPage";
/*
  如果在同一个container中需要展示同一个页面多次  那么这个页面的名称格式为 页面名称_唯一标示
  比如 index_11
*/
class PageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.arr = {};
    this.dict = {};
   
    this.prepareRoute(props);

  }

  prepareRoute(props,cacheSuccess){
    var route = [];
    if(props.owner){
      route = JSON.stringify(props.leftroute);
      route = JSON.parse(route);
    }
    var ToPageName = route.shift();
    this.curpagename = ToPageName;
    var key = props.owner.props.base.props.pkey+"_"+ToPageName;
    if(!this.arr[ToPageName]){
      var P = PageView;
      var ToPageInstance = props.owner.props.pagemanager.props.config.pages[ToPageName.split("_")[0]];
      if(!ToPageInstance.prototype.__proto__.forceUpdate){
        P = LazyLoadPage;
      }
      this.arr[ToPageName]=(<P 
                    ref={(instance)=>{
                      this.dict[ToPageName] = instance;
                    }}
                    leftroute={route} 
                    pagename={ToPageName} 
                    pagemanager={props.owner.props.pagemanager} 
                    key={key} 
                    pkey={key}></P>) ;

    }else{
      cacheSuccess&&cacheSuccess(route,ToPageName);
    }
  }

 
  componentWillReceiveProps(props){
    this.prepareRoute(props,(route,ToPageName)=>{
      this.dict[ToPageName].setState({leftroute:route,pagename:ToPageName});
    });
    
  }


  render() {
    var re = [];
    var className = "";
    if(this.props.className){
      className = this.props.className;
    }
    for(var key in this.arr){
      if(key===this.curpagename){
        re.push(<div key={key+"_containerwrapper"}>{this.arr[key]}</div>);
      }else{
        re.push(<div  key={key+"_containerwrapper"} style={{display:"none"}}>{this.arr[key]}</div>);
      }
    }
    return (<div className={className}>{re}</div>);
  }
}
export default  PageContainer;
