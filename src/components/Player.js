import React from 'react';

// Maximum size of headshot is 336x336. 168x168 is default for display on applications

const Player = (props) => {

    return(
        <div>
            {props.playerData && <p className='player__name'>Name: {props.playerData.lastName}, {props.playerData.firstName}</p>}
            {props.playerData && <p className='player__country'>Country: {props.playerData.nationality}</p>}
            {props.playerData && <p className='player__number'>Number: {props.playerData.primaryNumber}</p>}
            {props.playerData && <p className='player__position'>Position: {props.playerData.primaryPosition.name}</p>}
            {props.playerData && <p className='player__Age'>Age: {props.playerData.currentAge}</p>}
            {props.playerData && <p className='player__Height'>Height: {props.playerData.height}</p>}
            {props.playerData && <p className='player__Weight'>Weight: {props.playerData.weight}</p>}
            {props.playerData && <p className='player__Team'>Current Team: {props.playerData.currentTeam.name}</p>}
            {props.playerData && <p className='player__Shoots'>{props.playerData.primaryPosition.name === 'Goalie' ? 'Catches: ' + props.playerData.shootsCatches : 'Shoots: ' + props.playerData.shootsCatches }</p>}
            {props.playerData && <img class='player__Headshot'src={'https://nhl.bamcontent.com/images/headshots/current/168x168/'+props.playerData.id+'@2x.jpg'} alt= 'No Photo Available' width="168" height="168"></img>} 
            {props.playerData && <object data={"https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/"+props.playerData.currentTeam.id+".svg"} type='image/svg+xml' width="168" height="168">Oops. You should see an SVG image here!</object>}
            {props.error && <p className='player__Error'>Error: {props.error}</p>}
        </div>
    );
}

export default Player;