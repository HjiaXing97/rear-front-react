import { useAppSelector } from "@/store/hooks";

const Tags = () => {
  const tags = useAppSelector((state) => state.tagsSlice.tag);

  return <div>TagsTags</div>;
};
export default Tags;
