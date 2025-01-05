"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface lmk {
  id: string;
  name: string;
  email: string;
  accompany: number;
  attendance: string;
}

interface lmksProps {
  data: lmk[];
}

const LMKTable = ({ data }: lmksProps) => {
  const [filter, setFilter] = useState("");

  const filteredData = data.filter((lmk) =>
    lmk.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="성명으로 검색"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>성명</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>참석자</TableHead>
              <TableHead>참석여부</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ?(
                filteredData.map((lmk)=>(
                    <TableRow key={lmk.id}>
                        <TableCell>{lmk.name}</TableCell>
                        <TableCell>{lmk.email}</TableCell>
                        <TableCell>{lmk.accompany || "0"}</TableCell>
                        <TableCell>{lmk.attendance}</TableCell>
                    </TableRow>
                ))
            ):(
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        결과가 없습니다.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default LMKTable;
