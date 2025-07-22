import "@/styles/layout/loader.scss";

interface Props {
  main?: boolean
}

export default function Loader({main = false}:Props) {

  if(main){
      return(
        <div className="main-loader">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      )
  }

  return (
      <div className="loader">
        <div className="loader__balls">
          <div className="loader__balls__group">
            <div className="ball item1" />
            <div className="ball item1" />
            <div className="ball item1" />
          </div>
          <div className="loader__balls__group">
            <div className="ball item2" />
            <div className="ball item2" />
            <div className="ball item2" />
          </div>
          <div className="loader__balls__group">
            <div className="ball item3" />
            <div className="ball item3" />
            <div className="ball item3" />
          </div>
        </div>
      </div>
  );
}
