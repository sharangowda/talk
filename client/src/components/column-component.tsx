import { Column } from "@/types";

export default function ColumnContainer({ column }: { column: Column }) {
  return (
    <>
      <div className="bg-gray-900 w-[350px] h-[600px] max-h-[600px] rounded-md flex flex-col">
        {/*title*/}
        <div>
          <div className="flex justify-center items-center w-[350px] rounded-md rounded-b-none h-[40px] bg-blue-200 text-black">
            {column.title}
          </div>
        </div>
        {/* col tasks*/}
        <div>Content</div>
      </div>
    </>
  );
}
