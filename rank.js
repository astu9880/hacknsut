import React from 'react';
import ReactDOM from 'react-dom';
import ReactLoading from 'react-loading';


const videoBoxStyle={
	width: '500px',
	height: '500px',
	backgroundColor: 'green'
};

export default class Rank extends React.Component{

    constructor(props) {
        super(props);
    }

        render(){
        return (
        	<div
        		style={{
        			marginTop: '10px',
        			display: 'flex',
        			flexDirection: 'column',
        			justifyContent: 'space-around'
        		}}
        	>
        	 	<div
        	 		style ={{
        	 			height: '500px',
        	 			display: 'flex',
        	 			flexDirection: 'row',
        	 			justifyContent: 'space-around'
        	 		}}
        	 	>
        	 		<div
        	 			style={videoBoxStyle}
        	 		>
        	 			me
        	 		</div>

        	 		<img src={'./dist' + '/vs.jpg'} alt="VS" width="200px" height="200px" /> 

        	 		<div
        	 			style={videoBoxStyle}
        	 		>
        	 			there
        	 		</div>
        	 	</div>

        	 	<div
        	 		style={{
        	 			display: 'flex',
        	 			flexDirection: 'row',
        	 			justifyContent: 'space-around'
        	 		}}
        	 	>
        	 		<div>
        	 			<img src={'./dist' + '/reject.jpg'} alt="VS" width="50px" height="50px" />
        	 		</div>

        	 		<div
        	 			style={{width: '50px'}}
        	 		>
        	 		</div>

        	 		<div>
        	 			<img src={'./dist' + '/reject.jpg'} alt="VS" width="50px" height="50px" />
        	 		</div>	
        	 	</div>
        	</div>
        );
    }
}