"use client";
export const Select = ({
  list,
  onSelect,
}: {
  onSelect: (value: string) => void;
  list: {
    key: string;
    value: string;
  }[];
}) => {
  return (
    <select
      onChange={(e) => {
        onSelect(e.target.value);
      }}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      {list.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}{" "}
        </option>
      ))}
    </select>
  );
};
