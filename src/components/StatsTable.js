import React from 'react';

const StatsTable = (props) => {

    const sortSeasonsDescending = function(a,b){
        if(a.season > b.season) return -1;
        if(a.season < b.season) return 1;
        return 0;
    }

    const filterNHL = function (obj) {
        return obj.league.name === 'National Hockey League';
    }

    return(
        <div>
            {props.careerData && props.playerData.primaryPosition.name !=='Goalie' &&
            <table>
                <tbody>
                    <tr>
                        <th>Season</th>
                        <th>League</th>
                        <th>Team</th>
                        <th>Games Played</th>
                        <th>Goals</th>
                        <th>Assists</th>
                        <th>Points</th>
                        <th>S%</th>
                        <th>PPP</th>
                        <th>PPG</th>
                        <th>PPA</th>
                        <th>Hits</th>
                        <th>+/-</th>
                        <th>PIMS</th>
                    </tr>
                    {props.careerData.filter(filterNHL).sort(sortSeasonsDescending).map((split) => <tr>
                        <td>{`${split.season.slice(0,4)}-${split.season.slice(4,8)}`}</td>
                        <td>{split.league.name === 'National Hockey League' ? 'NHL' : split.league.name}</td>
                        <td>{split.team.name}</td>
                        <td>{split.stat.games}</td>
                        <td>{split.stat.goals}</td>
                        <td>{split.stat.assists}</td>
                        <td>{split.stat.points}</td>
                        <td>{split.stat.shotPct}</td>
                        <td>{split.stat.powerPlayPoints}</td>
                        <td>{split.stat.powerPlayGoals}</td>
                        <td>{split.stat.powerPlayPoints - split.stat.powerPlayGoals}</td>
                        <td>{split.stat.hits}</td>
                        <td>{split.stat.plusMinus}</td>
                        <td>{split.stat.pim}</td>
                    </tr>)}
                </tbody>
            </table>}
            {props.careerData && props.playerData.primaryPosition.name ==='Goalie' &&
            <table>
                <tbody>
                    <tr>
                        <th>Season</th>
                        <th>League</th>
                        <th>Team</th>
                        <th>Games Played</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>OTL</th>
                        <th>SV%</th>
                        <th>GAA</th>
                        <th>SO</th>
                    </tr>
                    {props.careerData.filter(filterNHL).sort(sortSeasonsDescending).map((split) => <tr>
                        <td>{`${split.season.slice(0,4)}-${split.season.slice(4,8)}`}</td>
                        <td>{split.league.name === 'National Hockey League' ? 'NHL' : split.league.name}</td>
                        <td>{split.team.name}</td>
                        <td>{split.stat.games}</td>
                        <td>{split.stat.wins}</td>
                        <td>{split.stat.losses}</td>
                        <td>{split.stat.ot}</td>
                        <td>{parseFloat(split.stat.savePercentage).toFixed(3).replace(/^0+/, '')}</td>
                        <td>{parseFloat(split.stat.goalAgainstAverage).toFixed(2)}</td>
                        <td>{split.stat.shutouts}</td>
                    </tr>)}
                </tbody>
            </table>}
        </div>
    );
}

export default StatsTable;