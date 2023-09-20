import React, { useState, useEffect } from "react";
import User from "./User";

export default function UserList({firstTeam, setTeam1, team1, setTeam2, team2}) {
    const [players, setPlayers] = useState(1)
    useEffect(()=>{
        if(players >= 1)
        {
            const tempArr = Array.from({length:players},x=>'')
            setTeam1(tempArr)
        }
        else
        {
            setTeam1([])
        }
    },[players])

    function Swap(id)
    {
        let temp = [...team1]
        const removed = temp.splice(id,1)
        let temp2 = [...team2]
        temp2.push(removed[0])
        setTeam1(temp)
        setTeam2(temp2)
    }

    function DeletePlayer(id) {
        let temp = [...team1]
        temp.splice(id,1)
        setTeam1(temp)
    }
    
    return (
        <div className="border lg:w-[20vw] border-gray-600 rounded-md"
        >
            <div className="flex justify-between pt-2 pb-1 px-2">
                <p>{firstTeam ? <>List 1</> : <>List 2</>}</p>
                <input type="number" value={team1.length} className="bg-neutral-800 px-2 py-1 text-sm rounded-sm max-w-[12vw]" placeholder="Number of Players" onChange={(e)=>setPlayers(e.target.value)}/>
            </div>
            <hr className="my-1 border-gray-600"/>
            { team1.map((item,id)=>
                <div key={`${item}${id}`} className="flex px-2">
                    {item!== '' && !firstTeam ?
                        <button onClick={()=>Swap(id)}
                            className="text-gray-400"
                        >{`<`}</button>
                        : <></>
                    }
                    <User name={item} id={id} setTeam={setTeam1} team={team1} />
                    {item === '' ?
                        <button onClick={()=>DeletePlayer(id)} className="text-sm text-red-500">X</button>
                        : firstTeam ?
                            <button onClick={()=>Swap(id)}
                                className="text-gray-400"
                            >{`>`}</button>
                        : <></>
                    }
                </div>
            )}
            <button onClick={()=>setTeam1([...team1,''])}
                className="text-sm border border-gray-500 w-3/4 rounded-md py-0.5 mb-2 cursor-pointer hover:bg-green-500 transition duration-500 hover:bg-opacity-60"
            >Add Player</button>
        </div>
    )
}