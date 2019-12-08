import React, { Component } from 'react';
import '../css/Home.css';
import { Slide } from 'react-slideshow-image';
 
const slideIframes = [
  'https://www.youtube.com/embed/jCFWEzIVILc',
  'https://www.youtube.com/embed/kR_gi_kEbPE',
  'https://www.youtube.com/embed/RxAtuMu_ph4',
  'https://www.youtube.com/embed/r7rcE7bhCFE'
  
];
 
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}

class Home extends Component{
    render() {       
        return (
          <div>
              <div className="slide-container">
        <Slide {...properties}>
        <div className="each-slide">
           <iframe title='1' width="560" height="315" src={slideIframes[0]} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          <div className="each-slide"> 
            <iframe title='2' width="600" height="315" src={slideIframes[1]} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          <div className="each-slide">            
            <iframe title='3' width="560" height="315" src={slideIframes[2]} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          <div className="each-slide">
            <iframe title='4' width="560" height="315" src={slideIframes[3]} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
         
        </Slide>
      </div>
          </div>
        );
      }
}

export default Home