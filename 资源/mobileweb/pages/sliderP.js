module.exports ={
  type:"pageview",
  root:["上部区域","中部分区域"],
  pages:["home","setting","page0","why"],
  style:{
    flexDirection:"column",
    zIndex:100
  },
  components:{
    上部区域:{
      type:"xz.view",
      style:{
        height:160,
        backgroundColor:"rgb(106,208,155)"
      }
    },
    中部分区域:{
      type:"xz.view",
      root:["计划view"],
      style:{
        backgroundColor:"#fff",
        flex:1
      }
    },
    计划view:{
      type:"xz.view",
      style:{alignItems:"flex-start",paddingLeft:20,backgroundColor:"#fff",paddingTop:13,paddingBottom:13},
      root:["计划icon"],
      onClick:[
        {type:"navigate",to:"saoyisao"},
        {type:"modifyProperty",show:false,page:"sliderP"}
      ]
    },
    计划icon:{
      type:"xz.icon",
      style:{},
      textPos:"right",
      textStyle:{marginLeft:20,fontSize:17},
      iconStyle:{fontSize:20,color:"black"},
      font:"icomoon_e90e",
      text:"计划"
    }
  }
};
