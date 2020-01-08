import React, { useState } from 'react';
import "./form.scss";

const Form = ({ setShowModal }) => {

  const [week, setWeek] = useState('1 - 5')
  const [month, setMonth] = useState('Aug')
  const [year, setYear] = useState('2020')

  const handleSubmit = event => {
    event.persist();
    event.preventDefault();
    let newRow = {
      'week': week,
      'month': month,
      'year': year,
      data: [
        {r: "0,00", a: "0,00"},
        {r: "0,00", a: "0,00", isGroup: true},
        {r: "0,00", a: "0,00"},
        {r: "0,00", a: "0,00", isLast: true},
        {r: "0,00", a: "0,00", isGroup: true},
        {r: "0,00", a: "0,00"},
        {r: "0,00", a: "0,00", isLast: true},
        {r: "0,00", a: "0,00", isGroup: true},
        {r: "0,00", a: "0,00"},
        {r: "0,00", a: "0,00"},
        {r: "0,00", a: "0,00", isLast: true},
        {r: "0,00", a: "0,00", isGroup: true},
        {r: "0,00", a: "0,00"},
        {r: "0,00", a: "0,00", isLast: true}
      ]
    }
    console.log('ny række: ', newRow);
    setShowModal(s => !s)
    // data.data.push(...data.data, newRow)
    // setData(data => newRow, ...data)
  }

  const handleWeekChange = (event) => {
    event.persist();
    setWeek(event.target.value);
  };
  const handleMonthChange = (event) => {
    event.persist();
    setMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    event.persist();
    setYear(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <legend>
        <h3>Opret ny række</h3>
      </legend>
      <div className="form__field">
        <label className="label">Uge</label>
        <input type="text" name='week' onChange={handleWeekChange} value={week} />
      </div>
      <div className="form__field">
        <label className="label">Måned</label>
        <input type="text" name='month' onChange={handleMonthChange} value={month} />
      </div>
      <div className="form__field">
        <label className="label">År</label>
        <input type="text" name='year' onChange={handleYearChange} value={year} />
      </div>

      <button type="submit" className="submitBtn">Opret</button>
    </form>
  );
};

export default Form;


// const InputField = ({label, name, initValue = "0,00", values, setValues}) => {
//   const [value, setValue] = useState(initValue);

//   const handleChange = (event) => {
//     event.persist();
//     setValue(event.target.value);
//   };

//   useEffect(() => {
//     setValues(values => ({ ...values, [name]: {"r": value.r, "a": value.a} }));
//     // eslint-disable-next-line
//   }, [value])

//   return (
//     <div className="form__field">
//       <label className="label">{label}</label>
//       <input type="text" name={name} onChange={handleChange} value={value} />
//     </div>
//   )
// }