
import React from 'react'


const Kurssi = (props) => {
  return (
    <div>
      <Otsikko kurssi={props.kurssi} />
      <Sisalto osat={props.kurssi.osat} />
      <Yhteensa osat={props.kurssi.osat} />
    </div>
  )
}

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>


const Otsikko = (props) => <h2>{props.kurssi.nimi}</h2>

const Sisalto = ({osat}) => {
  return(
    <div>
      {osat.map(osa =>
        <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />
      )}
    </div>
  )
}
const Yhteensa = ({osat}) => {
  const tehtavia = osat.reduce((sum, osa) => sum + osa.tehtavia, 0)
  
  return(
    <p>yhteensä {tehtavia} tehtävää</p>
  )
}


export default Kurssi