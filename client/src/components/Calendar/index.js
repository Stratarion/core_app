import React from 'react';

export const defaultProps = {
  date: new Date(),
  years: [2021, 2022],
  monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  onChange: Function.prototype,

};

function Calendar() {
  return (
    <div />
  );
}

export default Calendar;
