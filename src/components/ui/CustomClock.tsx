import React from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export function CustomClock() {
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <div
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          border: '0px solid #CCC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
          margin: 'auto',
          position: 'relative',
          background: 'linear-gradient(180deg, #F5F5F5, #EEE)',
        }}
      >
        <Clock
          value={date}
          renderNumbers
          hourHandWidth={6}
          hourHandLength={50}
          minuteHandWidth={4}
          minuteHandLength={70}
          secondHandWidth={2}
          secondHandLength={80}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '28%',
            background: '#000',
            color: '#FFF',
            padding: '2px 5px',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        >
          {date.toLocaleTimeString()}
        </div>
      </div>

      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          background: '#333',
          color: '#FFF',
          padding: '10px 20px',
          borderRadius: '6px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          maxWidth: '300px',
          margin: '20px auto',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>DÍA</p>
          <p style={{ margin: 0, fontSize: '16px' }}>{date.getDate()}</p>
        </div>
        <div style={{ textAlign: 'center', borderLeft: '1px solid #FFF', paddingLeft: '10px' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>MES</p>
          <p style={{ margin: 0, fontSize: '16px' }}>
            {date.toLocaleString('default', { month: 'short' }).toUpperCase()}
          </p>
        </div>
        <div style={{ textAlign: 'center', borderLeft: '1px solid #FFF', paddingLeft: '10px' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>AÑO</p>
          <p style={{ margin: 0, fontSize: '16px' }}>{date.getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}

export default CustomClock;
