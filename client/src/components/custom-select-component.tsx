import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface objects {
  value: string;
  text: string;
}

export default function SelectFunction({
  selectProps,
}: {
  selectProps: Array<objects>;
}) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {selectProps.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
