import store from "./index";
import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

// 获取函数返回值类型
export type RootState = ReturnType<typeof store.getState>;
//自定义一个useSelector函数，将store的类型传入该函数
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppShallowEqual = shallowEqual;
