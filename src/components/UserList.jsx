import React, { useState, useEffect } from "react";
import User from "./User";

export default function UserList({firstTeam, setTeams, teams}) {
    const [team, setTeam] = useState([''])
    const [players, setPlayers] = useState(1)
    useEffect(()=>{
        if(players >= 1)
        {
            const tempArr = Array.from({length:players},x=>'')
            setTeam(tempArr)
        }
        else
        {
            setTeam([])
        }
    },[players])
    
    useEffect(()=>{
        let tempObj = {...teams}
        firstTeam ? tempObj.team1 = [...team] : tempObj.team2 = [...team]
        setTeams(tempObj)
    },[team])

    return (
        <div className="border w-[20vw] border-gray-600 rounded-md"
        >
            <div className="flex justify-between pt-2 pb-1 px-2">
                <p>{firstTeam ? <>List 1</> : <>List 2</>}</p>
                <input type="number" value={team.length} className="bg-neutral-800 px-2 py-1 text-sm rounded-sm" placeholder="Number of Players" onChange={(e)=>setPlayers(e.target.value)}/>
            </div>
            <hr className="my-1 border-gray-600"/>
            { team.map((item,id)=>
                <div key={`${item}${id}`}>
                    <User name={item} id={id} setTeam={setTeam} team={team} />
                </div>
            )}
            <button onClick={()=>setTeam([...team,''])}
                className="text-sm border border-gray-500 w-3/4 rounded-md py-0.5 mb-2 cursor-pointer hover:bg-green-500 transition duration-500 hover:bg-opacity-60"
            >Add Player</button>
        </div>
    )
}