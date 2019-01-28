import React from 'react';

const RosterPicker = (props) => {

    const compare = function(a,b){
        if(a.person.fullName < b.person.fullName) return -1;
        if(a.person.fullName > b.person.fullName) return 1;
        return 0;
    }

    return(
        <div>
            <p>
                {props.roster && <select id='rosterSelect' name='rosterSelect' onChange={props.getPlayerInfo}> 
                <option value ='000_Select'>Select a Player</option>
                {props.roster.sort(compare).map((player) => <option key={player.person.id} value={player.person.id}>{player.person.fullName}</option>)}
                </select>}
            </p>
        </div>
    );
}

export default RosterPicker;