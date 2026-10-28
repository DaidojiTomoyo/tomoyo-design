import {
  activeParameters,
  parameterValue,
  type EffectSpec,
  type ParameterKey,
  type ParameterValue,
} from '@/content/effects/schema';
import { useTranslations } from 'next-intl';
import { effectPresets, presetValues, selectedPreset } from '@/content/effects/presets';
import { RangeField } from '@/components/ui/range-field';
import { ChoiceField } from '@/components/ui/choice-field';

export function ParameterControls({
  spec,
  onChange,
  onReset,
  onPreset,
}: {
  spec: EffectSpec;
  onChange: (key: ParameterKey, value: ParameterValue) => void;
  onReset: () => void;
  onPreset: (values: Record<string, ParameterValue>) => void;
}) {
  const t = useTranslations('Controls');
  const preset = selectedPreset(spec);
  const visible = activeParameters(spec);
  const groups = [...new Set(visible.map((parameter) => parameter.group))];
  return (
    <div className="detail-parameters">
      <div className="detail-panel-heading">
        <h2>{t('parameters')}</h2>
        <button className="catalog-text-button" type="button" onClick={onReset}>
          {t('reset')}
        </button>
      </div>
      <ChoiceField
        name={`preset-${spec.id}`}
        label={t('presets')}
        value={preset ?? ''}
        options={effectPresets[spec.id].map((item) => ({
          value: item.id,
          label: t(`presetNames.${item.id}`),
        }))}
        onChange={(value) => {
          const next = effectPresets[spec.id].find((item) => item.id === value);
          if (next) onPreset(presetValues(spec, next.values));
        }}
      />
      <p className="detail-config-note" aria-live="polite">
        {preset ? t('changes') : t('custom')}
      </p>
      {groups.map((group) => (
        <fieldset className="detail-parameter-group" data-group={group} key={group}>
          <legend>{t(group)}</legend>
          {visible
            .filter((parameter) => parameter.group === group)
            .map((parameter) =>
              parameter.type === 'range' ? (
                <RangeField
                  key={parameter.key}
                  id={`parameter-${parameter.key}`}
                  label={t(parameter.key)}
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
                  label={t(parameter.key)}
                  value={String(parameterValue(spec, parameter.key))}
                  options={parameter.options.map((value) => ({
                    value,
                    label: t(value as Parameters<typeof t>[0]),
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
