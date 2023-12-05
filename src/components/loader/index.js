import "./style.css";
import { cn as bem } from "@bem-react/classname";

function Loader() {
  const cn = bem("Loader");

  return (
    <div className={cn()}>
      <span className={cn("content")}>Идёт загрузка...</span>
    </div>
  );
}

export default Loader;
