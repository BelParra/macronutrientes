import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export const RangeNutritional = ({ min, max, value, type, onChange, backgroundColor }) => {
  const spanRef = useRef();
  const rangeRef = useRef();

  useEffect(() => {
    const rangeWidth = rangeRef.current.offsetWidth;
    const thumbWidth = 16;
    const percent = (value - min) / (max - min);
    const spanX = percent * (rangeWidth - thumbWidth);
    const percentMacro = 100 / type * value;
    spanRef.current.style.left = `${spanX}px`;
    spanRef.current.textContent = `${percentMacro.toFixed(0)}%`;
  }, [value, min, max, type]);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.rangeNutritional} style={{ '--range-background-color': backgroundColor }}>
      <input ref={rangeRef} type='range' step={1} min={min} max={max} value={value} onChange={handleChange} />
      <span ref={spanRef}>{value}</span>
    </div>
  );
};
