require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
//获取图片信息

import imageDatas from '../data/imageDatas.json';
// 利用自执行函数， 将图片名信息转成图片URL路径信息
var imgDatas = (function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];

        singleImageData.imageURL = require('../images/' + singleImageData.fileName);

        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);
class ImgFigure extends React.Component{
    render(){
      return (
           <figure className="img-figure">
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
  render() {
        var conteollerUnits=[],
            imgFigures=[];
            imgDatas.forEach(function(value,i){
               imgFigures.push( <ImgFigure key={i} data={value}/>)
            })
    return (
        <section className="stage">
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
