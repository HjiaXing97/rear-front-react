import { useAppSelector } from "@/store/hooks";

const Tags = () => {
  const tags = useAppSelector((state) => state.tagsSlice.tag);

  console.log(tags);

  return <div>TagsTags</div>;
};
export default Tags;
