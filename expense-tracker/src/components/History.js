import React from "react";

function History(props) {
  const renderedHist = props.List.map((e) => {
    // console.log(e.text);
    const pluss = "plus";
    const minuss = "minus";
    return (
      <li key={e.id} className={Number(e.amt) > 0 ? pluss : minuss}>
        {e.text}
        <span>{e.amt}</span>
      </li>
    );
  });
  return (
    <div>
      <ol className="list">{renderedHist}</ol>
    </div>
  );
}
export default History;
