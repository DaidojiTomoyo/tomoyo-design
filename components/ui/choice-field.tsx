'use client';
import { useChoiceMotion } from './use-choice-motion';
import './fields.css';
export function ChoiceField({
  name,
  label,
  value,
  options,
  onChange,
}: {
  name: string;
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const { groupRef, highlightRef } = useChoiceMotion();

  return (
    <fieldset className="ui-choice-field">
      <legend>{label}</legend>
      <div className="ui-segments" ref={groupRef}>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="ui-segment-label">{option.label}</span>
          </label>
        ))}
        <div className="ui-segments-highlight" ref={highlightRef} aria-hidden="true">
          {options.map((option) => (
            <span className="ui-segment-label" key={option.value}>
              {option.label}
            </span>
          ))}
        </div>
      </div>
    </fieldset>
  );
}
