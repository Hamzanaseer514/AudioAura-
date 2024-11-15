import {createContext,useState } from "react";

const SongContext = createContext({
    Song:null,
    setSong:()=>{}
});

export default SongContext;