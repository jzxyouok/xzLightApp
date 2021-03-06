import React from "react"
import "./index.less"

import Style from "../../../utils/style"

class Popover extends React.Component {
  constructor(props) {
    super(props)
    this.isInit = true;
    this.state={
      target:props.target,
      direction:props.direction
    }
    this.offsetX = props.offsetX || 0;
    if(isNaN(this.offsetX)){
      this.offsetX = 0;
    }else{
      this.offsetX = parseInt(this.offsetX);
    }
    this.offsetY = props.offsetY || 0;
    if(isNaN(this.offsetY)){
      this.offsetY = 0;
    }else{
      this.offsetY = parseInt(this.offsetY);
    }
    this.dirArr = ["bottom","top","left","right"];
  }

  componentWillReceiveProps(nextPros){
    this.isInit = false;
    var config = nextPros.config||{};
    this.setState({target:config.target,direction:nextPros.direction});
  }

  componentDidMount(){
    var pN = this.root.parentNode,Re;
    while(pN&&pN.tagName&&pN.tagName.toLowerCase()!=="body"){
      if(pN.className.indexOf("xz-page-route-wrapper")>=0){
        Re = pN;
        break;
      }
      pN = pN.parentNode;
    }
    if(Re){
      Re.insertBefore(this.root,null);
    }
  }

  renderChild(){
    if(this.isInit){
      return null;
    }
    var contentArr = ["xz-popover-content"];
    var bkStyle = {};
    if(this.state.target){
      contentArr.push("xz-popover-content-temp-show");
      if(this.props.bkOpacity===0){
        bkStyle.opacity = 0;
      }else{
        bkStyle.opacity = this.props.bkOpacity||.3;
      }
      bkStyle.backgroundColor =this.props.bkColor||"#000";
      bkStyle.visibility = "visible";
    }else{
      contentArr.push("xz-popover-content-hide");
      bkStyle.opacity = 0;
      bkStyle.backgroundColor = "#000";
      bkStyle.visibility = "hidden";
    }
    var bkClick={};
    if(this.props.onBackLayerClick){
      bkClick.onClick = this.onBackLayerClick.bind(this);
    }
    var child = [];

    child.push(<div style={bkStyle} key="xz-popover-bk" {...bkClick} ref={(bkLayer)=>{this.bkLayer = bkLayer;
    }} 
      className="xz-popover-bk"></div>);
    child.push(<div ref={(content)=>{
      this.content = content;
      this.showContent(content);
     
    }} key="xz-popover-content" 
      className={contentArr.join(" ")}><div className='xz-popover-inner-content'>
      {this.props.renderItem()}
      <i ref={(tri)=>{
        this.tri = tri;
      }}></i></div></div>);
    return child;
      
  }

  showContent(content){

    if(content&&this.state.target){
      var rect = this.state.target.getBoundingClientRect();

      // console.log();
      var direction = (this.state.direction||"").toLowerCase();
      if(this.dirArr.indexOf(direction)<0){
        direction = "bottom";
        if(rect.top-content.offsetHeight>=0){
          direction = "top";
        }else if(rect.bottom+content.offsetHeight<=Style.screen.height){
          direction = "bottom";
        }else if(rect.left-content.offsetWidth>=0){
          direction = "left";
        }else if(rect.right+content.offsetWidth<=Style.screen.width){
          direction = "right";
        }
      }

      var cssText = "";
      switch(direction){
        case "top":
          cssText= "bottom:" +(Style.screen.height-rect.top+this.offsetY)+"px;";
          cssText = this._getLeft(cssText,rect,content,"bottom");
        break;
        case "bottom":
          cssText= "top:" +(rect.bottom+this.offsetY)+"px;";
          cssText = this._getLeft(cssText,rect,content,"top");
        break;
        case "right":
          cssText = "left:"+(rect.right+this.offsetX)+"px;";
          cssText = this._getTop(cssText,rect,content,"left");
        break;
        case "left":
        console.log(rect);
          cssText = "right:"+(Style.screen.width-rect.left+this.offsetX)+"px;";
          cssText = this._getTop(cssText,rect,content,"right");
        break;
        default:
          cssText= "bottom:" +(Style.screen.height-rect.top+this.offsetY)+"px;";
          cssText = this._getLeft(cssText,rect,content,"bottom");
        break;
      }
      //dirArr
      content.style.cssText = cssText;
    }
  }

  _getTop(cssText,rect,content,tridirection){
    //this.tri
     var oh = content.offsetHeight;
    var top = rect.top+rect.height/2-oh/2+this.offsetY;
    if(top+oh>Style.screen.height){
      top = Style.screen.height - oh+this.offsetY;
    }
    if(top<0){
      top = this.offsetY;
    }

    var triTop = (rect.top - top)+rect.height/2-Style.rem2px(0.28);
    this.tri.className='xz-popover-tri xz-popover-tri-'+tridirection;
     this.tri.style.top = triTop+"px";
    cssText = cssText+"top:"+top+"px";
    return cssText;
  }

  _getLeft(cssText,rect,content,tridirection){
    //this.tri
    var ow = content.offsetWidth;
    var left = rect.left+rect.width/2-ow/2+this.offsetX;
    if(left+ow>Style.screen.width){
      left = Style.screen.width - ow+this.offsetX;
    }
    if(left<0){
      left = this.offsetX;
    }
    var triLeft = (rect.left - left)+rect.width/2-Style.rem2px(0.28);
    this.tri.className='xz-popover-tri xz-popover-tri-'+tridirection;
    this.tri.style.left = triLeft+"px";
    cssText = cssText+"left:"+left+"px";
    return cssText;
  }

  onBackLayerClick(){
    this.props.onBackLayerClick();
  }

  getPos(){
    if(!this.state.target){
      return {top:0,left:0}
    }
   
    return {top:rect.bottom+"px",left:(rect.left-350)+"px"};
  }

  render() {
   
    return (<div ref={(root)=>{this.root = root;}} className="xz-popover">
        {this.renderChild()}
      </div>);
  }
}

export default Popover;
