/*
 * This file helps utilize a hook to load getLocation
 * 
 * @privateRemarks
 * 
 * Might need help interpretting this to make it easier to understand
 */

import { useEffect } from "react"

/**
 * Clever hook idea from https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once#:~:text=8%20Answers&text=If%20you%20only%20want%20to,empty%20array%20as%20second%20argument.&text=useEffect(yourCallback%2C%20%5B%5D)%20%2D%20will,only%20after%20the%20first%20render.&text=useEffect%20runs%20by%20default%20after,(thus%20causing%20an%20effect).
 * 
 * @param function
 *
 * @returns value
 */
export const useMountEffect = (fn: () => void) => useEffect(() => { fn() }, [])