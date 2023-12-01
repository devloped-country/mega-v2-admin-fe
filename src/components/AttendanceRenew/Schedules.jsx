import Schedule from './Schedule';

function Schedules() {
  return (
    <ul>
      <Schedule title='공가' date='2023.10.17 (월)' type='blue' text='승인' />
      <Schedule
        title='공가'
        date='2023.10.17 (월)'
        type='orange'
        text='미승인'
      />
      <Schedule
        title='조퇴'
        date='2023.10.17 (월)'
        type='green'
        time='오전 10:00'
        text='대기중'
      />
    </ul>
  );
}

export default Schedules;
