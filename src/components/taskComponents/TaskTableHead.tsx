const TableHeader = () => {
  return (
    <thead>
      <tr className="bg-gray-100 text-neutral-400 font-extralight text-left">
        <th className="p-2">Task Name</th>
        <th className="p-2">Description</th>
        <th className="p-2">Estimation</th>
        <th className="p-2">Type</th>
        <th className="p-2">People</th>
        <th className="p-2">Priority</th>
      </tr>
    </thead>
  );
};

export default TableHeader;