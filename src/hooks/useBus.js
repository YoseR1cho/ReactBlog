import React from 'react'
import mitt from 'mitt'
import {createContext, useContext, useState} from "react";

export const BusContext = createContext(null);
export default function useBus(){
    return useContext(BusContext)
}

export function useListener(name, fn) {
    const bus = useBus()
    React.useEffect(() => {
        bus.on(name, fn)
        return () => {
            bus.off(name, fn)
        }
    }, [bus, name, fn])
}

export function Provider({children}){

    const [bus] =useState(()=>mitt());
    return <BusContext.Provider value={bus}>{children}</BusContext.Provider>
}
