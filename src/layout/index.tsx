import style from "./style.module.less";
import Header from "./components/Header";
import AppMain from "./components/AppMain";
import LeftMenu from "./components/LeftMenu";
import Tags from "./components/Tags";
const Layout = () => {
  return (
    <div className={style["app-main"]}>
      <LeftMenu />
      <section className="flex-1 flex flex-col">
        <section>
          <Header></Header>
          <Tags />
        </section>
        <AppMain />
      </section>
    </div>
  );
};

export default Layout;
