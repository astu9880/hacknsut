import React from 'react';
import ReactDOM from 'react-dom';
import ReactLoading from 'react-loading';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const videoBoxStyle={
	width: '500px',
	height: '500px',
	backgroundColor: 'green'
};

export default class Rank extends React.Component{

    constructor(props) {
        super(props);
        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
	    this.state = {
	      dropdownOpen1: false,
	      dropdownOpen2: false,
	      player1: "",
	      player2: ""
	    };
    }
	toggle1() {
	    this.setState(prevState => ({
	      dropdownOpen1: !prevState.dropdownOpen1
	    }));
	}
	toggle2() {
	    this.setState(prevState => ({
	      dropdownOpen2: !prevState.dropdownOpen2
	    }));
	}
        render(){
        return (
        	<div
        		style={{
        			backgroundColor: '#e9ecef',
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
        	 		<div
        	 			style={{
        	 				display: 'flex',
        	 				flexDirection: 'column',
        	 				justifyContent: 'space-around'
        	 			}}
        	 		>
        	 			<div
        	 				style={{
        	 					display: 'flex',
        	 					flexDirection: 'row',
        	 					justifyContent: 'space-between'
        	 				}}
        	 			>
        	 				<div>
        	 					<Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
							        <DropdownToggle caret>
							          Player1
							        </DropdownToggle>
							        <DropdownMenu>
							          <DropdownItem header>Select Player 1</DropdownItem>
							          <DropdownItem divider />
							          <DropdownItem onClick={()=>{this.setState({player1: "Nilay"})}} disabled={this.state.player2=="Nilay"?1:0}>Nilay</DropdownItem>
							          <DropdownItem onClick={()=>{this.setState({player1: "Rashmeet"})}} disabled={this.state.player2=="Rashmeet"?1:0}>Rashmeet</DropdownItem>
							          <DropdownItem onClick={()=>{this.setState({player1: "Astitwa"})}} disabled={this.state.player2=="Astitwa"?1:0}>Astitwa</DropdownItem>
							        </DropdownMenu>
							      </Dropdown>
        	 				</div>
        	 				<div>
        	 					<Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
							        <DropdownToggle caret>
							          Player2
							        </DropdownToggle>
							        <DropdownMenu>
							          <DropdownItem header>Select Player 2</DropdownItem>
							          <DropdownItem divider />
							          <DropdownItem onClick={()=>{this.setState({player2: "Nilay"})}} disabled={this.state.player1=="Nilay"?1:0}>Nilay</DropdownItem>
							          <DropdownItem onClick={()=>{this.setState({player2: "Rashmeet"})}} disabled={this.state.player1=="Rashmeet"?1:0}>Rashmeet</DropdownItem>
							          <DropdownItem onClick={()=>{this.setState({player2: "Astitwa"})}} disabled={this.state.player1=="Astitwa"?1:0}>Astitwa</DropdownItem>
							        </DropdownMenu>
							      </Dropdown>
        	 				</div>
        	 			</div>
        	 			<img src={'./dist' + '/vs.jpg'} alt="VS" width="200px" height="200px" /> 
        	 			<div
        	 				style={{
        	 					display: 'flex',
        	 					flexDirection: 'row',
        	 					justifyContent: 'space-between'
        	 				}}
        	 			>
        	 				<div>
        	 					{!this.state.player1?"choose Player 1":this.state.player1}
        	 				</div>
        	 				<img src={'./dist' + '/play.jpg'} alt="VS" width="80px" height="60px" /> 
        	 				<div>
        	 					{!this.state.player2?"choose Player 2":this.state.player2}
        	 				</div>
        	 			</div>
        	 		</div>	
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