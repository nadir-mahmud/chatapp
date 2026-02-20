export interface IAppProps {}

export function MessageSearchBar(props: IAppProps) {
  return (
    <div className="w-full p-2 md:p-4">
      <input
        type="text"
        placeholder="Search contacts..."
        className="w-full p-2 border border-gray-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
}
