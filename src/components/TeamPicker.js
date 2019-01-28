import React from 'react';

const TeamPicker = (props) => {

    const compare = function(a,b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    }

    return(
        <div>
            <p>
                {props.teams && <select id='teamSelect' name='teamSelect' onChange={props.getRoster}> 
                <option value ='000_Select'>Select a Team</option>
                {props.teams.sort(compare).map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</select>}
            </p>
        </div>
    );
}

export default TeamPicker;