import React, {useState, useEffect} from "react";
import UserList from "./UserList";

export default function TeamBuilder() {
    const [team1, setTeam1] = useState([])
    const [team2, setTeam2] = useState([])
    const [finalArr, setFinalArr] = useState([])
    const [bracket, setBracket] = useState(null)
    
    useEffect(()=>{
        console.log(bracket)
    },[bracket])

    function RandomizeTeams(team1, team2) {
        let temp1 = [...team1]
        let temp2 = [...team2]
        const length1 = team1.length
        const length2 = team2.length
        let i = length1
        let j = length2
        let index1 = 0 
        let index2 = 0
        while (i > 0)
        {
            index1 = Math.floor(Math.random()*length1)
            i--
            let tempval = temp1[i]
            temp1[i] = temp1[index1]
            temp1[index1] = tempval
        }
        while (j > 0)
        {
            index2 = Math.floor(Math.random()*length2)
            j--
            let tempval = temp2[j]
            temp2[j] = temp2[index2]
            temp2[index2] = tempval
        }
        if(length1 === length2)
        {
            let finalTemp = []
            temp1.forEach((item,id)=>{
                finalTemp.push([item,temp2[id]])
            })
            setFinalArr(finalTemp)
        }
        else if ( length1 > length2)
        {
            FinalizeTeams(temp1, length1, temp2, length2)
        }
        else
        {
            FinalizeTeams(temp2, length2, temp1, length1)
        }
    }

    function FinalizeTeams(teamA, length1, teamB, length2) {
        let finalTeam = []
        let i = 0
        let j = 0
        while (i < length1 && j < length2)
        {
            finalTeam.push([teamA[i], teamB[j]])
            i++
            j++
        }
        while (i < length1)
        {
            if(i+1 < length1)
            {
                finalTeam.push([teamA[i], teamA[i+1]])
                i += 2
            }
            else
            {
                finalTeam.push([teamA[i]])
                i++
            }
        }
        let k = finalTeam.length
        let arrIndex = 0
        while (k > 0)
        {
            arrIndex = Math.floor(Math.random()*finalTeam.length)
            k--
            let tempval = finalTeam[k]
            finalTeam[k] = finalTeam[arrIndex]
            finalTeam[arrIndex] = tempval
        }
        setFinalArr(finalTeam)
    }

    function GenerateBracket() {
        let i = 0
        let roundsCounter = finalArr.length
        let bracketTemp = []
        while (roundsCounter >= 1)
        {
            i++
            if(i === 1)
            {
                const roundTemp = Array.from({length: roundsCounter},(x,i)=>i)
                bracketTemp.push(roundTemp)
            }
            else
            {
                const roundTemp = Array.from({length: roundsCounter},(x,i)=>null)
                bracketTemp.push(roundTemp)
            }
            roundsCounter /= 2
        }
        setBracket(bracketTemp)
    }

    return (
        <div className="w-3/4 mx-auto text-center">
                <>
                    <div className="flex justify-center gap-2 mt-8">
                        <UserList setTeam1={setTeam1} team1={team1} setTeam2={setTeam2} team2={team2} firstTeam={true} />
                        <UserList setTeam1={setTeam2} team1={team2} setTeam2={setTeam1} team2={team1} firstTeam={false} />
                    </div>
                    <button
                        className="mt-6 px-3 py-1 rounded-xl bg-neutral-700 hover:bg-gradient-to-r from-blue-400 to-green-500 hover:shadow-md hover:shadow-green-800
                            cursor-pointer hover:animate-pulse hover:scale-105 transition duration-500"
                        onClick={()=>RandomizeTeams(team1, team2)}
                    >Randomize</button>
                    <div>
                        {finalArr.length > 0 ?
                        <div>
                            <hr className="mt-4 mb-2" />
                            <p className="font-semibold">Teams</p>
                        </div>
                        :
                            <></>
                        }
                        <div className="grid grid-cols-2">
                            {finalArr.map((item,id)=>
                                <div key={id}>
                                    {item[0]} {item[1] ? <>& {item[1]}</> : <></>}
                                </div>
                            )}
                        </div>
                        {/* {finalArr.length > 0 ?
                        <button onClick={GenerateBracket}
                        className="mt-6 px-3 py-1 rounded-xl bg-neutral-700 hover:bg-gradient-to-r from-blue-400 to-green-500 hover:shadow-md hover:shadow-green-800
                            cursor-pointer hover:animate-pulse hover:scale-105 transition duration-500 w-full"
                        >Create Bracket</button> : <></>} */}
                    </div>
                </>
            { bracket !== null ?
                <div className="flex">
                    {bracket.map((round,id)=>
                        <div className="flex flex-col">
                            {round.map((match,index)=>{
                                    if(round[index+1] === undefined)
                                    {
                                        return (
                                            <div>
                                                <p>{match}</p>
                                            </div>
                                        )
                                    }
                                    else
                                    {
                                        return (
                                            <div>
                                                <p>{match}</p>
                                                {index % 2 === 0 ? <p className="text-sm">vs. </p> : <></>}
                                            </div>
                                        )
                                    }
                                }
                            )}
                        </div>
                    )}
                </div>
            :
                <>

                </>
            }
        </div>
    )
}