"use server"

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export async function signIn( prevState:{error:string} | null ,formData:FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // console.log(email,password,'auth')
    const {data,error} = await supabase.auth.signInWithPassword({
        email,password
    })

    console.log(data,'data_login');

    if(error){
        return { error: error.message};
    }

    redirect('/admin/lmks');
}

export async function signOut(){
    "use server"

    const supabase = await createClient();
    await supabase.auth.signOut()
    redirect('/login')
}