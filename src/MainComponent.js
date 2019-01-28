import React, { Component } from 'react';
import './App.css';
import './components/Player';
import './components/Team';
import Player from './components/Player';
import TeamPicker from './components/TeamPicker';
import RosterPicker from './components/RosterPicker';
import StatsTable from './components/StatsTable';

const nhlAPI_URL = 'https://statsapi.web.nhl.com/api/v1/';

class MainComponent extends Component {

  state = {
    playerData: undefined,
    teamData: undefined,
    rosterData: undefined,
    careerData: undefined,
    error: undefined
  }

  componentDidMount = async (e) => {

    // Populates team picker after MainComponent is mounted
    const playerAPI_URL = nhlAPI_URL+`teams`;
    const api_Call = await fetch(playerAPI_URL);
    const data = await api_Call.json();

    if(data){
      this.setState({
        teamData: data.teams,
        rosterData: undefined, // WIPE ROSTER AND PLAYER INFO
        playerData: undefined,
        careerData: undefined
      },
        () => console.log('setState has finished on componentDidMount and the component has re-rendered.') // second optional argument in a set state function which is a callback. Currently using to let myself know the component as rendered.
      );

      document.getElementById("teamSelect").selectedIndex = "0";
    }
    console.log(data.teams);
    
  }

  getRoster = async (e) => {
    e.preventDefault();
    const teamList = document.getElementById('teamSelect');
    const id = teamList.options[teamList.selectedIndex].value;
    const playerAPI_URL = nhlAPI_URL+`teams/${id}/roster/`;
    const api_Call = await fetch(playerAPI_URL);
    const data = await api_Call.json();

    if(data && id !=='000_Select'){
      this.setState({
        rosterData: data.roster,
        playerData:undefined, // WIPE PLAYER INFO
        careerData: undefined
      },
        () => console.log('setState has finished on getRoster and the component has re-rendered.') // second optional argument in a set state function which is a callback. Currently using to let myself know the component as rendered.
      );
    }else{
      this.setState({
        rosterData: undefined, // WIPE PLAYER AND ROSTER INFO
        playerData: undefined,
        careerData: undefined
      },
        () => console.log('setState has finished on getRoster with an issue and the component has re-rendered.') // second optional argument in a set state function which is a callback. Currently using to let myself know the component as rendered.
      );
    }
    console.log(data.roster);
  }

  getPlayerInfo = async (e) => {
    e.preventDefault();
    const rosterList = document.getElementById('rosterSelect');
    const id = rosterList.options[rosterList.selectedIndex].value;
    const playerAPI_URL = nhlAPI_URL+`people/${id}`;
    const api_Call = await fetch (playerAPI_URL);
    const data = await api_Call.json();
    
    if(id && data && id!=='000_Select'){
      this.setState({
          playerData: data.people[0], // SET PLAYER INFO
          error: undefined
        },
          () => console.log('setState has finished on getPlayerInfo and the component has re-rendered.') // second optional argument in a set state function which is a callback. Currently using to let myself know the component as rendered.
      );
    }else{
      this.setState({
          playerData: undefined, //WIPE PLAYER INFO
          error: undefined
        },
          () => console.log('setState has finished on getPlayerInfo with no data, so the component has re-rendered with empty player info.') // second optional argument in a set state function which is a callback. Currently using to let myself know the component as rendered.
      );
    }
    this.getCareerData();
    console.log(data);
  }

  getCareerData = async () => {
    const rosterList = document.getElementById('rosterSelect');
    const id = rosterList.options[rosterList.selectedIndex].value;
    const careerStats_APIURL = `${nhlAPI_URL}people/${id}//?expand=person.stats&stats=yearByYear`;
    const api_Call = await fetch (careerStats_APIURL);
    const data = await api_Call.json();

    if(id && id!== '000_Select' && data){
      this.setState({
        careerData: data.people[0].stats[0].splits
      },
        ()=>console.log(data.people[0].stats[0].splits)
      );
    }
  }

  render() {
    return (
      <div className="MainComponent">
        <header className="MainComponent-header">NHL Quick Stats</header>
        <TeamPicker 
          teams = {this.state.teamData}
          getRoster = {this.getRoster}/>
        <RosterPicker
          roster = {this.state.rosterData}
          getPlayerInfo = {this.getPlayerInfo}/>
        <Player 
          playerData = {this.state.playerData}
          error = {this.state.error}/>
        <StatsTable
          id = {this.state.id}
          playerData = {this.state.playerData}
          careerData = {this.state.careerData}/>
      </div>
    );
  }
}

export default MainComponent;