require('normalize.css/normalize.css');
require('styles/App.scss');
import ReactDOM from 'react-dom';
import React from 'react';
//获取图片信息

import imageDatas from '../data/imageDatas.json';
// 利用自执行函数， 将图片名信息转成图片URL路径信息
var imgDatas = (function(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];

        singleImageData.imageURL = require('../images/' + singleImageData.fileName);

        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);
  //位置随机函数
  function getRange(min,max){
     return Math.ceil(Math.random()*(max-min)+min);
  }
  function get30Deg(){
    return (Math.random() > 0.5?'+':'-')+Math.ceil(Math.random()*30)
  }
class ImgFigure extends React.Component{

    render(){
      var styleObj={};
      if(this.props.arrange.pos){
         styleObj=this.props.arrange.pos
      }
      if (this.props.arrange.rotate){
        ['-moz-','-ms-','-webkit-',''].forEach(function(value){
          styleObj[value+'transform']='rotate('+this.props.arrange.rotate+'deg)'
        }.bind(this))      
      }
      return (
           <figure className='img-figure' style={styleObj}>
               <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
               />
               <figcaption>
                  <h2 className='img-title'>{this.props.data.title}</h2>
               </figcaption>
           </figure>
        )
    }
}
class AppComponent extends React.Component {
  constructor(props){
    super(props);
        this.Constant={
    centerPos:{//中间
       left:0,
       right:0
    },
    hPosRange:{
      leftSecX:[0,0],//左边区域水平方向取值范围
      rightSecX:[0,0],//右边区域水平方向取值范围
      y:[0,0]
    },
    vPosRange:{//上方
      x:[0,0],
      topY:[0,0]
    }
  };

    this.state={
      imgsArrangeArr:[//图片位置信息
            

      ]
    }
  }

  rearrange(centerIndex){
       var imgsArrangeArr =this.state.imgsArrangeArr,

           Constant=this.Constant,
           centerPos=Constant.centerPos,
           hPosRange=Constant.hPosRange,
           vPosRange=Constant.vPosRange,
           //水平左边区域取值范围
           hPosRLeftSecX=hPosRange.leftSecX,
           //水平右边区域取值范围
           hPosRRightSecx=hPosRange.rightSecX,
           //两边区域垂直方向取值范围
           hPosRY=hPosRange.y,
           //上方区域垂直方向取值范围
           vPosTopY=vPosRange.topY,
           //上方区域水平取值范围
           vPosX=vPosRange.x,
           //存储上方区域图片信息
           imgsArrangeTopArr=[],
           //上方区域的图片数量0-1
           topImgNum=Math.floor(Math.random() * 2),
           topImgSpliceIndex = 0,
           //从图片信息中取得需要居中的图片并切除
           imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);
        
           
           //居中,不需要旋转
           imgsArrangeCenterArr[0].pos=centerPos;
           imgsArrangeCenterArr[0].rotate=0;
           //上方区域
           //随机获取中心图片的索引
           topImgSpliceIndex=Math.ceil(Math.random()*(imgsArrangeArr.length-topImgNum));
            
           //在获取的索引位置切除0-1位，此时图片位置信息数组长度减少
           imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
           imgsArrangeTopArr.forEach(function(value,index){

                 imgsArrangeTopArr[index]={
                      pos:{
                          top:getRange(vPosTopY[0],vPosTopY[1]),
                          left:getRange(vPosX[0],vPosX[1])
                        },
                      rotate:get30Deg()
                      
                 }
           })
            
           //左右两边区域，此时图片位置信息数组已经没有中心图片和上方图片的位置信息了
           for(var i = 0,j=imgsArrangeArr.length,k=j/2;i<j;i++){
               var hPosRangeLORX=null;
               if(i<k){
                  hPosRangeLORX=hPosRLeftSecX;
               }else{
                   hPosRangeLORX=hPosRRightSecx;
               }
               imgsArrangeArr[i]={
                pos:{ 
                  top:getRange(hPosRY[0],hPosRY[1]),
                  left:getRange(hPosRangeLORX[0],hPosRangeLORX[1])
                  },
                  rotate:get30Deg()
 
               }
           }
           //确认上方图片数组含有切除的图片位置信息，然后在切除位合并
           if(imgsArrangeTopArr&&imgsArrangeTopArr[0]){
               imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0])
           }
           //合并中心图片
           imgsArrangeArr.splice(centerPos,0,imgsArrangeCenterArr[0])
           
          this.setState({imgsArrangeArr:imgsArrangeArr})
  }
  //渲染后，初始化图片信息
  componentDidMount(){
    //获取舞台大小
  var stageDOM=ReactDOM.findDOMNode(this.refs.stage),
      stageW=stageDOM.scrollWidth,
      stageH=stageDOM.scrollHeight,
      halfStageW=Math.ceil(stageW/2),
      halfStageH=Math.ceil(stageH/2);

      //图片大小
   var imgFigureDOM=ReactDOM.findDOMNode(this.refs.imgFig0),
       imgW=imgFigureDOM.scrollWidth,
       imgH=imgFigureDOM.scrollHeight,
       halfImgW=Math.ceil(imgW/2),
       halfImgH=Math.ceil(imgH/2);
       //中间图片位置信息
       this.Constant.centerPos={
          left:halfStageW-halfImgW,
          top:halfStageH-halfImgH
       };
       
       //舞台左边图片最小位置信息
       this.Constant.hPosRange.leftSecX[0] = -halfImgW;
       //舞台左边图片最大位置信息
       this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
      
      // 舞台右边图片最小位置信息
       this.Constant.hPosRange.rightSecX[0]= halfStageW + halfImgW;
       //舞台右边图片最大位置信息

       this.Constant.hPosRange.rightSecX[1]= stageW - halfImgW;

       //舞台左右区域垂直方向大小范围
       this.Constant.hPosRange.y[0] = -halfImgH;
       this.Constant.hPosRange.y[1] = stageH - halfImgH;
       //舞台上方区域垂直方向大小范围
       this.Constant.vPosRange.topY[0] = -halfImgH;
       this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
       //舞台上方区域图片水平方向大小范围
       this.Constant.vPosRange.x[0]=halfStageW - imgW;
       this.Constant.vPosRange.x[1]=halfStageW;

      this.rearrange(0)
  }
  render() {
        var conteollerUnits=[],
            imgFigures=[];
            imgDatas.forEach(function(value,i){//初始化图片位置信息
              if(!this.state.imgsArrangeArr[i]){

                   this.state.imgsArrangeArr[i]={
                        pos:{
                           left:0,
                           top:0
                        },
                        rotate:0
                   }
              } //bind（this）获取组件，不使用bind会导致上方的this指向imgDatas数组
               imgFigures.push(<ImgFigure arrange={this.state.imgsArrangeArr[i]} ref={'imgFig'+i} key={i} data={value}/>)}.bind(this))
    return (
        <section className="stage" ref="stage">
        	<section className="img-sec">
	        	   {imgFigures}
        	</section>
        	<nav className="controller-nav">
	        	   {conteollerUnits}
        	</nav>
        </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
