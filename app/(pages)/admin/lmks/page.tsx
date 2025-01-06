import LMKTable from "@/app/_components/LMKTable";
import { signOut } from "@/app/actions/auth";
import { getLMKs } from "@/app/actions/getLMKs"
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import Link from "next/link";

export default async function LmksPage() {
    const {data,success, message} = await getLMKs();

    // 해야할 것 : auth가 없으면, login으로 redirect
    if(!success){
        return <div className="container mx-auto mt-8 p-4">Error:{message}</div>
    }
  return (
    <div className="container mx-auto mt-8 p-4">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl text-bold">참석자 명단</h1>
            <div className="flex items-center gap-2">
                <Link href={"/"} >
                    <Button variant={"outline"}>
                        <House />
                    </Button>
                </Link>
                <form action={signOut}>
                    <Button variant={"outline"} >Log Out</Button>
                </form>
            </div>
        
        </div>
        {/* Table */}
        <LMKTable data={data || []}  />
    </div>
  )
}
