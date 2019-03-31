import React from 'react';
import ReactDOM from 'react-dom';
import ReactLoading from 'react-loading';
import { markdown } from 'markdown';
const fs = require("fs");

import Rank from './rank.js'
import './public/main.css'
import './public/bootstrap.min.css'

import $ from 'jquery';

import InlineBlock from 'react-inline-block'

import styles from './styles.css';

import Joints from './joints';
import GraphicsEngine from './graphics';
import {PoseNet} from './posenet';
import {getPose} from './graphics';
import {startRecord,stopRecord} from './graphics';


class MainComp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            slide: 0,
            play: 0
        }
    }

        render(){
        return (
                <div>
                    
                    <audio id="wavingAud" hidden src="./dist/wavingflag.mp3"></audio>
                    <div className="jumbotron" style={{height : '50px', paddingTop: '1rem', marginBottom: '0px'}}>
                        <h1><p align="center">DanceSmash</p></h1>
                    </div>
                    <div id="app" className="navbar-na" style={{display: 'flex', flexDirection: 'row', width: "100vw"}}>
                            
                            <div id="n1" style={{flexBasis: "33%",backgroundColor: this.state.slide==0?"orange":"white"}} onClick={()=>{this.setState({slide: 0})}}
                             // className="col-xl-4 col-md-4 col-lg-4 active nav-element"
                             >  
                                    <h3><p align="center">DNCE-Net</p></h3>
                                    <p align="center">Deep Neural Choreography Emulation Network</p>
                            </div>
                            
                            <div id="n2" style={{flexBasis: "33%",backgroundColor: this.state.slide==1?"orange":"white"}} onClick={()=>{this.setState({slide: 1})}}  > 
                                    <h3><p align="center">Compete</p></h3> 
                                    <p align="center">Showcase your dancing skills globally</p>
                            </div>
                            <div id="n3" style={{flexBasis: "33%",flexGrow: 1,backgroundColor: this.state.slide==2?"orange":"white"}} onClick={()=>{this.setState({slide: 2})}} > 
                                    <h3><p align="center">Rank</p></h3> 
                                    <p align="center">Rate other players</p>
                            </div>
                            
                    </div>
                { this.state.slide == 0 ?

                    <div className="slides jumbotron" style={{height:'750px',backgroundColor:'f5f5f5 !important'}}>
                            
                            <InlineBlock className="col-lg-6 col-xl-6 col-md-6" >
                                <div className="container" style={{position:'absolute',top:'-500px'}}>
                                
                                    <div className="container" >
                                            <div className="form-group">
                                                    <label>Select song:</label>
                                                    <select className="form-control" id="sel1">
                                                    <option>Waving Flag</option>
                                                    <option>Where are you now</option>
                                                    <option>Chandelier</option>
                                                    <option>We will rock you</option>
                                                    </select>
                                            </div>
                                            
                                            <div id="analyse" onClick={()=>{
                                                
                                                bpmdict={'Waving Flag':'152bpm', 'Where are you now':'230bpm', 'Chandelier':'100bpm', 'We will rock you':'160bpm'}
                                                document.getElementById('beats').style.visibility='visible'
                                            
                                                document.getElementById('text').innerHTML='Loading...'
                                                var s1 = document.getElementById('s1')
                                                var s2 = document.getElementById('s2')
                                                var beats = document.getElementById('beats')
                                                
                                                s1.style.webkitAnimation = 'none';
                                                s2.style.webkitAnimation = 'none';
                                                beats.style.webkitAnimation = 'none';
                                                
                                                setTimeout(function() {
                                                    s1.style.webkitAnimation = '';
                                                    s2.style.webkitAnimation = '';
                                                    beats.style.webkitAnimation = '';
                                                }, 10);
                                            
                                                setTimeout(function(){
                                                    var e=document.getElementById("sel1")
                                                    // console.log(e.options[e.selectedIndex].text)
                                                    var temp=bpmdict[e.options[e.selectedIndex].text]
                                                    document.getElementById('text').innerHTML=temp
                                                    var bpm=temp
                                                    // console.log(bpm)
                                                    bpm=bpm.substring(0,bpm.length-3)
                                                    bpm=(Number)(bpm)
                                                    bpm=60000/bpm
                                                    bpm=Math.round(bpm)
                                                    console.log(bpm)
                                                    document.getElementById("beats").style.animationDuration = bpm.toString()+"ms";
                                                },3500)


                                            }} className="btn align-items-center btn-info"> Analyse</div>
                                            &nbsp;
                                            <div name="play" onClick={()=>{
                                                
                                                if(!this.state.play){
                                                    document.getElementById('wavingAud').play()
                                                    document.getElementById('wavingVid').play()
                                                }else{
                                                    document.getElementById('wavingAud').pause()
                                                    document.getElementById('wavingVid').pause()
                                                }
                                                this.setState({play: !this.state.play})
                                                }} className="btn align-items-center btn-danger"> Play/Pause</div>
                                            
                                    </div>
                                    <br />
                                    <br /><br /><br /><br />
                                    <div id="beats" style={{height: '100px', width: '100px', visibility: 'hidden'}} className="progress beatanimation blue">
                                        <span className="progress-left">
                                            <span id="s1" className="progress-bar anim2"></span>
                                        </span>
                                        <span className="progress-right">
                                            <span id="s2" className="progress-bar anim1"></span>
                                        </span>
                                        <div id="text" className="progress-value">Loading...</div>
                                    </div>
                                </div>
                            </InlineBlock>
                            <InlineBlock className="col-lg-6 col-xl-6 col-md-6" >
                                <p align="center"><video id="wavingVid" src="./dist/wavingflag.mov" style={{height:'500px',width:'500px'}} /></p>
                            </InlineBlock>
                            
                    </div>

: this.state.slide == 1?
                    <App />
:
                    <Rank />
                    
                }
                <script src="./public/main.js"></script>
            </div>
            
        );
   }
}































/**
 * React Component for runnign neural networks and 3D graphics
 */
class App extends React.Component {

    /**
     * the class constructor
     * @param {args} props for the parent class
     */
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            webcam: true,
        }
    }

     /**
     * One of React's life cycle methods
     * Once the current React component is loaded, this function
     * initializes neural network model, graphics engine, and webcam.
     */
    async componentDidMount() {
        this.joints = new Joints();
        this.graphics_engine = new GraphicsEngine(this.refs.babylon, this.joints);
        this.posenet = new PoseNet(this.joints, this.graphics_engine, this.refs);
        const descContent = fs.readFileSync("./description.md", "utf-8");
        // this.refs.description.innerHTML = markdown.toHTML(descContent);
        await this.posenet.loadNetwork();
        this.setState({loading: false});
        this.posenet.startPrediction().then((webcam) => {
            this.setState({ webcam });
        });
    }

    /** Asks for webcam access if ti was denied */
    askWebCam(){
        this.posenet.startPrediction();
    }

    /**
     * React Component's render method for rendering HTML components
     */
    render() {
        return (
            <div id="container">
                <h2 className="text-center" id="h2">
                    Make Your Dance Video With Avatar To Compete And Show Your Talent
                </h2>
                <button onClick={startRecord}>
                    Start
                </button>
                <button onClick={stopRecord}>
                    Stop
                </button>
                
                <div className="row"  id="row">
                    <div className="col-6">
                        <div className="float-right"
                            style={{display:this.state.loading ? 'none' : 'block'}}>
                            <video ref="video" id="video" playsInline/>
                            <canvas ref="output" width={500} height={500} style={{ display: this.state.webcam ? 'block' : 'none' }}/>
                            {/* <h1>Move Farther</h1> */}
                            {!this.state.webcam && <WeCamAccess/>}
                        </div>
                        <div id="loader" style={{ display: !this.state.loading ? 'none' : 'block' }}>
                            <h3 id="loadTitle">Tensorflow Model loading ...</h3>
                            <ReactLoading type="cylon" color="grey" height={'20%'} width={'20%'} id="reactLoader"/>
                        </div>
                    </div>
                    <div className="col-6">
                        <canvas ref="babylon" width={500} height={500} />
                    </div>
                </div>
               
            </div>
        );
    }
    
    
    
    
//     render(){
//         return (
//                 <div>
//                     <script src="./public/main.jsx"></script>
//                     <script src="jquery.min.js"></script>
//                     <script src="bootstrap.min.js"></script>
//                     <div className="jumbotron" style={{height : '50px', paddingTop: '1rem', marginBottom: '0px'}}>
//                         <h1><p align="center">DanceSmash</p></h1>
//                     </div>
//                     <div id="app" className="navbar-na" style={{paddingTop:'1rem'}}>
                            
//                             <InlineBlock id="n1" onClick={()=>{this.setState({slide: 0})}}
//                              className="col-xl-4 col-md-4 col-lg-4 active nav-element"
//                              >  
//                                     <h3><p align="center">DNCE-Net</p></h3>
//                                     <p align="center">Deep Neural Choreography Emulation Network</p>
//                             </InlineBlock>
                            
//                             <InlineBlock id="n2" onClick={()=>{this.setState({slide: 1})}} className="col-xl-4 col-md-4 col-lg-4 nav-element" > 
//                                     <h3><p align="center">Compete</p></h3> 
//                                     <p align="center">Showcase your dancing skills globally</p>
//                             </InlineBlock>
//                             <InlineBlock id="n3" onClick={()=>{this.setState({slide: 2})}} className="col-xl-3 col-md-4 col-lg-4 nav-element" > 
//                                     <h3><p align="center">Rank</p></h3> 
//                                     <p align="center">Rate other players</p>
//                             </InlineBlock>
                            
//                     </div>
//                 { this.state.slide == 0 ?

//                     <div className="slides jumbotron" style={{height:'750px',backgroundColor:'f5f5f5 !important'}}>

//                             <InlineBlock className="col-lg-6 col-xl-6 col-md-6" >
//                                 <div className="container">
//                                     <br />
                                
//                                     <div className="container" >
//                                             <div className="form-group">
//                                                     <label>Select song:</label>
//                                                     <select className="form-control" id="sel1">
//                                                     <option>YMCA</option>
//                                                     <option>Where are you now</option>
//                                                     <option>Chandelier</option>
//                                                     <option>We will rock you</option>
//                                                     </select>
//                                             </div>
                                            
//                                             <div id="analyse" className="btn align-items-center btn-info"> Analyse</div>
//                                             &nbsp;
//                                             <div name="play" className="btn align-items-center btn-danger"> Play</div>
                                            
//                                     </div>
//                                     <br />
//                                     <br /><br /><br /><br />
//                                     <div id="beats" style={{height: '100px', width: '100px'}} className="progress beatanimation blue">
//                                         <span className="progress-left">
//                                             <span id="s1" className="progress-bar anim2"></span>
//                                         </span>
//                                         <span className="progress-right">
//                                             <span id="s2" className="progress-bar anim1"></span>
//                                         </span>
//                                         <div id="text" className="progress-value">Loading...</div>
//                                     </div>
//                                 </div>
//                             </InlineBlock>
//                             <InlineBlock className="col-lg-6 col-xl-6 col-md-6" >
//                                 <canvas>hi</canvas>
//                             </InlineBlock>
                            
//                     </div>

// : this.state.slide == 1?
//                     <div className="slides jumbotron" style={{height:'750px',backgroundColor:'f5f5f5 !important'}}>
//                             <div className="form-group">
//                                     <label>Select song:</label>
//                                     <select className="form-control" id="sel1">
//                                     <option>Red</option>
//                                     <option>Blue</option>
//                                     <option>Green</option>
//                                     </select>
//                             </div>    
//                     </div>

// :
//                     <div className="slides jumbotron" style={{height:'750px',backgroundColor:'f5f5f5 !important'}}>
//                             <div className="form-group">
//                                     <label>Select song:</label>
//                                     <select className="form-control" id="sel1">
//                                     <option>Red</option>
//                                     <option>Blue</option>
//                                     <option>Green</option>
//                                     </select>
//                             </div>
//                             <InlineBlock className="col-lg-6 col-xl-6 col-md-6">
//                                 <div className="container">

                                
//                                 </div>
//                             </InlineBlock>
//                             <InlineBlock className="col-lg-6 col-xl-6 col-md-6" >
//                                     <canvas>hi</canvas>
//                             </InlineBlock>
//                             <div className="container">
//                                 <p align="center"><span className="btn btn-info">Record</span>&nbsp;&nbsp;<span className="btn btn-danger">Submit</span></p>
//                             </div>
                            
//                     </div>
                    
//                 }
                
//             </div>
//         );
//    }
}

const WeCamAccess = () => (
    <div id="webcamaccess">
        <h3>The device does not have a webcam OR webcam access was denied</h3>
        <button onClick={() => window.open("https://support.google.com/chrome/answer/2693767?p=ui_voice_search&visit_id=636795900385001472-2266950072&rd=1", "_blank")}>
            Grant Webcam Access
        </button>
    </div>);

ReactDOM.render(
    <MainComp />,
    document.getElementById('react-container')
);

