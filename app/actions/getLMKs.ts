"use server"

import { createClient } from "../utils/supabase/server"


export async function getLMKs() {
    const supabase = await createClient();

    const {data, error} = await supabase.from("lmks").select("*");

    if(error){
        console.error("Error fetching lmks",error)
        return { success: false , message: "lmks table에서 읽어오는데 실패함"}
    }

    return {success:true, data}

}
