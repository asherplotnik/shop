makeShittyTable = obj => {
  let table = {};
  let firstLine = {};
  let keysArr = [];
  let akey = obj.slice(0, 1).map(keys => {
    for (let i = 0; i < Object.getOwnPropertyNames(keys).length; i++) {
      keysArr[i] = Object.getOwnPropertyNames(keys)[i];
    }
    return Object.getOwnPropertyNames(keys)[0];
  });
  firstLine = (
    <tr>
      {keysArr.map(aKey => (
        <th key={akey}>{aKey}</th>
      ))}
    </tr>
  );
  let rows = this.state.collections.map(row => {
    let rowArr = [];
    for (let i = 0; i < keysArr.length; i++) {
      rowArr.push(<td key={i}>{row[keysArr[i]]}</td>);
    }
    return <tr>{rowArr}</tr>;
  });
  table = [firstLine, ...rows];
  return <table>{table}</table>;
};
