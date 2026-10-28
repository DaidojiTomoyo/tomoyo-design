import {
  parameters,
  parameterValue,
  type EffectSpec,
  type ParameterKey,
  type ParameterValue,
} from '@/content/effects/schema';
import { controlCopy } from '@/content/effects/control-copy';
import { effectPresets, selectedPreset } from '@/content/effects/presets';
import { RangeField } from '@/components/ui/range-field';
import { ChoiceField } from '@/components/ui/choice-field';
import { getCatalogMessages } from '@/content/catalog';
import type { Locale } from '@/content/locales';

export function ParameterControls({
  spec,
  locale,
  onChange,
  onReset,
  onPreset,
}: {
  spec: EffectSpec;
  locale: Locale;
  onChange: (key: ParameterKey, value: ParameterValue) => void;
  onReset: () => void;
  onPreset: (values: Record<string, ParameterValue>) => void;
}) {
  const t = getCatalogMessages(locale);
  const c = controlCopy[locale];
  const preset = selectedPreset(spec);
  const groups = [...new Set(parameters[spec.id].map((parameter) => parameter.group))];
  return (
    <div className="detail-parameters">
      <div className="detail-panel-heading">
        <h2>{t.parameters}</h2>
        <button className="catalog-text-button" type="button" onClick={onReset}>
          {t.reset}
        </button>
      </div>
      <ChoiceField
        name={`preset-${spec.id}`}
        label={c.presets}
        value={preset ?? ''}
        options={effectPresets[spec.id].map((item) => ({
          value: item.id,
          label: item.name[locale],
        }))}
        onChange={(value) => {
          const next = effectPresets[spec.id].find((item) => item.id === value);
          if (next) onPreset(next.values);
        }}
      />
      <p className="detail-config-note" aria-live="polite">
        {preset ? c.changes : c.custom}
      </p>
      {groups.map((group) => (
        <fieldset className="detail-parameter-group" key={group}>
          <legend>{c[group]}</legend>
          {parameters[spec.id]
            .filter((parameter) => parameter.group === group)
            .map((parameter) =>
              parameter.type === 'range' ? (
                <RangeField
                  key={parameter.key}
                  id={`parameter-${parameter.key}`}
                  label={c[parameter.key]}
                  value={Number(parameterValue(spec, parameter.key))}
                  min={parameter.min}
                  max={parameter.max}
                  step={parameter.step}
                  unit={parameter.unit}
                  onChange={(value) => onChange(parameter.key, value)}
                />
              ) : (
                <ChoiceField
                  key={parameter.key}
                  name={`parameter-${parameter.key}`}
                  label={c[parameter.key]}
                  value={String(parameterValue(spec, parameter.key))}
                  options={parameter.options.map((value) => ({
                    value,
                    label: c[value as keyof typeof c],
                  }))}
                  onChange={(value) => onChange(parameter.key, value)}
                />
              ),
            )}
        </fieldset>
      ))}
    </div>
  );
}
