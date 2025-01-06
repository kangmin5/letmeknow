"use server"

import { Resend } from "resend";
import { createClient } from "../utils/supabase/server"

const resend = new Resend(process.env.RESEND_API_KEY);


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

    try{
        await resend.emails.send({
            from: 'LMK <onboarding@resend.dev>',
            to: 'mk@kangmin.kr',
            subject: 'LetMeKnow 행사에 초대합니다.',
            html: `
            <h1>New LMK 행사 초대 확인</h1>
            <p><strong>성명:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>참석자:</strong> ${accompany}</p>
            <p><strong>참석여부:</strong> ${attendance}</p>
            `,
        })
    }catch(error){
        console.log('Error resend email: ',error)
    }


    if(error){
        console.log('Error inserting lmks:' ,error)
        return { success:false, message: 'Failed to submit LMK', error }
    }

    return { success:true , message:'lmks 추가 성공' }
}