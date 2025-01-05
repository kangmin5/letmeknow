"use server"

import { createClient } from "../utils/supabase/server"

export async function submitLMK(formData:FormData){
    const supabase = await createClient();

    const name = formData.get("name");
    const email = formData.get("email")
    const accompany = formData.get("accompany")
    const attendance = formData.get("attendance")


    const {data , error}= await supabase.from("lmks").insert([{
        name,email,accompany,attendance
    }]);

    console.log(data,'data_submitLMK')

    if(error){
        console.log('Error inserting lmks:' ,error)
        return { success:false, message: 'Failed to submit LMK', error }
    }

    return { success:true , message:'lmks 추가 성공' }
}