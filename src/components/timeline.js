import Skeleton from "react-loading-skeleton";

export default function Timeline() {
  return (
    <div className="col-span-3 lg:col-span-2 border border-gray-primary">
      <Skeleton count={4} width={640} height={500} className="mb-5 ml-4"/>
    </div>
  );
}
