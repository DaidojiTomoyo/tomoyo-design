'use client';
import { useRef, useState, type CSSProperties } from 'react';
import './fields.css';

export function RangeField({
  id,
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const cancelled = useRef(false);
  function commit() {
    if (!cancelled.current && draft !== null && draft.trim() && Number.isFinite(Number(draft))) {
      onChange(Math.min(max, Math.max(min, Number(draft))));
    }
    cancelled.current = false;
    setDraft(null);
  }
  return (
    <div className="ui-range-field">
      <div className="ui-field-heading">
        <label htmlFor={id}>{label}</label>
        <span className="ui-number-field">
          <input
            aria-label={label}
            type="number"
            min={min}
            max={max}
            step={step}
            value={draft ?? value}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commit}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.currentTarget.blur();
              }
              if (event.key === 'Escape') {
                cancelled.current = true;
                event.currentTarget.blur();
              }
            }}
          />
          {unit && <span aria-hidden="true">{unit}</span>}
        </span>
      </div>
      <input
        className="ui-range"
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={`${value}${unit}`}
        style={{ '--range-fill': `${((value - min) / (max - min)) * 100}%` } as CSSProperties}
        onChange={(event) => {
          setDraft(null);
          onChange(event.target.valueAsNumber);
        }}
      />
    </div>
  );
}
