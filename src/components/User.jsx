import React, { useState, useEffect } from "react";

export default function User({name, id, team, setTeam}) {
    const [userName, setUserName] = useState(name)

    function UpdateTeam() {
        let tempArr = [...team]
        tempArr[id] = userName
        setTeam(tempArr)
    }

    return (
        <input type="text" placeholder="Enter name..." className="rounded-sm text-sm px-2 py-1 bg-transparent text-white w-full"
            onBlur={UpdateTeam}
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}    
        />
    )
}